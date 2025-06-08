import { EntityManager } from "typeorm";

export namespace DBEntityManager {
  let instance: EntityManager | null = null;

  export function getInstance(): EntityManager {
    if (!instance) {
      throw Error("puta ke eri wn")
    }
    return instance;
  }

  export function setInstance(newInstance: EntityManager) {
    instance = newInstance;
  }
}