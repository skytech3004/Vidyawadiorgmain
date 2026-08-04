import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

async function main() {
    const { seedHomeAwardsIfEmpty, seedHomeFacilitiesIfEmpty } = await import("../src/lib/home-seed");
    const facilitiesSeeded = await seedHomeFacilitiesIfEmpty();
    const awardsSeeded = await seedHomeAwardsIfEmpty();

    console.log(
        JSON.stringify(
            {
                facilitiesSeeded,
                awardsSeeded,
            },
            null,
            2
        )
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
