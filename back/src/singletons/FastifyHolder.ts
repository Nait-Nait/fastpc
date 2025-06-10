import { FastifyInstance } from "fastify";

export namespace FastifyHolder {
  let instance: FastifyInstance | null = null;

  export function getInstance(): FastifyInstance {
    if (!instance) {
      throw Error("puta ke eri wn")
    }
    return instance;
  }

  export function setInstance(newInstance: FastifyInstance) {
    instance = newInstance;
  }
}