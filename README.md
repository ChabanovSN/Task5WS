# Установка: клонировать/ скачать и в корневой папке где package.json выполнить команду в командной строке
# !!Необходимо наличие Node.js на компьюторе!!
 npm install
# для работы с базой данных необходимо:
# 1)иметь локально Postgres и через psql (к примеру)
# 2) создать пустю БД для работы 
CREATE DATABASE moviesdb;
# 3) создать пустю БД для тестов
CREATE DATABASE moviesdb_test;
# в качестве доступа к БД у меня установлен суперпользователь  "postgres" и пароль "root"
# если у Вас установлены другие права доступа в
# файле knexfile.js(корневая папка) измените переменные user и password на Ваши
# 3) для создания создания таблиц и наполнения их 
#первичными данными используйте команды(корневая папка, командная строка):
 knex migrate:latest --env development
 knex seed:run --env development
# 4) для запуска тестов команда
npm test
# 5) для запуска в режиме дебага  
SET DEBUG=node-koa-api* & npm run devstart
url http://localhost:1337
# 6) Запуск  
npm start
url http://localhost:1337
