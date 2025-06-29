import React, { useState } from "react";
import cpuIcon from "../../assets/icons/cpu.png";
import mbIcon from "../../assets/icons/mb.png";
import gpu2Icon from "../../assets/icons/gpu2.png";
import ramIcon from "../../assets/icons/ram.png";
import ssdIcon from "../../assets/icons/SSD.png";
import psuIcon from "../../assets/icons/psu.png";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // o donde hayas guardado el archivo `card.tsx`

const catalog: Record<string, string[]> = {
  CPU: ["Intel i5-12400", "Ryzen 5 5600X", "Intel i9-13900K"],
  Motherboard: ["ASUS TUF B550", "MSI Z690", "Gigabyte X570"],
  Grafica: ["RTX 3060 Ti", "RTX 4070", "Radeon RX 6600"],
  "Memoria RAM": ["Corsair Vengeance 16GB", "G.Skill TridentZ 32GB"],
  SSD: ["Samsung 980 Pro", "WD Black SN850", "Crucial P5"],
  PSU: ["Corsair RM750x", "EVGA SuperNOVA 650 G5"],
};

const icons = [
  { src: cpuIcon, alt: "CPU" },
  { src: mbIcon, alt: "Motherboard" },
  { src: gpu2Icon, alt: "Grafica" },
  { src: ramIcon, alt: "Memoria RAM" },
  { src: ssdIcon, alt: "SSD" },
  { src: psuIcon, alt: "PSU" },
];

const Comp: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const list = active
    ? catalog[active].filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <div className="h-[70px] shrink-0" />
      <h1 className="text-3xl font-bold text-center mb-10">
        Selecciona tus Componentes
      </h1>
      <p className="text-sm text-center text-gray-400 mb-4">
        {active ? `Seleccionado: ${active}` : "Ningún componente seleccionado"}
      </p>

      <div className="flex-1 flex justify-center items-center px-6 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-[1200px] w-full">
          {icons.map(({ src, alt }, i) => (
            <Card
              key={i}
              className={`aspect-[4/3] cursor-pointer transition-transform hover:-translate-y-1 ${
                active === alt
                  ? "border-[3px] border-[var(--main)] shadow-xl bg-[var(--background)]"
                  : "border border-[var(--border)] shadow-[var(--shadow)] bg-[var(--foreground)]"
              }`}
              onClick={() => {
                setActive(active === alt ? null : alt);
                setQuery("");
              }}
            >
              {active === alt ? (
                <CardContent
                  className="flex flex-col w-full h-full p-0 animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="text"
                    className="w-[86%] mx-auto mt-4 px-4 py-2 mb-3 rounded-[16px] text-base text-[var(--foreground)] bg-[var(--background)] border border-[var(--border)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--main)]"
                    placeholder={`Buscar ${alt}...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                  <ul className="flex-1 overflow-y-auto list-none p-0 m-0 text-sm px-6">
                    {list.length > 0 ? (
                      list.map((item) => (
                        <li
                          key={item}
                          className="py-1.5 px-1 border-b border-[var(--border)] hover:bg-[var(--secondary-background)] rounded-md cursor-pointer transition-colors"
                        >
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="text-center text-gray-500">
                        No hay resultados
                      </li>
                    )}
                  </ul>
                </CardContent>
              ) : (
                <CardContent className="flex flex-col items-center h-full gap-2">
                  <img
                    src={src}
                    alt={alt}
                    className="w-3/5 h-auto object-contain filter brightness-[1.2] grayscale transition-transform duration-200 hover:scale-105"
                  />
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comp;
