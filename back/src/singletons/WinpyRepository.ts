import { WinpyComponentSource } from "../data/WinpyComponentSource";

export namespace WinpyRepoSingle {
  let instance: WinpyComponentSource | null = null;

  export function getInstance(): WinpyComponentSource {
    if (!instance) {
      throw Error("puta ke eri wn")
    }
    return instance;
  }

  export function setInstance(newInstance: WinpyComponentSource) {
    instance = newInstance;
  }
}