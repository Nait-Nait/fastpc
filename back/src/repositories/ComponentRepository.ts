import { WinpyComponentSource } from "../data/WinpyComponentSource";
import {
  Component,
  CPUComponent,
  GPUComponent,
  MotherboardComponent,
  PSUComponent,
  RAMComponent,
  SSDComponent,
} from "../entities/Component";
import { Category } from "../entities/ComponentCategories";
import {
  CPUProduct,
  GPUProduct,
  MotherboardProduct,
  Product,
  PSUProduct,
  RAMProduct,
  SSDProduct,
} from "../entities/Product";
import { Store } from "../entities/Store";
import { DBEntityManager } from "../singletons/DbEntityManager";

export interface ComponentRepository {
  scrapeProduct(component: Component): Promise<Product[] | null>;
  scrapeProductCategory(category: Category): Promise<Product[] | null>;
  saveProducts(products: Product[], category: Category): Promise<void>;
  getSavedComponents(category: Category, page: number): Promise<Component[]>;
  getRandomComponents(category: Category, number: number): Promise<Component[]>;
  getTotalPages(category: Category): Promise<number>;
  getComponent(id: number, category: Category): Promise<Component>;
  searchComponents(category: Category, query: string): Promise<Component[]>;
  saveComponents(components: Component[], category: Category): Promise<void>;
}

export class ComponentRepositoryImpl implements ComponentRepository {
  dbManager = DBEntityManager.getInstance();
  winpySource = new WinpyComponentSource();

  itemsPerPage = 5;

  componentMap = {
    [Category.GPU]: GPUComponent,
    [Category.CPU]: CPUComponent,
    [Category.RAM]: RAMComponent,
    [Category.PSU]: PSUComponent,
    [Category.MOTHERBOARD]: MotherboardComponent,
    [Category.SSD]: SSDComponent,
  };

  productMap = {
    [Category.GPU]: GPUProduct,
    [Category.CPU]: CPUProduct,
    [Category.RAM]: RAMProduct,
    [Category.PSU]: PSUProduct,
    [Category.MOTHERBOARD]: MotherboardProduct,
    [Category.SSD]: SSDProduct,
  };

  getComponentCategory(
    category: Category
  ):
    | typeof GPUComponent
    | typeof CPUComponent
    | typeof RAMComponent
    | typeof PSUComponent
    | typeof MotherboardComponent
    | typeof SSDComponent {
    return this.componentMap[category];
  }

  async scrapeProduct(component: Component): Promise<Product[]> {
    let products: Product[] = [];
    let category: Category;

    if (component instanceof GPUComponent) {
      category = Category.GPU;
    } else if (component instanceof CPUComponent) {
      category = Category.CPU;
    } else if (component instanceof RAMComponent) {
      category = Category.RAM;
    } else if (component instanceof PSUComponent) {
      category = Category.PSU;
    } else if (component instanceof MotherboardComponent) {
      category = Category.MOTHERBOARD;
    } else if (component instanceof SSDComponent) {
      category = Category.SSD;
    } else {
      throw Error("not implemented component");
    }

    // obtener productos de la db
    const alreadySavedProducts = await this.getSavedProducts(
      component.id,
      category
    );

    if (alreadySavedProducts.length > 0) {
      products = alreadySavedProducts;
    } else {
      const winpyProduct = await this.winpySource.findByName(component.name);

      const winpyResults = winpyProduct.filter((value) =>
        value.name
          .toLocaleLowerCase()
          .includes(component.name.toLocaleLowerCase())
      );

      if (category == Category.GPU) {
        winpyResults.forEach((value) => {
          const product = new GPUProduct(
            value.name,
            value.price,
            Store.Winpy,
            value.img,
            component.id
          );
          products.push(product);
        });
      } else if (category == Category.CPU) {
        winpyResults.forEach((value) => {
          const product = new CPUProduct(
            value.name,
            value.price,
            Store.Winpy,
            value.img,
            component.id
          );
          products.push(product);
        });
      } else if (category == Category.RAM) {
        winpyResults.forEach((value) => {
          const product = new RAMProduct(
            value.name,
            value.price,
            Store.Winpy,
            value.img,
            component.id
          );
          products.push(product);
        });
      } else if (category == Category.PSU) {
        winpyResults.forEach((value) => {
          const product = new PSUProduct(
            value.name,
            value.price,
            Store.Winpy,
            value.img,
            component.id
          );
          products.push(product);
        });
      } else if (category == Category.MOTHERBOARD) {
        winpyResults.forEach((value) => {
          const product = new MotherboardProduct(
            value.name,
            value.price,
            Store.Winpy,
            value.img,
            component.id
          );
          products.push(product);
        });
      } else if (category == Category.SSD) {
        winpyResults.forEach((value) => {
          const product = new SSDProduct(
            value.name,
            value.price,
            Store.Winpy,
            value.img,
            component.id
          );
          products.push(product);
        });
      } else {
        throw Error("not implemented component");
      } // etc....

      try {
        await this.saveProducts(products, category);
      } catch (e) {
        throw Error(`error al guardar los productos en la db: ${e}`);
      }
    }

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
    for (const product of products) {
      const productType = this.productMap[category];
      // check if duplicate
      const dbDupResults = await this.dbManager
        .getRepository(productType)
        .find(product as any);

      if (dbDupResults.length > 0) {
        continue;
      } else {
        this.dbManager.save(product);
      }
    }
  }

