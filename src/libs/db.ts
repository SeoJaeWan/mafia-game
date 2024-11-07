import { createClient, RedisClientType } from "redis";

const PASSWORD = process.env.NEXT_PUBLIC_REDIS_PASSWORD;
const HOST = process.env.NEXT_PUBLIC_REDIS_SOCKET_HOST;
const PORT = Number(process.env.NEXT_PUBLIC_REDIS_SOCKET_PORT);

const client: RedisClientType = createClient({
  password: PASSWORD,
  socket: {
    host: HOST,
    port: PORT,
  },
});

client.on("error", (err) => console.log(err));

if (!client.isOpen) {
  client.connect();
}

export default client;
