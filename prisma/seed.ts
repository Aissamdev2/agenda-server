import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const cardData: Prisma.CardCreateInput[] = [
    {
      id: 'card1',
      name: 'Card 1',
      tags: {
        red: true,
        blue: false,
        green: false,
      },
      description: 'Card 1 description',
      date: '2022-01-01',
      time: '10:00',
    },
    {
      id: 'card2',
      name: 'Card 2',
      tags: {
        red: false,
        blue: true,
        green: true,
      },
      description: 'Card 2 description',
      date: '2022-01-01',
      time: '10:00',
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const c of cardData) {
        // create pet if not exists
        const card = await prisma.card.upsert({
            where: { id: c.id },
            create: c,
            update: {},
        });
        console.log(`Upserted Card with id: ${card.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });