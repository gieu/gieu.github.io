# gieu.github.io

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


To run using docker compose 

1. Windowns

    ```
    $env:PORT="8517"
    docker-compose up --build --force-recreate --no-deps -d
    ```
2. Ubuntu
    ```
    export PORT="8517"
    sudo docker-compose up --build --force-recreate --no-deps -d
    ```