# АвтоВас — landing (static)

Статический сайт (HTML/CSS/JS). Рекомендуемый способ запуска на сервере — через Docker (nginx).

## Локальный запуск (без Docker)

Нужен Node.js.

```bash
npm i
npm run start
```

Откройте `http://localhost:5180`.

## Локальный запуск (Docker)

Нужен Docker + Docker Compose.

```bash
docker compose up -d --build
```

Откройте `http://localhost:8080`.

Остановить:

```bash
docker compose down
```

## Деплой на сервер (Docker Compose)

1) Установите Docker и Docker Compose на сервер.
2) Скопируйте проект на сервер (git clone или rsync).
3) В папке проекта выполните:

```bash
docker compose up -d --build
```

По умолчанию сайт будет доступен на порту `8080` (HTTP).

### Если нужен порт 80

Измените в `docker-compose.yml`:

```yaml
ports:
  - "80:80"
```

И перезапустите:

```bash
docker compose up -d --build
```

### Примечания

- Конфиг nginx лежит в `deploy/docker/nginx.conf`.
- Статика копируется в контейнер из `index.html`, `styles.css`, `script.js`, `assets/` и `car_divider/`.
