import prisma from "../../../prisma";

export const resolvers = {
  Query: {
    ping: () => `pong: ${Date.now()}`,
  },
};
