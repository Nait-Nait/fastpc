import { UserRepositoryImpl } from "../repositories/UserRepository";


export namespace UserRepoHolder {
  let instance: UserRepositoryImpl | null = null;

  export function getInstance(): UserRepositoryImpl {
    if (!instance) {
      throw Error("puta ke eri wn")
    }
    return instance;
  }

  export function setInstance(newInstance: UserRepositoryImpl) {
    instance = newInstance;
  }
}