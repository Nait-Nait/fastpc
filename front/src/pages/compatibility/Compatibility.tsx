import React, { useState } from "react";
import cpuIcon from "../../assets/icons/cpu.svg";
import mbIcon from "../../assets/icons/mb.svg";
import gpu2Icon from "../../assets/icons/gpu2.svg";
import ramIcon from "../../assets/icons/ram.svg";
import ssdIcon from "../../assets/icons/SSD.svg";
import psuIcon from "../../assets/icons/psu.svg";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { ComponentRepositoryImpl } from "@/repositories/ComponentRepository";
import { Category } from "@/entities/ComponentCategories";
import { ScrapedComponent } from "@/entities/ScrapedComponent";

// ---------- TYPES ----------
type ComponentDetail = Record<string, string | number>;
type DetailsMap = Record<string, Record<string, ComponentDetail>>;
type DetailState = { category: string; item: string } | null;

// ----------- MAPA DE DETALLES POR COMPONENTE -----------
const detailsMap: DetailsMap = {
  Grafica: {
    "RTX 3060 Ti": {
      Nombre: "RTX 3060 Ti",
      "Fecha de lanzamiento": "Dec 2020",
      Memoria: "8 GB, GDDR6, 256 bit",
      "GPU clock": "1410 MHz",
      "Memory clock": "1750 MHz",
      Benchmark: 10110,
    },
    "RTX 4070": {
      Nombre: "RTX 4070",
      "Fecha de lanzamiento": "Apr 2023",
      Memoria: "12 GB, GDDR6X, 192 bit",
      "GPU clock": "1920 MHz",
      "Memory clock": "1313 MHz",
      Benchmark: 14925,
    },
    "Radeon RX 6600": {
      Nombre: "Radeon RX 6600",
      "Fecha de lanzamiento": "Oct 2021",
      Memoria: "8 GB, GDDR6, 128 bit",
      "GPU clock": "1626 MHz",
      "Memory clock": "1750 MHz",
      Benchmark: 6717,
    },
  },
  CPU: {
    "Intel i5-12400": {
      Nombre: "Intel i5-12400",
      "Fecha de lanzamiento": "Jan 2022",
      Núcleos: "6 / 12",
      Clock: "2.5–4.4 GHz",
      Socket: "LGA 1700",
      Benchmark: 19096,
    },
    "Ryzen 5 5600X": {
      Nombre: "Ryzen 5 5600X",
      "Fecha de lanzamiento": "Nov 2020",
      Núcleos: "6 / 12",
      Clock: "3.7–4.6 GHz",
      Socket: "AM4",
      Benchmark: 21861,
    },
    "Intel i9-13900K": {
      Nombre: "Intel i9-13900K",
      "Fecha de lanzamiento": "Sep 2022",
      Núcleos: "24 / 32",
      Clock: "3–5.8 GHz",
      Socket: "LGA 1700",
      Benchmark: 58670,
    },
  },
  SSD: {
    "Samsung 980 Pro": {
      Nombre: "Samsung 980 Pro",
      "Fecha de lanzamiento": "Sep 2021",
      Capacidad: "1 TB",
      Formato: "M.2 2280",
      Interfaz: "PCIe 4.0 x4",
      DRAM: "1024 MB",
    },
    "WD Black SN850": {
      Nombre: "WD Black SN850",
      "Fecha de lanzamiento": "Oct 2020",
      Capacidad: "1 TB",
      Formato: "M.2 2280",
      Interfaz: "PCIe 4.0 x4",
      DRAM: "DRAM-less",
    },
    "Crucial P5": {
      Nombre: "Crucial P5",
      "Fecha de lanzamiento": "Jun 2021",
      Capacidad: "500 GB",
      Formato: "M.2 2280",
      Interfaz: "PCIe 3.0 x4",
      DRAM: "512 MB",
    },
  },
  "Memoria RAM": {
    "Corsair Vengeance 16GB": {
      Producto: "Corsair Vengeance 16GB",
      Capacidad: "16 GB",
      Generación: "DDR4",
      Latencia: "CL16",
      "Velocidad lectura": "25.6 GB/s",
      "Velocidad escritura": "23.8 GB/s",
    },
    "G.Skill TridentZ 32GB": {
      Producto: "G.Skill TridentZ 32GB",
      Capacidad: "32 GB",
      Generación: "DDR4",
      Latencia: "CL18",
      "Velocidad lectura": "34.1 GB/s",
      "Velocidad escritura": "32.5 GB/s",
    },
  },
};