  async getSavedProducts(
    componentId: number,
    category: Category
  ): Promise<Product[]> {
    const productType = this.productMap[category];

    if (productType === GPUProduct) {
      const results = await this.dbManager
        .getRepository(productType)
        .find({ where: { gpuComponentId: componentId } });
      return results as GPUProduct[];
    } else if (productType === CPUProduct) {
      const results = await this.dbManager
        .getRepository(productType)
        .find({ where: { cpuComponentId: componentId } });
      return results as CPUProduct[];
    } else if (productType === RAMProduct) {
      const results = await this.dbManager
        .getRepository(productType)
        .find({ where: { ramComponentId: componentId } });
      return results as RAMProduct[];
    } else if (productType === PSUProduct) {
      const results = await this.dbManager
        .getRepository(productType)
        .find({ where: { psuComponentId: componentId } });
      return results as PSUProduct[];
    } else if (productType === MotherboardProduct) {
      const results = await this.dbManager
        .getRepository(productType)
        .find({ where: { motherboardComponentId: componentId } });
      return results as MotherboardProduct[];
    } else if (productType === SSDProduct) {
      const results = await this.dbManager
        .getRepository(productType)
        .find({ where: { ssdComponentId: componentId } });
      return results as SSDProduct[];
    } else {
      throw new Error("Tipo de componente no soportado");
    }
  }

  async getTotalPages(category: Category): Promise<number> {
    const componentType = this.componentMap[category];
    return Math.ceil(
      (await this.dbManager.getRepository(componentType).count()) /
        this.itemsPerPage
    );
  }

  async getSavedComponents(
    category: Category,
    page: number,
    itemsPerPage: number
  ): Promise<Component[]> {
    const componentType = this.componentMap[category];
    return await this.dbManager.getRepository(componentType).find({
      take: itemsPerPage,
      skip: page * itemsPerPage,
    });
  }

  async saveComponents(
    components: Component[],
    category: Category
  ): Promise<void> {
    const componentType = this.componentMap[category];

    for (const component of components) {
      // check if duplicate
      const dbDupResults = await this.dbManager
        .getRepository(componentType)
        .createQueryBuilder("comp")
        .where("comp.name = :name", { name: component.name })
        .getOne();
      if (dbDupResults) {
        continue;
      } else {
        this.dbManager.save(component);
      }
    }
  }

  async getRandomComponents(
    category: Category,
    number: number
  ): Promise<Component[]> {
    const componentType = this.componentMap[category];

    return await this.dbManager
      .getRepository(componentType)
      .createQueryBuilder()
      .select()
      .orderBy("RANDOM()")
      .take(number)
      .getMany();
  }

  async getComponent(id: number, category: Category): Promise<Component> {
    const componentType = this.componentMap[category];
    const component = await this.dbManager
      .getRepository(componentType)
      .findOne({ where: { id } });

    return component;
  }

  async searchComponents(
    category: Category,
    query: string
  ): Promise<Component[]> {
    const componentType = this.componentMap[category];

    return (await this.dbManager
      .getRepository(componentType)
      .createQueryBuilder("comp")
      .where("LOWER(comp.name) LIKE :query", {
        query: `%${query.toLowerCase()}%`,
      })
      .getMany()) as Component[];
  }
}
