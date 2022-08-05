const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const post = await prisma.post.findFirst();

  const users = await prisma.user.findMany({
    where: {
      // name: { contains: "And" },
      id: post.authorId,
    },
  });
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
