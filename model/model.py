from llama_cpp import Llama

model_path = 'model-q8_0.gguf'


def classification_comments(triggers_data, comments):
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

    answer_model = inference(first_message, comments)
    for mark in answer_model:
        if len(mark[0].replace(' ', '')) == 0:
            answer.append(('0=0;' * len(triggers_data))[:-1])
        else:
            answer.append(mark[1])

    return answer


def conclusions(comments):
    first_message = {"role": "system",
                     "content": 'Ты опытный методолог онлайн-вебинаров. Сейчас тебе покажут все комментарии с одного из вебинаров. Тебе нужно сделать выводы на счет проведения этого вебинара. Каждый вывод отображай через строчку с помощью "\\n". Ссылки - это почти всегда плохо, только если это не ссылка https://gb.ru. Не делай выводы на основе конкретных пользователей, делай только общие выводы по всему вебинару.'}
    answer_model = inference(first_message, [comments])[0][1]
    answer = answer_model.split('\n')
    return [x for x in answer if len(x) > 0]


def inference(first_message, next_messages, n_ctx=8192, top_k=30, top_p=0.9, temperature=0.8, repeat_penalty=1.1):
    model = Llama(model_path=model_path, n_ctx=n_ctx, n_parts=1, n_threads=10, verbose=True)

    answer = []

    for message in next_messages:
        messages = [first_message, {"role": "user", "content": message}]
        ans = model.create_chat_completion(messages, temperature=temperature, top_k=top_k, top_p=top_p,
                                           repeat_penalty=repeat_penalty)
        answer.append([message, ans['choices'][0]['message']['content']])

    return answer
