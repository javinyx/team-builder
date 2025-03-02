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
    "name" TEXT NOT NULL,
    "pokedexNumber" INTEGER NOT NULL,
    "sprite" TEXT NOT NULL,
    "baseExperience" INTEGER NOT NULL,
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
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_pokedexNumber_key" ON "Pokemon"("pokedexNumber");

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPokemon" ADD CONSTRAINT "TeamPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
