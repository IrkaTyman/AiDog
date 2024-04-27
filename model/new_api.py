import asyncio
import re
from flask import Flask, request, jsonify, g
from llama_cpp import Llama

from find_static_triggers import find_bad_url, find_obscene_words

app = Flask(__name__)

model_path = 'model-q8_0.gguf'
global_model = None
model_loading_lock = asyncio.Lock()


async def get_model_async():
    global global_model
    if global_model is None:
        async with model_loading_lock:
            if global_model is None:
                global_model = Llama(model_path=model_path, n_ctx=8192, n_parts=1, n_threads=12, verbose=True)
    return global_model


async def classification_comments(triggers_data, comments):
    model = await get_model_async()
    answer = []
    triggers_text = ''
    for i in range(len(triggers_data)):
        triggers_text += f"<trigger_id: {i + 1}" + '\n'
        triggers_text += f"Название: {triggers_data[i]['trigger_name']}" + '\n'
        triggers_text += f"Описание: {triggers_data[i]['trigger_description']}" + '\n'
        triggers_text += f"Примеры: {triggers_data[i]['examples']}" + '>\n'

    format_ans = "<trigger_id>=<оценка от 0 до 1>;" * len(triggers_data)

    SYSTEM_PROMPT = (f"Ты опытный методолог онлайн-вебинаров.\n"
                     f"Ты внимательно оцениваешь комментарии с онлайн-вебинара строго по критериям: \n{triggers_text}\n"
                     "Ты будешь получать комментарий из чата, а в ответ должен выдать оценку по каждому из критериев\n"
                     "Отвечать нужно в формате:\n"
                     f"{format_ans}"
                     f"\nПример ответа: '1=0;2=1;3=0'")
    first_message = {"role": "system", "content": SYSTEM_PROMPT}

    answer_model = await inference_async(model, first_message, comments)
    for mark in answer_model:
        if len(mark[0].replace(' ', '')) == 0:
            answer.append(('0=0;' * len(triggers_data))[:-1])
        else:
            answer.append(mark[1])

    return answer


async def conclusions(comments):
    model = await get_model_async()
    first_message = {"role": "system",
                     "content": 'Ты опытный методолог онлайн-вебинаров. Сейчас тебе покажут все комментарии с одного из вебинаров. Тебе нужно сделать выводы на счет проведения этого вебинара. Каждый вывод отображай через строчку с помощью "\\n". Ссылки - это почти всегда плохо, только если это не ссылка https://gb.ru. Не делай выводы на основе конкретных пользователей, делай только общие выводы по всему вебинару.'}
    answer_model = await inference_async(model, first_message, [comments])
    answer_model = answer_model[0][1]
    answer = answer_model.split('\n')
    print(answer)
    return [x for x in answer if len(x) > 0]


def inference(model, first_message, next_messages, n_ctx=8192, top_k=30, top_p=0.9, temperature=0.8,
              repeat_penalty=1.1):
    answer = []

    for message in next_messages:
        messages = [first_message, {"role": "user", "content": message}]
        ans = model.create_chat_completion(messages, temperature=temperature, top_k=top_k, top_p=top_p,
                                           repeat_penalty=repeat_penalty)
        answer.append([message, ans['choices'][0]['message']['content']])

    return answer


async def inference_async(model, first_message, next_messages, n_ctx=8192, top_k=30, top_p=0.9, temperature=0.8,
                          repeat_penalty=1.1):
    loop = asyncio.get_event_loop()
    answer = await loop.run_in_executor(None, inference, model, first_message, next_messages, n_ctx, top_k, top_p,
                                        temperature, repeat_penalty)
    return answer


@app.route('/process_comments', methods=['POST'])
async def process_comments():
    data = request.json
    ans_comments = []
    pattern_url = r'https?://\S+'
    # Парсинг комментариев
    comments = []
    comments_data = data.get('comments', [])
    count_comments = len(comments_data)
    for comment in comments_data:
        message = comment.get('message')
        comments.append(re.sub(pattern_url, '', message))

    # Парсинг триггеров
    triggers = []
    trigger_ids = []
    trigger_id_mat = ''
    trigger_id_ad = ''
    triggers_data = data.get('triggers', [])
    for trigger in triggers_data:
        if trigger.get('name').lower() in ["мат", "реклама"]:
            if trigger.get('name').lower() == "мат":
                trigger_id_mat = trigger.get('id')
            else:
                trigger_id_ad = trigger.get('id')
            continue
        trigger_id = trigger.get('id')
        name = trigger.get('name')
        description = trigger.get('description')
        examples = trigger.get('examples')
        triggers.append(
            {'trigger_id': trigger_id, 'trigger_name': name, 'trigger_description': description, 'examples': examples})
        trigger_ids.append(trigger_id)

    marks_comments = await classification_comments(triggers, comments)

    for i in range(count_comments):
        marks_comments[i] = re.sub(r'[^\d;=]+', '', marks_comments[i])
        ans_comment = {"nickname": comments_data[i].get('nickname'), "message": comments_data[i].get('message'),
                       "time": comments_data[i].get('time'), "triggers": []}
        marks_with_ids = marks_comments[i].split(';')[:len(triggers)]

        for x in range(len(marks_with_ids)):
            try:
                id, mark = marks_with_ids[x].split('=')
            except:
                id = x + 1
                mark = marks_with_ids[x]

            if len(mark) > 0 and (float(mark) > 0 or int(mark) > 0):
                ans_comment['triggers'].append(trigger_ids[int(id) - 1])

        if find_obscene_words(comments_data[i].get('message')):
            ans_comment['triggers'].append(trigger_id_mat)
        if len(re.sub(pattern_url, '', comments_data[i].get('message')).replace(' ', '')) == 0:
            ans_comment['triggers'] = []
        if find_bad_url(comments_data[i].get('message'), []):
            ans_comment['triggers'].append(trigger_id_ad)

        ans_comments.append(ans_comment)

    return jsonify({"comments": ans_comments})


@app.route('/make_conclusions', methods=['POST'])
async def make_conclusions():
    data = request.json
    comments_data = data.get('comments', [])
    comments = ''
    for comment in comments_data:
        comments += f'{comment.get("nickname")}: {comment.get("message")} | {comment.get("time")}\n'

    ans = await conclusions(comments)
    return ans


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(get_model_async())
    app.run()
