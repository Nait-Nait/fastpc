import { Column, Entity, ForeignKey, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./Store";
import { CPUComponent, GPUComponent } from "./Component";


export interface Product {
    name: string,
    price: number,
    store: Store
}

@Entity()
export class GPUProduct implements Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;
    @Column()
    price: number;
    @Column()
    store: Store;

    @Column()
    @ForeignKey<GPUComponent>("GPUComponent", "id")
    gpuComponentId:number

    constructor(name: string, price: number, store: Store, gpuComponentId: number) {
        this.name = name;
        this.price = price;
        this.store = store;
        this.gpuComponentId = gpuComponentId;
    }
}

@Entity()
export class CPUProduct implements Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;
    @Column()
    price: number;
    @Column()
    store: Store;

    @Column()
    @ForeignKey<CPUComponent>("CPUComponent", "id")
    cpuComponentId:number

    constructor(name: string, price: number, store: Store, cpuComponentId: number) {
        this.name = name;
        this.price = price;
        this.store = store;
        this.cpuComponentId = cpuComponentId;
    }
}