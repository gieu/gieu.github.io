# gieu.github.io

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:8517`     |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🐳 Docker Deployment

To run using docker compose:

1. **Development/Master (Port 8517)**

    ```bash
    echo "PORT=8517" > .env
    docker-compose up --build --force-recreate --no-deps -d
    ```

2. **Staging (Port 8518)**

    ```bash
    echo "PORT=8518" > .env
    docker-compose up --build --force-recreate --no-deps -d
    ```

3. **Production (Default Port 4321)**

    ```bash
    docker-compose up --build --force-recreate --no-deps -d
    ```

The application will be available at:
- Master: http://localhost:8517
- Staging: http://localhost:8518  
- Production: http://localhost:4321

### Environment Variables

You can customize the deployment by creating a `.env` file with:

```env
PORT=4321
NODE_ENV=production
```