// ----------- DATOS DE CATÁLOGO Y ÍCONOS -----------
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

// ---------- COMPONENTE PRINCIPAL ----------
const Comp: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selectedComponents, setSelectedComponents] = useState<
    Record<string, string>
  >({});
  const [detail, setDetail] = useState<DetailState>(null);

  // Estados para componentes CPU y GPU
  const [cpuComponents, setCpuComponents] = useState<ScrapedComponent[]>([]);
  const [loadingCPUs, setLoadingCPUs] = useState(false);
  const [errorCPUs, setErrorCPUs] = useState(false);

  const [gpuComponents, setGpuComponents] = useState<ScrapedComponent[]>([]);
  const [loadingGPUs, setLoadingGPUs] = useState(false);
  const [errorGPUs, setErrorGPUs] = useState(false);

  useEffect(() => {
    if (active === "Grafica") {
      setLoadingGPUs(true);
      const repo = new ComponentRepositoryImpl();
      repo
        .list(Category.GPU, 0)
        .then((res) => {
          setGpuComponents(res.results);
          setLoadingGPUs(false);
        })
        .catch(() => {
          setErrorGPUs(true);
          setLoadingGPUs(false);
        });
    }
    // else setGpuComponents([]);
  }, [active]);

  useEffect(() => {
    if (active === "CPU") {
      setLoadingCPUs(true);
      const repo = new ComponentRepositoryImpl();
      repo
        .list(Category.CPU, 0)
        .then((res) => {
          setCpuComponents(res.results);
          setLoadingCPUs(false);
        })
        .catch(() => {
          setErrorCPUs(true);
          setLoadingCPUs(false);
        });
    }
    // Opcional: Si cambias de categoría, limpia CPUs
    // else setCpuComponents([]);
  }, [active]);

  const currentDetail =
    detail &&
    detailsMap[detail.category] &&
    detailsMap[detail.category][detail.item]
      ? detailsMap[detail.category][detail.item]
      : null;

  let list: any[] = [];
  if (active === "CPU") {
    list = cpuComponents.filter((item) =>
      item.component.name.toLowerCase().includes(query.toLowerCase())
    );
  } else if (active === "Grafica") {
    list = gpuComponents.filter((item) =>
      item.component.name.toLowerCase().includes(query.toLowerCase())
    );
  } else if (active) {
    list =
      catalog[active]?.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      ) ?? [];
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <div className="h-[70px] shrink-0" />

      <h1 className="text-3xl font-bold text-center mb-1">
        Selecciona tus Componentes
      </h1>

      {/* LISTA DE COMPONENTES SELECCIONADOS */}
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-20 mb-6">
        <div className="bg-[var(--secondary-background)] border border-[var(--border)] rounded-xl p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-[var(--main)]">
            Tu Configuración
          </h2>
          {Object.keys(selectedComponents).length === 0 ? (
            <p className="text-sm text-gray-400">
              No has seleccionado ningún componente aún.
            </p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(selectedComponents).map(
                ([category, component]) => (
                  <li
                    key={category}
                    className="flex justify-between items-center border-b border-[var(--border)] pb-1 text-sm cursor-pointer hover:bg-[var(--foreground)]/10 transition-colors rounded"
                    title={`Eliminar ${category}`}
                    onClick={() => {
                      setSelectedComponents((prev) => {
                        const next = { ...prev };
                        delete next[category];
                        return next;
                      });
                    }}
                  >
                    <span className="text-gray-300">{category}:</span>
                    <span className="font-medium text-[var(--foreground)] ml-1">
                      {component}
                    </span>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>

      <p className="text-sm text-center text-gray-400 mb-3">
        {active ? `Seleccionado: ${active}` : "Ningún componente seleccionado"}
      </p>

      {/* TARJETAS DE CATEGORÍAS */}
      <div className="flex flex-col justify-start items-center px-6 md:px-35 mt-4">
        <div className="pb-16 grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[900px] w-full">
          {icons.map(({ src, alt }, i) => (
            <Card
              key={i}
              className={`w-66 h-63 cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${
                active === alt
                  ? "ring-2 ring-[var(--main)] ring-offset-2 ring-offset-[var(--background)] bg-[var(--background)]"
                  : "border border-[var(--border)] shadow-[var(--shadow-big)] bg-[var(--foreground)]"
              }`}
              onClick={() => {
                if (detail) {
                  setDetail(null);
                  setActive(alt);
                  setQuery("");
                  return;
                }
                setActive(active === alt ? null : alt);
                setQuery("");
              }}
            >
              {active === alt || (detail && detail.category === alt) ? (
                detail && detail.category === alt && currentDetail ? (
                  // PANEL DETALLE
                  <CardContent
                    className="flex flex-col w-full h-full p-4 animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="self-start mb-2 px-3 py-1 rounded-lg bg-[var(--secondary-background)] text-[var(--main)] text-xs font-bold hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetail(null);
                      }}
                    >
                      ← Volver
                    </button>

                    <img
                      src={src}
                      alt={alt}
                      className="w-6 h-6 absolute top-3 right-3 opacity-90 brightness-[1.2] filter drop-shadow-sm"
                    />

                    <ul className="text-xs w-full bg-[var(--background)] rounded-xl px-4 py-3 shadow-inner flex flex-col items-start justify-start flex-1">
                      {Object.entries(currentDetail).map(([k, v]) => (
                        <li key={k} className="mb-1 break-words w-full">
                          <span className="font-bold text-[var(--main)]">
                            {k}:
                          </span>{" "}
                          <span className="text-[var(--foreground)]">{v}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                ) : (
                  // BUSCADOR Y LISTA
                  <CardContent
                    className="flex flex-col w-full h-full p-0 animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      className="w-[90%] mx-auto mt-2 px-2 py-1 mb-2 rounded-sm text-sm text-[var(--foreground)] bg-[var(--secondary-background)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--main)] transition-all duration-800"
                      placeholder={`Buscar ${alt}...`}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      autoFocus
                    />

                    {/* ----------- LISTADO FILTRADO ----------- */}
                    <ul className="bg-[var(--background)]/80 backdrop-blur-md rounded-xl p-2 shadow-inner">
                      {active === "CPU" ? (
                        loadingCPUs ? (
                          <li>Cargando...</li>
                        ) : errorCPUs ? (
                          <li>Error al cargar CPUs</li>
                        ) : list.length > 0 ? (
                          list.map((item) => (
                            <li
                              key={item.component.id}
                              className="py-0.15 px-1 hover:bg-[var(--secondary-background)] rounded-md cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedComponents((prev) => ({
                                  ...prev,
                                  CPU: item.component.name,
                                }));
                                setDetail({
                                  category: "CPU",
                                  item: item.component.name,
                                });
                              }}
                            >
                              <span className="font-bold">
                                {item.component.name}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-center text-gray-500">
                            No hay resultados
                          </li>
                        )
                      ) : active === "Grafica" ? (
                        loadingGPUs ? (
                          <li>Cargando...</li>
                        ) : errorGPUs ? (
                          <li>Error al cargar GPUs</li>
                        ) : list.length > 0 ? (
                          list.map((item) => (
                            <li
                              key={item.component.id}
                              className="py-0.15 px-1 hover:bg-[var(--secondary-background)] rounded-md cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedComponents((prev) => ({
                                  ...prev,
                                  Grafica: item.component.name,
                                }));
                                setDetail({
                                  category: "Grafica",
                                  item: item.component.name,
                                });
                              }}
                            >
                              <span className="font-bold">
                                {item.component.name}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-center text-gray-500">
                            No hay resultados
                          </li>
                        )
                      ) : list.length > 0 ? (
                        list.map((item) => (
                          <li
                            key={item}
                            className="py-0.15 px-1 hover:bg-[var(--secondary-background)] rounded-md cursor-pointer transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedComponents((prev) => ({
                                ...prev,
                                [active!]: item,
                              }));
                              if (
                                detailsMap[active!] &&
                                detailsMap[active!][item]
                              ) {
                                setDetail({ category: active!, item });
                              } else {
                                setDetail(null);
                                setActive(null);
                              }
                            }}
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
                )
              ) : (
                <CardContent className="flex flex-col items-center h-full gap-2">
                  <img
                    src={src}
                    alt={alt}
                    className="w-4/7 h-auto object-contain filter brightness-[1.2] grayscale transition-transform duration-200 hover:scale-105"
                  />

                  <span className="mt-3 text-[1.02rem] font-semibold text-[var(--secondary-background)] tracking-tight opacity-95">
                    {alt}
                  </span>
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
