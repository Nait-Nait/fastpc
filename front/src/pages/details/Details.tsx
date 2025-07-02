import { Category } from "@/entities/ComponentCategories";
import { ScrapedComponent } from "@/entities/ScrapedComponent";
import { ComponentRepositoryImpl } from "@/repositories/ComponentRepository";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ComponentDetailView from "@/components/ComponentDetailView";

function NameToURL(name:string): string {
  return "https://www.winpy.cl/venta/" + name.toLocaleLowerCase().replace(" ", "-")
}

export default function Details() {
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get("category") as Category | null;
  const idParam = parseInt(searchParams.get("id") || "0", 10);

  const category: Category = categoryParam ?? Category.CPU;
  const id: number = isNaN(idParam) ? 1 : idParam;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [scraped, setScraped] = useState<ScrapedComponent | undefined>();

  useEffect(() => {
    setLoading(true);
    const componentRepo = new ComponentRepositoryImpl();
    componentRepo
      .details(category, id)
      .then((value) => {
        setScraped(value.results[0]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [category, id]);

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <h1>Error al obtener el componente</h1>
      </div>
    );
  }

  if (loading || !scraped) {
    return <h1>CARGANDO...</h1>;
  }

  // 1. Extrae el componente individual
  const mainComponent = scraped.component;

  // 2. Extrae los precios de los productos asociados, si existen
  const prices = (scraped.products || []).map((prod: any) => ({
    store: prod.store || prod.seller || prod.tienda || "Tienda",
    price: prod.price ? Number(prod.price) : 0,
    normalPrice: prod.normalPrice ? Number(prod.normalPrice) : undefined,
    rating: prod.rating ? Number(prod.rating) : undefined,
  }));

  // 3. Imagen: del primer producto (si existe)
  const imageUrl =
    scraped.products && scraped.products.length > 0 && scraped.products[0].img
      ? scraped.products[0].img
      : "/placeholder.png";

  return (
    <div className="min-h-screen bg-[var(--background)] items-center">
      <ComponentDetailView
        component={mainComponent}
        prices={prices}
        imageUrl={imageUrl}
        products={scraped.products || []}
      />
    </div>
  );
}
