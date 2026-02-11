# Data of LoL

**Сайт для анализа истории игр в League of Legends.**  
Проект позволяет искать игрока по нику и просматривать его последние матчи с детальной информацией.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakraui&logoColor=white)

## Функционал
- **Поиск игроков** — введите никнейм summoner’а для загрузки статистики.
- **История матчей** — просмотр последних ~100 игр.
- **Общие матчи** — отображение игр, сыгранных в одной команде с искомым пользователем (реализовано в последнем обновлении).
- **Детальная информация** — модальное окно с расширенными данными об игроках в матче.
- **Миграция на TypeScript** — кодовая база переведена на TypeScript для повышения надёжности.

## Технологии
- **Frontend:** React (сборка Vite)
- **UI-библиотека:** [Chakra UI](https://chakra-ui.com/)
- **Языки:** JavaScript, TypeScript
- **Инструменты:** ESLint, Prettier

## Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Torens29/Data_of_LoL.git
   ```
2. Установите зависимости:
  ```bash
  npm install
```
3. Получите ключ Riot API:

  1) Перейдите на официальный портал разработчиков Riot Games
  2) Войдите в аккаунт или зарегистрируйтесь
  3) Нажмите «Register Product» и выберите «Personal API Key»
  4) Скопируйте сгенерированный ключ (выглядит как RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)

4. Создайте файл .env в корне проекта и добавьте ваш ключ:

```env
VITE_RIOT_API_KEY=ваш_ключ_здесь
```
Файл .env.example содержит шаблон для быстрого старта.

5. Запустите в режиме разработки:
  ```bash
  npm run dev
  ```

Структура проекта (основные файлы)
    src/ — исходный код приложения.
    public/ — статические ресурсы.
    vite.config.js — конфигурация Vite.
    tsconfig.json — настройки TypeScript.
