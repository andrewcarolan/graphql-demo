exports.createUser = (_parent, args, { prisma }) => {
  const { name, email } = args;
  const user = prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return user;
};
