-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL,
    "pokedexId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "localSprite" TEXT NOT NULL,
    "sprite" TEXT NOT NULL,
    "baseExp" INTEGER NOT NULL,
    "abilities" TEXT[],
    "types" TEXT[],

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamPokemon" (
    "teamId" TEXT NOT NULL,
    "pokemonId" TEXT NOT NULL,

    CONSTRAINT "TeamPokemon_pkey" PRIMARY KEY ("teamId","pokemonId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_pokedexId_key" ON "Pokemon"("pokedexId");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
