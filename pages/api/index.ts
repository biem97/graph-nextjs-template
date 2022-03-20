import { NextApiHandler } from "next";
import cors from "micro-cors";
import apolloServer from "../../lib/apollo/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

let apolloServerHandler: NextApiHandler;

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await apolloServer.start();

    apolloServerHandler = apolloServer.createHandler({
      path: "/api",
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler();

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};

export default cors()(handler);
