# Web hosting control panel

Languages: [Русский](https://github.com/MayerDevelopment/WHP/blob/master/README.ru.md), **English**

## Technologies

* [Node.js](https://github.com/nodejs/node)
* [Apache](https://httpd.apache.org)
* [Axios](https://github.com/axios/axios)
* [dc-api-core](https://github.com/DimaCrafter/dc-api-core)
* [Express](https://github.com/expressjs/express)
* [Mongoose](https://github.com/Automattic/mongoose)
* [MongoDB](https://github.com/mongodb/mongo)
* [Vue](https://github.com/vuejs/vue)
* [Vuex](https://github.com/vuejs/vuex)

---

## Structure

```txt
📙
 ├── 📦 back-end             Server part (dc-api-core)
 │   ├── ⚙️ controllers      Request controllers
 │   ├── 🗃️ models           Models for working with DB
 │   └── 📁 site_template    Templates, that used while creating site
 │       ├── 📁 public_html  Default site files
 │       └── ⚙️ apache.conf  Apache configuration file
 ├── 📰 front-end            Browser part
 │   ├── 📁 public           Static files
 │   └── 📁 src              App root
 │       ├── 💽 assets       Assets
 │       ├── 📚 components   Basic application components
 │       ├── 🌍 lang         Localization files
 │       ├── 🎨 styles       Style kits
 │       └── 🗂️ views        Site pages
 ├── 🔐 ssl                  SSL certificates storage
 └── ⚙️ config.json          Main configuration file
```

All information about install, setup and using you can fing in [our wiki](https://github.com/MayerDevelopment/WHP/wiki)

---

## Future plans

* Site removing
* Site re-creation
* Working with DB
* Working with FTP
* Working with DNS and domains
