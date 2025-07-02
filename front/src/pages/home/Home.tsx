import { useEffect, useState } from "react";
import CardComponent from "@/components/Card";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Category } from "@/entities/ComponentCategories";
import { ScrapedComponent } from "@/entities/ScrapedComponent";
import { ComponentRepositoryImpl } from "@/repositories/ComponentRepository";

function SkeletonCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8" />
        </CardTitle>
      </CardHeader>
      <CardDescription className="flex flex-col">
        <div className="space-y-2 w-full px-6">
          <Skeleton className="h-4 w-[96%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </CardDescription>
    </Card>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [components, setComponents] = useState<ScrapedComponent[]>([]);

  useEffect(() => {
    const componentRepo = new ComponentRepositoryImpl();
    Promise.all([
      componentRepo.list(Category.GPU, 0),
      componentRepo.list(Category.GPU, 1),
    ])
      .then(([page0, page1]) => {
        setComponents((prev) => [
          ...prev,
          ...(page0.results || []),
          ...(page1.results || []),
        ]);
        setLoading(false);
        console.log({ page0, page1 });
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <h1>Error al obtener los componentes</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <div className="flex flex-row justify-center w-full pb-10">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-3xl">Componentes Mas Buscados</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-15">
      <div className="flex flex-row justify-center w-full pb-10">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-3xl">Componentes Mas Buscados</h1>
          <p className="text-base text-center text-gray-400 mb-6 max-w-xl mx-auto font-normal">
            Compara componentes y arma tu PC ideal, sin ser experto.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex gap-6 w-max px-4 snap-x snap-mandatory">
          {components
            .filter((value) => value.products.length > 0)
            .slice(0, 12) // puedes mostrar más de 6 en horizontal
            .map((component) => (
              <div key={component.component.name} className="snap-center">
                <CardComponent
                  name={component.component.name}
                  onClick={() =>
                    (window.location.href = `/components/component?category=${Category.GPU}&id=${component.component.id}`)
                  }
                  description={`precio: ${
                    component.products[0]
                      ? `$ ${new Intl.NumberFormat("es-CL").format(
                          component.products[0].price
                        )}`
                      : "Agotado"
                  }`}
                  img={component.products[0]?.img || undefined}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
