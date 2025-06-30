import { Column, Entity, ForeignKey, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./Store";
import { CPUComponent, GPUComponent, MotherboardComponent, PSUComponent, RAMComponent, SSDComponent } from "./Component";


export interface Product {
    name: string,
    price: number,
    store: Store,
    img: string
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
    img: string;

    @Column()
    @ForeignKey<GPUComponent>("GPUComponent", "id")
    gpuComponentId:number

    constructor(name: string, price: number, store: Store, img:string, gpuComponentId: number) {
        this.name = name;
        this.price = price;
        this.store = store;
        this.img = img;
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
    img: string;

    @Column()
    @ForeignKey<CPUComponent>("CPUComponent", "id")
    cpuComponentId:number

    constructor(name: string, price: number, store: Store, img:string, cpuComponentId: number) {
        this.name = name;
        this.price = price;
        this.store = store;
        this.img = img;
        this.cpuComponentId = cpuComponentId;
    }
}

@Entity()
export class RAMProduct implements Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;
    @Column()
    price: number;
    @Column()
    store: Store;
    @Column()
    img: string;

    @Column()
    @ForeignKey<RAMComponent>("RAMComponent", "id")
    cpuComponentId:number

    constructor(name: string, price: number, store: Store, img:string, cpuComponentId: number) {
        this.name = name;
        this.price = price;
        this.store = store;
        this.img = img;
        this.cpuComponentId = cpuComponentId;
    }
}

@Entity()
export class PSUProduct implements Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;
    @Column()
    price: number;
    @Column()
    store: Store;
    @Column()
    img: string;

    @Column()
    @ForeignKey<PSUComponent>("PSUComponent", "id")
    cpuComponentId:number

    constructor(name: string, price: number, store: Store, img:string, cpuComponentId: number) {
        this.name = name;
        this.price = price;
        this.store = store;
        this.img = img;
        this.cpuComponentId = cpuComponentId;
    }
}

@Entity()
export class MotherboardProduct implements Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;
    @Column()
    price: number;
    @Column()
    store: Store;
    @Column()
    img: string;

    @Column()
    @ForeignKey<MotherboardComponent>("MotherboardComponent", "id")
    cpuComponentId:number

    constructor(name: string, price: number, store: Store, img:string, cpuComponentId: number) {
        this.name = name;
        this.price = price;
        this.store = store;
        this.img = img;
        this.cpuComponentId = cpuComponentId;
    }
}

@Entity()
export class SSDProduct implements Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;
    @Column()
    price: number;
    @Column()
    store: Store;
    @Column()
    img: string;

    @Column()
    @ForeignKey<SSDComponent>("SSDComponent", "id")
    cpuComponentId:number

    constructor(name: string, price: number, store: Store, img:string, cpuComponentId: number) {
        this.name = name;
        this.price = price;
        this.store = store;
        this.img = img;
        this.cpuComponentId = cpuComponentId;
    }
}