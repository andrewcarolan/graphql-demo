exports.author = (parent, args, { prisma }) => {
  return prisma.user.findUnique({
    where: {
      id: parent.authorId,
    },
  });
};
