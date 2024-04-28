## Сервис для автоматического анализа поведения учащихся для эффективного контроля и повышения качества обучения

Проект разработан в рамках хакатона "Цифровой прорыв" командой ПИН-КОД

### Ссылки
[Документация к API](https://documenter.getpostman.com/view/24641121/2sA3Bt3qCs)

[Демо-стенд](https://ai-chat-inspector.netlify.app)

### Команда
- Ахидов Роман - ML
- Туманова Ирина - frontend, дизайн
- Рожков Максим - backend, аналитика, дизайн

### Описание кейса
В рамках кейса необходимо оценить различные параметры обучения, включая позитивное восприятие, ругань, 
технические неполадки и уровень сложности уроков.

Система должна анализировать поведение студентов во время вебинаров, их вопросы и формировать сводные
отчеты для улучшения качества и контроля обучения

### Наше решение
Мы разработали сервис для автоматической инспекции текстовых комментариев с возможностью гибкой настройки критериев 
анализа. Такой подход позволит онлайн школам тщательнее следить за качеством материалов в своих курсах.

Мы используем opensource LLM нейросеть llama 3 на CPU, что позволяет нам не зависеть от токенов продакшн моделей и 
дает больше возможностей для реализации.

В нашем сервисе триггеры/критерии для анализа комментариев пользователь может задавать самостоятельно.
Администраторы смогут проверять свои гипотезы, основываясь на различных метриках, которые мы поможем собрать.

### Инструкция запуска 

```bash
cd backend
npm i 
npm run start

cd ..
cd frontend
npm i --force
npm run build:prod
```

### Демонстрация решения
[](https://raw.githubusercontent.com/CatDevelop/AiDog/main/system/Demo1.png)
![AI Chat Inspector](https://raw.githubusercontent.com/CatDevelop/AiDog/main/system/Demo1.png "Auth")
![AI Chat Inspector](https://raw.githubusercontent.com/CatDevelop/AiDog/main/system/Demo2.png "Main")
![AI Chat Inspector](https://raw.githubusercontent.com/CatDevelop/AiDog/main/system/Demo3.png "Record")
![AI Chat Inspector](https://raw.githubusercontent.com/CatDevelop/AiDog/main/system/Demo4.png "Settings")
![AI Chat Inspector](https://raw.githubusercontent.com/CatDevelop/AiDog/main/system/Demo5.png "Scheme")
