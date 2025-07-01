
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

export class GPUComponent implements Component {

    id: number;
    name: string;
    memory: string;
    wattage: string;

    constructor(id: number, name: string, memory: string, wattage: string) {
        this.id = id;
        this.name = name;
        this.memory = memory;
        this.wattage = wattage;
    }
}

export class CPUComponent implements Component {

    id: number;

    name: string;
    cores: string;
    clock: string;
    socket: string;
    tdp: string;
    wattage: string;

    constructor(id: number, name: string, cores: string, clock: string, socket: string, tdp: string, wattage: string) {
        this.id = id;
        this.name = name;
        this.cores = cores;
        this.clock = clock;
        this.socket = socket;
        this.tdp = tdp;
        this.wattage = wattage;
    }
}

export class RAMComponent implements Component {
    id: number;

    name: string;
    brand: string;
    capacity: string;
    gen: string;
    speed: string;
    wattage: string;

    constructor(id: number, name: string, brand: string, capacity: string, gen: string, speed: string, wattage: string) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.capacity = capacity;
        this.gen = gen;
        this.speed = speed;
        this.wattage = wattage;
    }

}

export class PSUComponent implements Component {
    id: number;

    name: string;
    manufacturer: string;
    model: string;
    efficiencyRating: string;
    noiseRating: string;
    wattage: string;

    constructor(
        id: number,
        name: string,
        manufacturer: string,
        model: string,
        efficiencyRating: string,
        noiseRating: string,
        wattage: string
    ) {
        this.id = id;
        this.name = name,
            this.manufacturer = manufacturer;
        this.model = model;
        this.efficiencyRating = efficiencyRating;
        this.noiseRating = noiseRating;
        this.wattage = wattage;
    }
}

export class MotherboardComponent implements Component {
    id: number;

    name: string;
    year: number;
    socket: string;
    chipset: string;
    formFactor: string;
    powerConsumption: string;
    memorySupport: string;
    pcieSupport: string;
    constructor(
        id: number,
        name: string,
        year: number,
        socket: string,
        chipset: string,
        formFactor: string,
        powerConsumption: string,
        memorySupport: string,
        pcieSupport: string,
    ) {
        this.id = id;
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


export class SSDComponent implements Component {
    id: number;

    name: string;
    capacity: string;
    format: string;
    interface: string;
    released: string;
    controller: string;
    dram: string;
    wattage: string;

    constructor(
        id: number,
        name: string,
        capacity: string,
        format: string,
        iface: string,
        released: string,
        controller: string,
        dram: string,
        wattage: string
    ) {
        this.id = id;
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