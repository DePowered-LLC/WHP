# Панель управления WHP

## Технологии

* [Node.js](https://github.com/nodejs/node)
* [Axios](https://github.com/axios/axios)
* [dc-api-core](https://github.com/DimaCrafter/dc-api-core)
* [Express](https://github.com/expressjs/express)
* [Mongoose](https://github.com/Automattic/mongoose)
* [MongoDB](https://github.com/mongodb/mongo)
* [Vue](https://github.com/vuejs/vue)
* [Vuex](https://github.com/vuejs/vuex)

---

## Структура

```txt
📙
 ├── 📦 back-end            Серверная часть (dc-api-core)
 │   ├── ⚙️ controllers     Контроллеры запросов
 │   └── 🗃️ models          Модели для работы с БД
 ├── 📰 front-end           Браузерная часть
 │   ├── 📁 public          Статичные файлы
 │   └── 📁 src             Корень приложения
 │       ├── 💽 assets      Приложения
 │       ├── 📚 components  Компоненты приложения
 │       └── 🗂️ views       Страницы сайта
 ├── 🔐 ssl                  Хранилище SSL сертификатов
 └── ⚙️ config.json          Основной 
```

Всю информация по установке, настройке и использованию вы можете найти в [нашей вики](https://github.com/MayerDevelopment/WHP/wiki)
