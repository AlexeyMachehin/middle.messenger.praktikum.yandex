Ссылка на render.com: [middle.messenger.praktikum.yandex_Link](https://messenger-tvcr.onrender.com)

***
## Команды:
* Старт проекта: npm run start
* Сборка проекта: npm run build
* Старт режима разработчика: npm run dev
* Запуск тестов: npm run test

***

## Ветка sprint_1:
* Верстка сайта с использованием шаблонизатора Pug. 
* Добавлен локальный сервер на Express.

## Ветка sprint_2:
* Внедрен Typescript. 
* Настроены eslint, stylelint. 
* Добавлен класс для работы с запросами HTTPtransport.
* Компоненты сделаны на основе общего класса Block. 
* Используется EventBus, Proxy. 
* Обновление компонентов происходит за счет изменения props.
* В консоль выводятся значения инпутов по нажатию submit. 
* Добавлены валидация и события форм.

## Ветка sprint_3:
* В проект добавлен роутинг. 
* Внедрен HTTP API чатов. 
* Управление API происходит через контроллеры. 
* Добавлена авторизация (регистрация, авторизация, выход из системы). 
* Создан список чатов пользователя, добавлена возможность создавать чат, поиск чата по названию. 
* Настроена отправка сообщений. 
* Неавторизованный пользователь отправляется на страницу логина.
* Подключен WebSocket для работы с real-time сообщениями. 
* Чаты добавляются в store.

## Ветка sprint_4:
* Написаны тесты (Mocha и Chai) для роутера , компонента, модуля отправки запросов.
* Настроен  Webpack.
* Настроен precommit.
* Проект размещен на render.com с Docker-сборкой.
* Проведен аудит пакетов.
