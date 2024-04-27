import nltk
import re
import string

nltk.download('punkt')


# Поиск запрещенных ссылок, учитывая разрешенные ссылки
async def find_bad_url(comment, good_links):
    if len(good_links) == 0:
        good_links = ['https://gb.ru']
    words = comment.split(' ')
    words = [word for word in words if word not in string.punctuation]
    comment = ''.join([x for x in words])
    comment = comment.replace(' ', '')
    pattern = r'(?!{})https?://\S+'.format('|'.join(re.escape(link) for link in good_links))
    return bool(re.search(pattern, comment))


# Поиск ругательных слов
async def find_obscene_words(comment):
    words = comment.split(' ')
    words = [word for word in words if word not in string.punctuation]
    comment = ' '.join([x for x in words])
    pattern = r'\b(?:бл[яа]д[аоиeёюя]\b|бляд[иоаоеё][наоуеыяю]?\b|бля\b|блять\b|бляд[схий]+[а-я]*\b|ху[ёеиыэюя][вбпткс][а-я]*\b|п[иеё]д[аоуиеяю][раеиаоуеы]\b|п[еи]зд[аоуиеяю][раоиуеы]\b|хер\b|еб[лсч]а?\b|хероват[аыоуе]\b|на[иа]хуя\b|нихуя\b|ебан[аоуеы]\b|бесп[иеё]зд[аоуиеяю]+\b|б[иeе]нд[аоуиеяю]+\b|муд[аи][лоа]?[схиеюя]?\b|д[ро]ч?[аеиюя]\b|др[ау]ч[аеиюя]\b|еб[уеё]шк[ауеыо]\b|за[еи]бал[иоауеы]\b|г[ао]вн[оа]\b|нбл[яaа]ть\b|нбл[яaа]\b|вбл[яaа]ть\b|вбл[яaа]\b|дбл[яaа]\b|су[еи]к[аи]?\b|\bсука\b)'
    return bool(re.search(pattern, comment))
