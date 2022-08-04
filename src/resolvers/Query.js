exports.users = async (_parent, args, { prisma }) => {
  const { name } = args;
  let where = {};

  if (!!name) {
    where.name = { contains: name };
  }

  return prisma.user.findMany({ where });
};

exports.posts = (_parent, _args, { prisma }) => {
  return prisma.post.findMany();
};
