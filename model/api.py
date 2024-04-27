import re
from flask import Flask, request, jsonify

from find_static_triggers import find_bad_url, find_obscene_words
from model import classification_comments, conclusions

app = Flask(__name__)
pattern = r'[^\d;=]+'


@app.route('/process_comments', methods=['POST'])
def process_comments():
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

    marks_comments = classification_comments(triggers, comments)
    print(marks_comments)
    for i in range(count_comments):
        marks_comments[i] = re.sub(pattern, '', marks_comments[i])
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
def make_conclusions():
    data = request.json
    comments_data = data.get('comments', [])
    comments = ''
    for comment in comments_data:
        comments += f'{comment.get("nickname")}: {comment.get("message")} | {comment.get("time")}\n'

    return conclusions(comments)


if __name__ == '__main__':
    app.run()
