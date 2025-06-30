import "reflect-metadata"
import { DataSource } from "typeorm"
import { GPUComponent, CPUComponent, RAMComponent, PSUComponent, SSDComponent, MotherboardComponent } from "./entities/Component"
import { CPUProduct, GPUProduct, MotherboardProduct, PSUProduct, RAMProduct, SSDProduct } from "./entities/Product"
import { User } from "./entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "superuser",
    password: "superpass",
    database: "fastpc",
    synchronize: true,
    logging: false,
    entities: [
        GPUComponent, GPUProduct,
        CPUComponent, CPUProduct,
        RAMComponent, RAMProduct,
        PSUComponent, PSUProduct,
        SSDComponent, SSDProduct,
        MotherboardComponent, MotherboardProduct,
        User
    ],
    migrations: [],
    subscribers: [],
})
