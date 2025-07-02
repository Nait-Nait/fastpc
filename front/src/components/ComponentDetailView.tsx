import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/entities/Product";

function NameToURL(name: string): string {
  return (
    "https://www.winpy.cl/venta/" +
    name
      .normalize("NFD") // separa letras de sus tildes
      .replace(/[\u0300-\u036f]/g, "") // elimina las marcas diacríticas (tildes)
      .toLowerCase()
      .replace(/[^\w\s./-]/g, "") // elimina caracteres especiales excepto punto, slash y guion
      .replace(/[\s./]+/g, "-") // reemplaza espacios, puntos y slash por guion
      .replace(/-+/g, "-") // colapsa guiones múltiples
      .replace(/^-|-$/g, "") +
    "/"
  ); // quita guiones al inicio o al final
}

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
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const fields = Object.entries(component).filter(
    ([key, value]) =>
      !hiddenFields.includes(key) && value !== undefined && value !== ""
  );

  return (
    <div className="flex flex-col md:flex-row bg-[var(--background)] p-3 max-w-6xl mx-auto gap-2">
      <div className="flex flex-col items-center w-full md:w-3/5">
        <h1 className="-mt-5 text-3xl font-bold mb-6 text-[var(--foreground)]">
          {component.name}
        </h1>

        {/* Zoom wrapper */}
        <div
          className="w-full max-w-[480px] h-auto overflow-hidden rounded-2xl shadow mb-6 relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={imageUrl || component.imageUrl || "/placeholder.png"}
            alt={component.name}
            style={{
              transform: isHovering ? "scale(1.8)" : "scale(1)",
              transformOrigin: `${position.x}% ${position.y}%`,
              transition: "transform 0.2s ease",
            }}
            className="w-full h-auto object-cover cursor-zoom-in"
          />
        </div>

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
              className="rounded-2xl mb-2 bg-[var(--secondary-background)] w-full max-w-[480px] mx-auto border border-[var(--border)] shadow-sm"
            >
              <CardContent className="rounded-2xl flex flex-col items-center py-4">
                <span className="text-sm font-semibold bg-[var(--foreground)]/10 text-[var(--foreground)] px-3 py-1 rounded-full mb-1 tracking-wide">
                  {p.store}
                </span>
                <span className="text-2xl font-bold text-[var(--main)] leading-none">
                  ${p.price.toLocaleString()}
                </span>
                {p.normalPrice && (
                  <span className="text-xs text-gray-500 mt-1">
                    <span className="line-through opacity-70">
                      ${p.normalPrice.toLocaleString()}
                    </span>{" "}
                    <span className="ml-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                      Oferta
                    </span>
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex-1 -ml-20 mt-10">
        <div className="bg-[var(--secondary-background)] rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-[16px] mb-2 text-[var(--main)]">
            Características
          </h2>
          <ul className="leading-5">
            {fields.map(([key, value]) => (
              <li key={key} className="text-[16px] text-[var(--foreground)]">
                <span className="font-semibold">{formatLabel(key)}:</span>{" "}
                <span className="font-normal text-[14px]">{String(value)}</span>
              </li>
            ))}
          </ul>
        </div>

        {products.length > 0 && (
          <div className="mt-">
            <h2 className="font-semibold text-[16px] mt-4 mb-2 text-[var(--main)]">
              Productos relacionados
            </h2>
            <ul className="space-y-2">
              {products.map((product, index) => (
                <li
                  key={index}
                  className="bg-[var(--secondary-background)] p-3 rounded-lg shadow-sm"
                >
                  <div
                    onClick={() => {
                      window.location.replace(NameToURL(product.name));
                    }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <img
                      src={product.img || "/placeholder.png"}
                      onClick={() => {
                        window.location.replace(NameToURL(product.name));
                      }}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md transition-transform duration-300 hover:scale-110"
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
