# Team Builder

> ⚠️ Note: The PostgreSQL database environment variables are intended for local development, make sure you change them and save them correctly in a production environment.

## Requirements

- Docker
- Docker Compose

## Running the production build locally

> ℹ️ The `docker compose` command may be `docker-compose` in your system depending on how you have it installed, if the first doesn't work, try the latter.

1. Copy the `.env.example` file to a new `.env` file.
2. Run `docker compose up -d`

## Running in development mode the app outside Docker

1. Run `docker compose up -d postgres`
2. Run `docker compose up -d redis`
3. Run `npm install`
4. Copy `.env.example` to `.env` and change both `DATABASE_HOST` and `REDIS_HOST` to `localhost`
5. Run `npx prisma generate`
6. Run `npx prisma migrate`
7. Run `npm run dev`

## Environment variables

1. The Pokémon games have a limit of 6 Pokémon per team, this can be configured through the `MAX_TEAM_SIZE` environment variable.

    ```sh
    # Default: 6
    MAX_TEAM_SIZE=9
    ```

2. If you want to target a different PokéAPI environment you can do it through the `POKEMON_API_URL` environment variable.

    ```sh
    # Default: https://pokeapi.co/api/v2
    POKEMON_API_URL=https://dev.pokeapi.co/api/v2
    ```

3. You can target the running Redis instance through the `REDIS_URL` environment variable.

    ```sh
    # Default: redis://localhost:6379
    REDIS_URL=redis://localhost:6666
    ```

4. You can configure the default `REDIS_CACHE_EXPIRATION`, in seconds, used in the Team Listing page to improve performance.

    ```sh
    # Default: 1
    REDIS_CACHE_EXPIRATION=60
    ```

## Considerations

- To cache the "Team Listing" page Redis is used with a configurable cache expiration.
- To cache the images a custom implementation was made in the `feat/image-caching`, but it isn't deploy-ready, therefore I decided to go with the native Next.js `Image` component which is cache-ready and configured for the remote Pokémon sprites.
