import client from "@/libs/db";
import { RedisClientType } from "redis";

class Game {
  client: RedisClientType;

  constructor() {
    this.client = client;
  }

  createGame(title: string) {
    const offer = await peerConnection.createOffer();

    this.client.set(title, title);
  }

  joinGame(title: string) {}
}

export default Game;
