import "reflect-metadata"
import { DataSource } from "typeorm"
import {GPUComponent, CPUComponent} from "./entities/Component"
import {GPUProduct} from "./entities/Product"
import { User } from "./entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 15432,
    username: "superuser",
    password: "superpass",
    database: "fastpc",
    synchronize: true,
    logging: false,
    entities: [ GPUComponent, GPUProduct, CPUComponent, User ],
    migrations: [],
    subscribers: [],
})
