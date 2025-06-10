import { WinpyComponentSource } from "../data/WinpyComponentSource";
import { Component, CPUComponent, GPUComponent } from "../entities/Component";
import { Category } from "../entities/ComponentCategories";
import { CPUProduct, GPUProduct, Product } from "../entities/Product";
import { Store } from "../entities/Store";
import { DBEntityManager } from "../singletons/DbEntityManager";


export interface ComponentRepository {
    scrapeProduct(component: Component): Promise<Product[] | null>
    scrapeProductCategory(category: Category): Promise<Product[] | null>
    saveProducts(products: Product[], category: Category): Promise<void>
    getSavedComponents(category: Category): Promise<Component[]>
    saveComponents(components: Component[], category: Category): Promise<void>
}

export class ComponentRepositoryImpl implements ComponentRepository {
    dbManager = DBEntityManager.getInstance()
    winpySource = new WinpyComponentSource()

    componentMap = {
        [Category.GPU]: GPUComponent,
        [Category.CPU]: CPUComponent, // TODO: aadd missing categories
    };

    productMap = {
        [Category.GPU]: GPUProduct,
        [Category.CPU]: CPUProduct, // TODO: aadd missing categories
    };

    getComponentCategory(category: Category): GPUComponent | CPUComponent {
        return this.componentMap[category]
    }

    async scrapeProduct(component: Component): Promise<Product[]> {
        let products: Product[] = []

        const winpyProduct = await this.winpySource.findByName(component.name)

        const winpyResults = winpyProduct.filter((value) => value.name.toLocaleLowerCase().includes(component.name.toLocaleLowerCase()))

        if (component instanceof GPUComponent) {
            winpyResults.forEach((value) => {
                const product = new GPUProduct(value.name, value.price, Store.Winpy, component.id)
                products.push(product)
            })

        } else if (component instanceof CPUComponent) {
            winpyResults.forEach((value) => {
                const product = new CPUProduct(value.name, value.price, Store.Winpy, component.id)
                products.push(product)
            })
        } else { throw Error("not implemented component") } // etc....

        return products;
    }
    async scrapeProductCategory(category: Category): Promise<Product[]> {
        let products: Product[] = [];

        const componentType = this.componentMap[category];
        if (!componentType) {
            throw new Error("category not implemented");
        }

        const dbResults = await this.dbManager
            .getRepository(componentType)
            .createQueryBuilder()
            .getMany();

        for (const value of dbResults) {
            const scrapedResults = await this.scrapeProduct(value as any);
            products.push(...scrapedResults);
        }

        return products;
    }

    async saveProducts(products: Product[], category: Category): Promise<void> {
        for (const product in products) {
            const productType = this.productMap[category];
            // check if duplicate
            const dbDupResults = await this.dbManager.getRepository(productType).find(product as any)

            if (dbDupResults.length > 0) {
                continue
            }else {
                this.dbManager.save(product)
            }
        }
    }

    async getSavedProducts(componentId: number, category: Category): Promise<Product[]> {
        const productType = this.productMap[category];

        if (productType === GPUProduct) {
            const results = await this.dbManager.getRepository(productType).find({ where: { gpuComponentId: componentId } });
            return results as GPUProduct[]
        }else if (productType === CPUProduct) {
            const results = await this.dbManager.getRepository(productType).find({ where: { cpuComponentId: componentId } });
            return results as CPUProduct[]
        }else {
            throw new Error("Tipo de componente no soportado");
        }
    }

    async getSavedComponents(category: Category): Promise<Component[]> {
        const componentType = this.componentMap[category];

        return (await this.dbManager.getRepository(componentType).createQueryBuilder().getMany()) as (typeof componentType)[];
    }

    async saveComponents(components: Component[], category: Category): Promise<void> {
        const componentType = this.componentMap[category];

        for (const component of components) {
            // check if duplicate
            const dbDupResults = await this.dbManager
                .getRepository(componentType)
                .createQueryBuilder("comp")
                .where("comp.name = :name", {name: component.name}).getOne()
            if (dbDupResults) {
                continue
            }else {
                this.dbManager.save(component)
            }
        }
    }

}