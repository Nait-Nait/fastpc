import React, { useState, useEffect } from "react";
import cpuIcon from "../../assets/icons/cpu.svg";
import mbIcon from "../../assets/icons/mb.svg";
import gpu2Icon from "../../assets/icons/gpu2.svg";
import ramIcon from "../../assets/icons/ram.svg";
import ssdIcon from "../../assets/icons/SSD.svg";
import psuIcon from "../../assets/icons/psu.svg";
import { Card, CardContent } from "@/components/ui/card";
import { ComponentRepositoryImpl } from "@/repositories/ComponentRepository";
import { Category } from "@/entities/ComponentCategories";
import { ScrapedComponent } from "@/entities/ScrapedComponent";

const icons = [
  { src: cpuIcon, alt: "CPU" },
  { src: mbIcon, alt: "MOTHERBOARD" },
  { src: gpu2Icon, alt: "GPU" },
  { src: ramIcon, alt: "RAM" },
  { src: ssdIcon, alt: "SSD" },
  { src: psuIcon, alt: "PSU" },
];

const getFieldsForCategory = (category: string, comp: any) => {
  if (!comp) return [];
  switch (category) {
    case "CPU":
      return [
        { label: "Modelo", value: comp.name },
        { label: "Núcleos", value: comp.cores },
        { label: "Reloj", value: comp.clock },
        { label: "Socket", value: comp.socket },
        { label: "TDP", value: comp.tdp },
        { label: "Consumo (W)", value: comp.wattage },
      ];
    case "GPU":
      return [
        { label: "Modelo", value: comp.name },
        { label: "Memoria", value: comp.memory },
        { label: "Consumo (W)", value: comp.wattage },
      ];
    case "RAM":
      return [
        { label: "Modelo", value: comp.name },
        { label: "Marca", value: comp.brand },
        { label: "Capacidad", value: comp.capacity },
        { label: "Generación", value: comp.gen },
        { label: "Velocidad", value: comp.speed },
        { label: "Consumo (W)", value: comp.wattage },
      ];
    case "PSU":
      return [
        { label: "Modelo", value: comp.name },
        { label: "Fabricante", value: comp.manufacturer },
        { label: "Código modelo", value: comp.model },
        { label: "Eficiencia", value: comp.efficiencyRating },
        { label: "Ruido", value: comp.noiseRating },
        { label: "Potencia (W)", value: comp.wattage },
      ];
    case "MOTHERBOARD":
      return [
        { label: "Modelo", value: comp.name },
        { label: "Año", value: comp.year },
        { label: "Socket", value: comp.socket },
        { label: "Chipset", value: comp.chipset },
        { label: "Consumo", value: comp.powerConsumption },
        { label: "Memoria soportada", value: comp.memorySupport },
      ];
    case "SSD":
      return [
        { label: "Modelo", value: comp.name },
        { label: "Capacidad", value: comp.capacity },
        { label: "Formato", value: comp.format },
        { label: "Interfaz", value: comp.interface },
        { label: "Lanzamiento", value: comp.released },
        { label: "DRAM", value: comp.dram },
        { label: "Consumo (W)", value: comp.wattage },
      ];
    default:
      return Object.entries(comp).map(([k, v]) => ({
        label: k,
        value: v,
      }));
  }
};

