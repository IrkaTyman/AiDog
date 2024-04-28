import pandas as pd
import json
import random
import os

nicknames = ['User' + str(i) for i in range(1, 201)]

df = pd.read_excel('DataModel.xlsx')
df['Дата сообщения'] = pd.to_datetime(df['Дата сообщения'], errors='coerce')
grouped = df.groupby('ID урока')

for lesson_id, group in grouped:
    comments = []
    for index, row in group.iterrows():
        nickname = random.choice(nicknames)
        message = row['Текст сообщения']
        if pd.notna(row['Дата сообщения']):  # Проверяем, что значение не NaN
            time = str(row['Дата сообщения'].time())
        else:
            time = "Unknown"
        comment = {
            "nickname": nickname,
            "message": message,
            "time": time
        }
        comments.append(comment)

    if len(comments) < 20:
        continue
    directory = 'lesson_files'
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    file_path = os.path.join(directory, f'lesson_{lesson_id}.txt')
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump({"comments": comments}, f, indent=4, ensure_ascii=False)

print("Готово!")
