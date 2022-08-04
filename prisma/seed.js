const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const pinky = await prisma.user.upsert({
    where: { email: "pinky@acme.co" },
    update: {},
    create: {
      email: "pinky@acme.co",
      name: "Pinky",
      posts: {
        create: {
          title: "Narf!",
        },
      },
    },
  });

  const brain = await prisma.user.upsert({
    where: { email: "brain@acme.co" },
    update: {},
    create: {
      email: "brain@acme.co",
      name: "Brain",
      posts: {
        create: [
          {
            title: "My plan to take over the world",
            content: "The same thing we do every night, Pinky...",
            published: true,
          },
        ],
      },
    },
  });

  const users = await prisma.user.findMany();
  console.log(users);
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
