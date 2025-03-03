# Team Builder

## Table of Contents

- [Team Builder](#team-builder)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Architecture](#architecture)
  - [Running the production build locally in Docker](#running-the-production-build-locally-in-docker)
  - [Running the app in development mode using local Node.js](#running-the-app-in-development-mode-using-local-nodejs)
  - [Configuration](#configuration)
  - [Considerations](#considerations)

## Requirements

- Docker
- Docker Compose
- Node.js (only for [developing without Docker](#running-in-development-mode-the-app-outside-docker))

## Architecture

The theoretical proposed architecture for AWS is explained in this [document](/docs/ARCHITECTURE.pdf).

A mock TerraForm configuration is also present [here](/docs/main.tf).

## Running the production build locally in Docker

> ℹ️ The `docker compose` command may be `docker-compose` in your system depending on how you have it installed, if the first doesn't work, try the latter.

1. Copy the `.env.example` file to a new `.env` file
2. Run `docker compose up -d`
3. Your app will be running on `localhost:3000`

## Running the app in development mode using local Node.js

1. Run `docker compose up -d postgres`
2. Run `docker compose up -d redis`
3. Run `npm install`
4. Copy `.env.example` to `.env` and change both `DATABASE_HOST` and `REDIS_HOST` to `localhost`
5. Run `npx prisma generate`
6. Run `npx prisma migrate dev`
7. Run `npm run dev`
8. Your app will be running on `localhost:3000`

## Configuration

> ⚠️ Note 1: To propagate Environment variables to the production build you must map the variables inside the `app` service inside `docker-compose.yaml`.

> ⚠️ Note 2: The PostgreSQL database environment variables are intended for local development, make sure you change them and save them correctly in a production environment.

1. The Pokémon games have a limit of 6 Pokémon per team, this can be configured through the `NEXT_PUBLIC_MAX_TEAM_SIZE` environment variable.

    ```sh
    # Default: 6
    NEXT_PUBLIC_MAX_TEAM_SIZE=9
    ```

2. If you want to target a different PokéAPI environment you can do it through the `POKEMON_API_URL` environment variable.

    ```sh
    # Default: https://pokeapi.co/api/v2
    POKEMON_API_URL=https://dev.pokeapi.co/api/v2
    ```

3. You can target the Redis instance through the `REDIS_URL` environment variable. Composed of different pieces, have a look at [`.env.example`](/.env.example).

    ```sh
    # Default: redis://localhost:6379
    REDIS_URL=redis://localhost:6666
    ```

4. You can configure the `REDIS_CACHE_EXPIRATION`, in seconds, used in the Team Listing page to improve performance.

    ```sh
    # Default: 1
    REDIS_CACHE_EXPIRATION=60
    ```

5. You can target the PostgreSQL instance through the `DATABASE_URL` environment variable. This has no default value, therefore must be set to work. Composed of different pieces, have a look at [`.env.example`](/.env.example).

    ```sh
    # Default: N/A
    DATABASE_URL=postgresql://user:password@localhost:5432/pokemon_db?schema=public
    ```

6. Docker only: you can target the app port through the `APP_PORT` environment variable. This has no default value, therefore must be set to work.

    ```sh
    # Default: N/A
    APP_PORT=3000
    ```

## Considerations

- To cache the "Team Listing" page Redis is used with a configurable cache expiration.
- To cache the images a custom implementation was made in the `feat/image-caching`, but it isn't deploy-ready, therefore I decided to go with the native Next.js `Image` component which is cache-ready and configured for the remote Pokémon sprites.
