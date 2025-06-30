export interface Component {
    id: number,
    name: string,
}

export class GPUComponent implements Component {
    id: number;
    name: string;
    benchmarkScore: number | null;
    vram: number;

    constructor(id:number, name: string, benchmarkScore:number, vram:number) {
        this.id = id;
        this.name = name;
        this.benchmarkScore = benchmarkScore;
        this.vram = vram;
    }
}

export class CPUComponent implements Component {
    id: number;
    name: string;
    benchmarkScore: number;
    frecuency: number;
    cores: number;
    threads: number;
    socket: string;
    tdp: number;
    hyperthreading: boolean

    constructor(id:number, name:string, benchmarkscore:number, frecuency:number, cores:number, threads:number, socket:string, tdp:number, hyperthreading:boolean ) {
        this.id = id;
        this.name = name;
        this.benchmarkScore = benchmarkscore;
        this.frecuency = frecuency;
        this.cores = cores;
        this.threads = threads;
        this.socket = socket;
        this.tdp = tdp;
        this.hyperthreading = hyperthreading;
    }
}