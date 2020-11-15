# Трудовые ресурсы
Интерфейс распределенной системы хранения и обработки данных о занятости в Калининградской области, поступающих из официальных источников информации (например, Пенсионный Фонд России). 

Данные, поступающие в систему обрабатываются и визуализируются аналитическими средствами.

Стек решения: ElasticSearch, Kibana, Keepalived, VueJS, Bulma, Buefy, SCSS, Python, Vuex, Webpack, Docker.

Уникальность: решение позволяет автоматизировать создание статистических данных о трудовых ресурсах и построение БТР (Баланс Трудовых Ресурсов), а также делать аналитический прогноз.

# Go
```
npm install
npm run start
```

# or Docker
```
docker build --build-arg ELASTIC_URL=http://31.31.203.177:9200 --build-arg ELASTIC_USER=elastic --build-arg ELASTIC_PASS=password -t workforce .
docker run --name workforce -p 8081:80 -d workforce
```

Enjoy!
