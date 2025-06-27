import { Product } from "../entities/Product";
import { ComponentSource } from "./ComponentSource";
import { Store } from "../entities/Store";


export enum WinpyProductCategory {
    PARTES_Y_PIEZAS = 'PARTES Y PIEZAS', // solo nos interesa esta
    COMPUTADORES = 'COMPUTADORES',
    ACCESORIOS = 'ACCESORIOS',
    DESCONOCIDO = 'DESCONOCIDO'
}

export class WinpyProduct implements Product {
    name: string;
    price: number;
    store: Store = Store.Winpy;
    category: WinpyProductCategory;
    stock: number;
    brand: string; // msi, asus
    description: string;
    rank: number; // rango que simboliza la importancia de mostrar este producto siendo 1 el mas importante
    img: string;

    constructor(name: string, price:number, category: WinpyProductCategory, stock:number, brand:string, description:string, rank:number, img: string) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.stock = stock;
        this.brand = brand;
        this.description = description;
        this.rank = rank;
        this.img =  img;
    }

}

export class WinpyComponentSource implements ComponentSource {
    endpoint = "https://api.impresee.com/ImpreseeSearch/api/v3/search/text/a9a70610-18c5-4b89-b225-185cdec29bd2"


    async fetchSearch(text: string,numPage: number = 0,pageSize: number = 16): Promise<WinpyProduct[]> {
        const body = {
            query_text: text,
            query_id: null,
            page_size: pageSize,
            num_page: numPage,
            search_type: "FULL",
            search_filter: [],
            search_reorder: "",
            is_mobile: "true",
            num_suggestions: 0,
            is_suggested_search: "false",
            is_from_first: "false",
            where: [],
            loaded_from_url_params: "true",
            ref: `https://www.winpy.cl/search?IText=${encodeURIComponent(text)}`
        };

        const response = await fetch(this.endpoint, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/json;charset=utf-8",
                "Sec-GPC": "1",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site"
            },
            referrer: "https://www.winpy.cl/",
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const results: any[] = (await response.json() as any).products;

        const filteredResults = results.filter((value) => value.category == WinpyProductCategory.PARTES_Y_PIEZAS)

        // TODO: make a function to resolve category
        return filteredResults.map((value: any) => new WinpyProduct(value.name, value.price, WinpyProductCategory.PARTES_Y_PIEZAS, value.instock, value.brand, value.description, value.rank, value.image))
    }



    async findByName(name: string): Promise<WinpyProduct[] | null> {
        return (await this.fetchSearch(name)).filter((value) => value.stock > 0)
    }
}
