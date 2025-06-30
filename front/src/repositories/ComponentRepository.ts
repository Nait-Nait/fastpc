import { API_BASE_URL } from "@/config/backConfig";
import type { Category } from "@/entities/ComponentCategories";
import { ScrapedComponent } from "@/entities/ScrapedComponent";


export interface ComponentRepository {
    list(category: Category, page: number): Promise<{ totalPages: number; results: ScrapedComponent[] }>;
    search(category: Category, query: string): Promise<{ results: ScrapedComponent[] }>;
    details(category: Category, id: number): Promise<{ results: ScrapedComponent[] }>
    random(category: Category, number: number): Promise<ScrapedComponent[]>;
}

export class ComponentRepositoryImpl implements ComponentRepository {
    async list(category: Category, page: number): Promise<{ totalPages: number; results: ScrapedComponent[] }> {
        const response = await fetch(`${API_BASE_URL}/components/list?category=${category}&page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        return response.json()
    }

    async search(category: Category, query: string): Promise<{ results: ScrapedComponent[] }> {
        const response = await fetch(`${API_BASE_URL}/components/search?category=${category}&query=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        return response.json()
    }

    async details(category: Category, id: number): Promise<{ results: ScrapedComponent[] }> {
        const response = await fetch(`${API_BASE_URL}/components/details?category=${category}&id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        return response.json()
    }

    async random(category: Category, number: number): Promise<ScrapedComponent[]> {
        const response = await fetch(`${API_BASE_URL}/components/random?category=${category}&number=${number}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        return response.json()
    }

}