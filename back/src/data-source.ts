import "reflect-metadata"
import { DataSource } from "typeorm"
import {GPUComponent, CPUComponent} from "./entities/Component"
import {CPUProduct, GPUProduct} from "./entities/Product"
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
    entities: [ GPUComponent, GPUProduct, CPUComponent, CPUProduct, User ],
    migrations: [],
    subscribers: [],
})