const Comp: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState<Record<string, string>>({
    CPU: "",
    GPU: "",
    MOTHERBOARD: "",
    RAM: "",
    PSU: "",
    SSD: "",
  });
  const [selectedComponents, setSelectedComponents] = useState<
    Record<string, string>
  >({});
  const [detail, setDetail] = useState<ScrapedComponent | null>(null);

  const initialState: Record<
    string,
    { data: ScrapedComponent[]; loading: boolean; error: boolean }
  > = {
    CPU: { data: [], loading: false, error: false },
    GPU: { data: [], loading: false, error: false },
    MOTHERBOARD: { data: [], loading: false, error: false },
    RAM: { data: [], loading: false, error: false },
    PSU: { data: [], loading: false, error: false },
    SSD: { data: [], loading: false, error: false },
  };
  const ITEMS_PER_PAGE = 5;
  const [componentState, setComponentState] = useState(initialState);
  const [compatibilityError, setCompatibilityError] = useState<string | null>(
    null
  );
  const [pageState, setPageState] = useState<Record<string, number>>({
    CPU: 1,
    GPU: 1,
    MOTHERBOARD: 1,
    RAM: 1,
    PSU: 1,
    SSD: 1,
  });

  const [categoryTotalPages, setCategoryTotalPages] = useState<
    Record<string, number>
  >({
    CPU: 0,
    GPU: 0,
    MOTHERBOARD: 0,
    RAM: 0,
    PSU: 0,
    SSD: 0,
  });

  // TODO: Efecto de compatibilidad
  useEffect(() => {
    const cpuName = selectedComponents["CPU"];
    const ramName = selectedComponents["RAM"];
    const mbName = selectedComponents["MOTHERBOARD"];
    const gpuName = selectedComponents["GPU"];
    const ssdName = selectedComponents["SSD"];
    const psuName = selectedComponents["PSU"];

    const cpuData = componentState["CPU"].data.find(
      (item) => item.component.name === cpuName
    );
    const ramData = componentState["RAM"].data.find(
      (item) => item.component.name === ramName
    );
    const mbData = componentState["MOTHERBOARD"].data.find(
      (item) => item.component.name === mbName
    );
    const gpuData = componentState["GPU"].data.find(
      (item) => item.component.name === gpuName
    );
    const ssdData = componentState["SSD"].data.find(
      (item) => item.component.name === ssdName
    );
    const psuData = componentState["PSU"].data.find(
      (item) => item.component.name === psuName
    );

    function hasSocket(component: any): component is { socket: string } {
      return component && typeof component.socket === "string";
    }
    function hasGen(component: any): component is { gen: string } {
      return component && typeof component.gen === "string";
    }
    function hasMemorySupport(
      component: any
    ): component is { memorySupport: string } {
      return component && typeof component.memorySupport === "string";
    }

    if (
      cpuData &&
      mbData &&
      hasSocket(cpuData.component) &&
      hasSocket(mbData.component)
    ) {
      const cpuSocket = cpuData.component.socket;
      const mbSocket = mbData.component.socket;
      if (cpuSocket !== mbSocket) {
        setCompatibilityError(
          `Incompatibilidad detectada: El socket de la CPU (${cpuSocket}) no coincide con el de la Motherboard (${mbSocket})`
        );
        return;
      }
    }

    if (
      ramData &&
      mbData &&
      hasGen(ramData.component) &&
      hasMemorySupport(mbData.component)
    ) {
      const ramGen = ramData.component.gen.trim().toUpperCase();
      const mbMemSupport = mbData.component.memorySupport.trim().toUpperCase();
      const supportedGens = mbMemSupport.split(/,|;/).map((x) => x.trim());
      if (!supportedGens.includes(ramGen)) {
        setCompatibilityError(
          `Incompatibilidad detectada: La RAM seleccionada (${ramGen}) NO es compatible con la Motherboard (${mbMemSupport})`
        );
        return;
      }
    }

    function parseWattage(value: any): number {
      if (!value) return 0;
      return parseInt(String(value).replace(/[^0-9]/g, ""), 10) || 0;
    }

    const totalWattage =
      parseWattage((cpuData?.component as any)?.wattage) +
      parseWattage((gpuData?.component as any)?.wattage) +
      parseWattage((ramData?.component as any)?.wattage) +
      parseWattage((mbData?.component as any)?.powerConsumption) +
      parseWattage((ssdData?.component as any)?.wattage);

    const psuWattage = parseWattage((psuData?.component as any)?.wattage);

    if (psuData && psuWattage > 0 && totalWattage > 0) {
      const margen = Math.round(psuWattage * 0.8);
      if (totalWattage > margen) {
        setCompatibilityError(
          `Incompatibilidad detectada: El consumo total estimado de tus componentes (${totalWattage}W) supera el 80% de la capacidad de tu fuente (${psuWattage}W). Elige una fuente más potente.`
        );
        return;
      }
    }
    setCompatibilityError(null);
  }, [selectedComponents, componentState]);

  // TODO: Efecto de cargar componentes al iniciar
  useEffect(() => {
    if (!active || !(active in componentState)) return;
    setComponentState((prev) => ({
      ...prev,
      [active]: { ...prev[active], loading: true, error: false },
    }));

    const repo = new ComponentRepositoryImpl();
    if (query[active] && query[active].trim() !== "") {
      repo
        .search(Category[active as keyof typeof Category], query[active])
        .then((res) => {
          setCategoryTotalPages((prev) => ({
            ...prev,
            [active]: 0,
          }));
          setComponentState((prev) => ({
            ...prev,
            [active]: {
              data: res.results,
              loading: false,
              error: false,
            },
          }));
        })

        .catch(() => {
          setComponentState((prev) => ({
            ...prev,
            [active]: { ...prev[active], loading: false, error: true },
          }));
        });
    } else {
      repo
        .list(
          Category[active as keyof typeof Category],
          pageState[active] - 1 || 0
        )
        .then((res) => {
          setCategoryTotalPages((prev) => ({
            ...prev,
            [active]: res.totalPages,
          }));
          setComponentState((prev) => ({
            ...prev,
            [active]: {
              data: res.results,
              loading: false,
              error: false,
            },
          }));
        })

        .catch(() => {
          setComponentState((prev) => ({
            ...prev,
            [active]: { ...prev[active], loading: false, error: true },
          }));
        });
    }
  }, [active, pageState, query]);

  let list: ScrapedComponent[] = [];
  if (active && componentState[active]) {
    list = componentState[active].data.filter((item: ScrapedComponent) =>
      item.component.name.toLowerCase().includes(query[active].toLowerCase())
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <div className="shrink-0" />

      <h1 className="mb-4 text-3xl font-bold text-center ">
        Selecciona tus Componentes
      </h1>
      <p className="mb-14 text-base text-center text-gray-400 max-w-xl mx-auto font-normal">
        Elige piezas para armar tu PC y revisa si son compatibles, ¡sin ser
        experto!
      </p>

      {/*TODO: Lista de Componentes Seleccionados*/}
      <div className="w-full max-w-[1100px] mx-auto px-6 md:px-20 mb-6">
        <div
          className="backdrop-blur-md bg-[var(--secondary-background)] border border-[var(--border)] rounded-xl p-4 shadow-md"
          style={{
            background:
              "linear-gradient(135deg, rgba(36,39,50,0.90) 80%, rgba(60,70,100,0.10) 100%)",
          }}
        >
          <h2 className="text-lg font-semibold mb-2 text-[var(--main)]">
            Tu Configuración
          </h2>

          {compatibilityError && (
            <div className="mb-4 mt-4 p-1.5 rounded bg-red-100 border border-red-300 text-red-700 text-sm font-semibold flex items-center gap-2">
              {compatibilityError}
            </div>
          )}
          <p className="text-sm text-gray-500 mb-2">
            Haz clic en un componente para ver sus detalles o eliminarlo de la
            configuración.
          </p>

          {Object.keys(selectedComponents).length === 0 ? (
            <p className="text-sm text-gray-400">
              No has seleccionado ningún componente aún.
            </p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(selectedComponents).map(
                ([category, component]) => {
                  // Buscar el ícono correspondiente
                  const iconObj = icons.find((ic) => ic.alt === category);
                  return (
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
                      <span className="text-gray-300 flex items-center gap-2">
                        {/* Ícono pequeño */}
                        {iconObj && (
                          <img
                            src={iconObj.src}
                            alt={iconObj.alt}
                            className="w-5 h-5 opacity-80"
                            style={{ minWidth: 20, minHeight: 20 }}
                          />
                        )}
                        {category}:
                      </span>
                      <span className="font-medium text-[var(--foreground)] ml-1">
                        {component}
                      </span>
                    </li>
                  );
                }
              )}
            </ul>
          )}
        </div>
      </div>

      <p className="text-sm text-center text-gray-400 mb-3">
        {active ? `Seleccionado: ${active}` : "Ningún componente seleccionado"}
      </p>

      {/* TODO: Desde acá empieza la lógica de las tarjetas */}
      <div className="flex flex-col justify-start items-center px-6 md:px-35 mt-4">
        <div className="bg-[var(--background] pb-16 grid justify-items-center grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1100px] w-full">
          {icons.map(({ src, alt }, i) => {
            const filteredList = componentState[alt].data.filter(
              (item: ScrapedComponent) =>
                item.component.name
                  .toLowerCase()
                  .includes(query[alt].toLowerCase())
            );

            const currentPage = pageState[alt] || 1;
            const paginated = filteredList;

            return (
              <Card
                key={i}
                className={`w-63 h-63 rounded-3xl cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${
                  active === alt
                    ? "ring-2 rounded-3xl ring-[var(--main)] ring-offset-2 ring-offset-[var(--background)] bg-[var(--background)]"
                    : "border rounded-3xl border-[var(--background)] hover:border-[var(--main)] shadow-[var(--shadow-big)] bg-[var(--foreground)]"
                }`}
                onClick={() => {
                  setDetail(null);
                  setActive(active === alt ? null : alt);
                  setQuery((prev) => ({ ...prev, [alt]: "" }));
                }}
              >
                {active === alt ? (
                  detail ? (
                    // TODO: Panel de Detalle
                    <CardContent
                      className="rounded-3xl flex flex-col w-full h-full p-4 animate-fade-in"
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
                        {getFieldsForCategory(active, detail.component).map(
                          ({ label, value }) =>
                            value && (
                              <li
                                key={label}
                                className="mb-1 break-words w-full"
                              >
                                <span className="font-bold text-[var(--main)]">
                                  {label}:
                                </span>
                                <span className="text-[var(--foreground)]">
                                  {value}
                                </span>
                              </li>
                            )
                        )}
                      </ul>
                    </CardContent>
                  ) : (
                    // TODO: Panel de Búsqueda de Componentes
                    <CardContent
                      className="rounded-3xl flex flex-col w-full h-full p-0 animate-fade-in"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        className="w-[90%] mx-auto mb-4 px-2 py-1 mb-2 rounded-sm text-sm text-[var(--foreground)] bg-[var(--secondary-background)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--main)] transition-all duration-800"
                        placeholder={`Buscar ${alt}...`}
                        value={query[alt]}
                        onChange={(e) =>
                          setQuery((prev) => ({
                            ...prev,
                            [alt]: e.target.value,
                          }))
                        }
                        autoFocus={active === alt}
                      />

                      {/*TODO: Lista de Componentes */}
                      <ul className="bg-[var(--background)]/80 ...">
                        {componentState[alt].loading ? (
                          <li>Cargando...</li>
                        ) : componentState[alt].error ? (
                          <li>Error al cargar {alt}</li>
                        ) : filteredList.length > 0 ? (
                          <>
                            {paginated.map((item) => (
                              <li
                                key={item.component.id}
                                className="py-0.20 px-0.5 hover:bg-[var(--secondary-background)] rounded-md cursor-pointer transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedComponents((prev) => ({
                                    ...prev,
                                    [alt]: item.component.name,
                                  }));
                                  setDetail(item);
                                }}
                              >
                                <span className="text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis block max-w-full">
                                  {item.component.name}
                                </span>
                              </li>
                            ))}
                            {/*TODO: Controles de paginación */}
                            <li className="flex justify-center gap-2 mt-2">
                              <button
                                className="px-2 py-1 rounded  text-xs text-white"
                                disabled={currentPage === 1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPageState((prev) => ({
                                    ...prev,
                                    [alt]: prev[alt] - 1,
                                  }));
                                }}
                              >
                                ←
                              </button>

                              <span className="px-2 text-xs text-gray-600">
                                Página {currentPage} de{" "}
                                {categoryTotalPages[alt]}
                              </span>

                              <button
                                className="px-2 py-1 rounded text-xs text-white"
                                disabled={
                                  currentPage === categoryTotalPages[alt]
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPageState((prev) => ({
                                    ...prev,
                                    [alt]: prev[alt] + 1,
                                  }));
                                }}
                              >
                                →
                              </button>
                            </li>
                          </>
                        ) : (
                          <li className="text-center text-gray-500">
                            No hay resultados
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  )
                ) : (
                  //TODO: Pantalla Principal de la Tarjeta
                  <CardContent className="rounded-3xl flex flex-col items-center h-full gap-2 justify-end">
                    <img
                      src={src}
                      alt={alt}
                      className="mt-8 w-4/7 h-auto object-contain filter brightness-[1.2] grayscale transition-transform duration-200 hover:scale-115"
                    />
                    <span className="mt-3 text-[1.02rem] font-semibold text-[var(--secondary-background)] tracking-tight opacity-95">
                      {alt}
                    </span>
                    {/* Descripción corta */}
                    <span className="text-xs text-gray-500 text-center mt-1 min-h-[18px]">
                      {(() => {
                        switch (alt) {
                          case "CPU":
                            return "Procesador central";
                          case "MOTHERBOARD":
                            return "Tarjeta madre para tu PC";
                          case "GPU":
                            return "Tarjeta gráfica de video";
                          case "RAM":
                            return "Memoria principal";
                          case "SSD":
                            return "Disco de estado sólido";
                          case "PSU":
                            return "Fuente de poder";
                          default:
                            return "";
                        }
                      })()}
                    </span>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comp;
