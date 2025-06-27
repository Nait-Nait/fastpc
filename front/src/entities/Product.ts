import { Store } from "./Store";

export interface Product {
    name: string,
    price: number,
    store: Store,
    img: string
}

export class GPUProduct implements Product {
    id:number;
    name: string;
    price: number;
    store: Store;
    img: string

    gpuComponentId:number

    constructor(id:number, name: string, price: number, store: Store, img:string, gpuComponentId: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.store = store;
        this.img = img;
        this.gpuComponentId = gpuComponentId;
    }
}

export class CPUProduct implements Product {
    id:number;

    name: string;
    price: number;
    store: Store;
    img: string

    cpuComponentId:number

    constructor(id:number, name: string, price: number, store: Store, img:string, cpuComponentId: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.store = store;
        this.img = img;
        this.cpuComponentId = cpuComponentId;
    }
}