import { ComponentRepositoryImpl } from "../repositories/ComponentRepository";

export namespace RepoHolder {
  let instance: ComponentRepositoryImpl | null = null;

  export function getInstance(): ComponentRepositoryImpl {
    if (!instance) {
      throw Error("puta ke eri wn")
    }
    return instance;
  }

  export function setInstance(newInstance: ComponentRepositoryImpl) {
    instance = newInstance;
  }
}