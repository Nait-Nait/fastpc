import { Category } from "@/entities/ComponentCategories";
import { ScrapedComponent } from "@/entities/ScrapedComponent";
import { ComponentRepositoryImpl } from "@/repositories/ComponentRepository";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";



export default function Details() {
    const [searchParams] = useSearchParams();

    const categoryParam = searchParams.get('category') as Category | null;
    const idParam = parseInt(searchParams.get('id') || '0', 10);

    const category: Category = categoryParam ?? Category.CPU;
    const id: number = isNaN(idParam) ? 1 : idParam;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [component, setComponent] = useState(null as unknown as ScrapedComponent | undefined);

    useEffect(() => {
        setLoading(true)
        const componentRepo = new ComponentRepositoryImpl();
        componentRepo
            .details(category, id)
            .then((value) => {
                setComponent(value.results[0]);
                setLoading(false);
                console.log(value);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });

    }, []);

    if (error) {
        return (
            <div className="flex justify-center items-center">
                <h1>Error al obtener el componente</h1>
            </div>
        );
    }

    if (loading) {
        return (<h1>CARGANDO...</h1>)
    }

    return (
        <div>
            {JSON.stringify(component)}
        </div>
    )
}