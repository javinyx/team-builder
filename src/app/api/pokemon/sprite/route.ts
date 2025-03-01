import fs from "node:fs";

export async function POST(req: Request) {
    const { localPath, spriteUrl } = await req.json();

    try {
        if (!fs.existsSync(localPath)) {
            const imageResponse = await fetch(spriteUrl);
            const buffer = await imageResponse.arrayBuffer();
            fs.writeFileSync(localPath, Buffer.from(buffer));
        }

        return Response.json({ success: true });
    } catch {
        return Response.json(
            { error: "Failed to download Pokémon sprite" },
            { status: 500 },
        );
    }
}