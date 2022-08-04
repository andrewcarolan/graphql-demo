exports.posts = (parent, _args, { prisma }) => {
  return prisma.user
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .posts();
};
