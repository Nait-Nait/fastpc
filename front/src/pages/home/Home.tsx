import { useEffect, useState } from "react";
import CardComponent from "@/components/Card";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    componentRepo
      .list(Category.GPU, 0)
      .then((value) => {
        setComponents(value);
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
        <h1>Error al obtener los componentes</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <div className="flex flex-row justify-center w-full pb-10">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-3xl">
              Componentes Mas{" "}
              <span className="relative px-2 sm:mr-2 mr-0 md:[&_svg]:size-[45px] sm:[&_svg]:size-7 bg-main/50 rounded-base border-2 border-border/40 dark:border-border/70">
                Buscados
              </span>{" "}
            </h1>
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
    <div>
      <div className="flex flex-row justify-center w-full pb-10">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-3xl">
            Componentes Mas{" "}
            <span className="relative px-2 sm:mr-2 mr-0 md:[&_svg]:size-[45px] sm:[&_svg]:size-7 bg-main/50 rounded-base border-2 border-border/40 dark:border-border/70">
              Buscados
            </span>{" "}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {components.map((component) => (
          <>
            <CardComponent
              key={component.component.name}
              name={component.component.name}
              description={`precio: ${component.products[0] ? component.products[0].price : "Agotado"}`}
              img={`${component.products[0] ? component.products[0].img : "https://create-react-app.dev/img/logo.svg"}`}
            />
          </>

        ))}
      </div>
    </div>
  );
}
