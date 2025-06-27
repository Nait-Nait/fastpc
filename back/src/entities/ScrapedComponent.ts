import { Component } from "./Component";
import { Product } from "./Product";


export class ScrapedComponent {
    component: Component
    products: Product[]

    constructor(component: Component, products: Product[]) {
        this.component = component;
        this.products = products;
    }
}