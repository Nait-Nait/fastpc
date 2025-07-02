import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/entities/Product";

const fieldLabels: Record<string, string> = {
  name: "Nombre",
  manufacturer: "Fabricante",
  model: "Modelo",
  memory: "Memoria",
  wattage: "Consumo",
};

function formatLabel(key: string) {
  return fieldLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

const hiddenFields = ["id", "imageUrl", "products"];

interface PriceInfo {
  store: string;
  price: number;
  normalPrice?: number;
  rating?: number;
}

interface ComponentDetailViewProps {
  component: Record<string, any>;
  prices?: PriceInfo[];
  imageUrl?: string;
  products?: Product[];
}

const ComponentDetailView: React.FC<ComponentDetailViewProps> = ({
  component,
  prices = [],
  imageUrl,
  products = [],
}) => {
  const fields = Object.entries(component).filter(
    ([key, value]) =>
      !hiddenFields.includes(key) && value !== undefined && value !== ""
  );

  return (
    <div className="flex flex-col md:flex-row bg-[var(--background)] p-5 max-w-6xl mx-auto">
      <div className="flex flex-col items-center w-full md:w-3/5">
        <h1 className="-mt-5 text-3xl font-bold mb-6 text-[var(--foreground)]">
          {component.name}
        </h1>
        <img
          src={imageUrl || component.imageUrl || "/placeholder.png"}
          alt={component.name}
          className="w-full max-w-[480px] rounded-xl shadow mb-6"
        />
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Precios en tiendas
          </h3>
          {prices.length === 0 && (
            <div className="text-center text-gray-400 text-sm">
              Sin datos de precios.
            </div>
          )}
          {prices.slice(0, 1).map((p, i) => (
            <Card
              key={i}
              className="mb-2 bg-[var(--secondary-background)] w-full max-w-[480px] mx-auto"
            >
              <CardContent className="flex flex-col items-center gap-1">
                <div className="font-bold">{p.store}</div>
                <div className="text-xl text-[var(--main)]">
                  ${p.price.toLocaleString()}
                </div>
                {p.normalPrice && (
                  <div className="text-xs text-gray-500">
                    Normal: ${p.normalPrice.toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex-1 flex-1 -ml-20 mt-10">
        <div className="bg-[var(--secondary-background)] rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-[16px] mb-2 text-[var(--main)]">
            Características
          </h2>
          <ul className="leading-5 font-thin text-[0.875rem]">
            {fields.map(([key, value]) => (
              <li key={key} className="text-[14px] text-[var(--foreground)]">
                <span className="font-semibold">{formatLabel(key)}:</span>{" "}
                <span className="font-normal text-[13px]">{String(value)}</span>
              </li>
            ))}
          </ul>
        </div>

        {products.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-[16px] mb-2 text-[var(--main)]">
              Productos relacionados
            </h2>
            <ul className="space-y-2">
              {products.map((product, index) => (
                <li
                  key={index}
                  className="bg-[var(--secondary-background)] p-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.img || "/placeholder.png"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--foreground)]">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Tienda: {product.store || "Desconocida"}
                      </p>
                      <p className="text-xs text-[var(--main)]">
                        Precio: ${product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentDetailView;
