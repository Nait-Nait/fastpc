import { Product } from "../entities/Product";

export interface ComponentSource {
    findByName(name: string): Promise<Product[] | null>;
}