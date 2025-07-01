import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export class ColumnNumericTransformer {
    to(data: number): number {
        return data;
    }
    from(data: string): number {
        return parseFloat(data);
    }
}

export interface Component {
    id: number,
    name: string,
}


@Entity()
export class GPUComponent implements Component {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    memory: string;
    @Column()
    wattage: string;

    constructor(name: string, memory: string, wattage: string) {
        this.name = name;
        this.memory = memory;
        this.wattage = wattage;
    }
}

@Entity()
export class CPUComponent implements Component {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    cores: string;
    @Column()
    clock: string;
    @Column()
    socket: string;
    @Column()
    tdp: string;
    @Column()
    wattage: string;

    constructor(name: string, cores: string, clock: string, socket: string, tdp: string, wattage: string) {
        this.name = name;
        this.cores = cores;
        this.clock = clock;
        this.socket = socket;
        this.tdp = tdp;
        this.wattage = wattage;
    }
}

@Entity()
export class RAMComponent implements Component {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    brand: string;
    @Column()
    capacity: string;
    @Column()
    gen: string;
    @Column()
    speed: string;
    @Column()
    wattage: string;

    constructor(name: string, brand: string, capacity: string, gen: string, speed: string, wattage: string) {
        this.name = name;
        this.brand = brand;
        this.capacity = capacity;
        this.gen = gen;
        this.speed = speed;
        this.wattage = wattage;
    }

}

@Entity()
export class PSUComponent implements Component {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    manufacturer: string;
    @Column()
    model: string;
    @Column()
    efficiencyRating: string;
    @Column()
    noiseRating: string;
    @Column()
    wattage: string;

    constructor(
        name: string,
        manufacturer: string,
        model: string,
        efficiencyRating: string,
        noiseRating: string,
        wattage: string
    ) {
        this.name = name,
            this.manufacturer = manufacturer;
        this.model = model;
        this.efficiencyRating = efficiencyRating;
        this.noiseRating = noiseRating;
        this.wattage = wattage;
    }
}

@Entity()
export class MotherboardComponent implements Component {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    year: number;
    @Column()
    socket: string;
    @Column()
    chipset: string;
    @Column()
    formFactor: string;
    @Column()
    powerConsumption: string;
    @Column()
    memorySupport: string;
    @Column()
    pcieSupport: string;
    constructor(
        name: string,
        year: number,
        socket: string,
        chipset: string,
        formFactor: string,
        powerConsumption: string,
        memorySupport: string,
        pcieSupport: string
    ) {
        this.name = name;
        this.year = year;
        this.socket = socket;
        this.chipset = chipset;
        this.formFactor = formFactor;
        this.powerConsumption = powerConsumption;
        this.memorySupport = memorySupport;
        this.pcieSupport = pcieSupport
    }
}


@Entity()
export class SSDComponent implements Component {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    capacity: string;
    @Column()
    format: string;
    @Column()
    interface: string;
    @Column()
    released: string;
    @Column()
    controller: string;
    @Column()
    dram: string;
    @Column()
    wattage: string;

    constructor(
        name: string,
        capacity: string,
        format: string,
        iface: string,
        released: string,
        controller: string,
        dram: string,
        wattage: string
    ) {
        this.name = name;
        this.capacity = capacity;
        this.format = format;
        this.interface = iface;
        this.released = released;
        this.controller = controller;
        this.dram = dram;
        this.wattage = wattage;
    }
}
