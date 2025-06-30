import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



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
    benchmarkScore: number | null;
    @Column()
    vram: number;

    constructor(name: string, benchmarkScore:number, vram:number) {
        this.name = name;
        this.benchmarkScore = benchmarkScore;
        this.vram = vram;
    }
}

@Entity()
export class CPUComponent implements Component {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    benchmarkScore: number;
    @Column()
    frecuency: number;
    @Column()
    cores: number;
    @Column()
    threads: number;
    @Column()
    socket: string;
    @Column()
    tdp: number;
    @Column()
    hyperthreading: boolean

    constructor(name:string, benchmarkscore:number, frecuency:number, cores:number, threads:number, socket:string, tdp:number, hyperthreading:boolean ) {
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