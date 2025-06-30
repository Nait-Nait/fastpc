// CotizacionContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Category } from "@/entities/ComponentCategories";

type CotizacionItem = { id: number; category: Category };

interface CotizacionContextType {
    cotizacion: CotizacionItem[];
    addCotizacion: (item: CotizacionItem) => void;
    removeCotizacion: (item: CotizacionItem) => void;
}

const CotizacionContext = createContext<CotizacionContextType | undefined>(undefined);

export const CotizacionProvider = ({ children }: { children: React.ReactNode }) => {
    const [cotizacion, setCotizacion] = useState<CotizacionItem[]>([]);

    useEffect(() => {
        const cookieValue = Cookies.get("cotizacion");
        if (cookieValue) {
            try {
                setCotizacion(JSON.parse(cookieValue));
            } catch {
                setCotizacion([]);
            }
        }
    }, []);

    const addCotizacion = (item: CotizacionItem) => {
        if (!cotizacion.some((i) => i.id === item.id && i.category === item.category)) {
            const newList = [...cotizacion, item];
            setCotizacion(newList);
            Cookies.set("cotizacion", JSON.stringify(newList));
        }
    };

    const removeCotizacion = (item: CotizacionItem) => {
        const newList = cotizacion.filter(
            (i) => !(i.id === item.id && i.category === item.category)
        );
        setCotizacion(newList);
        Cookies.set("cotizacion", JSON.stringify(newList));
    };

    return (
        <CotizacionContext.Provider value={{ cotizacion, addCotizacion, removeCotizacion }}>
            {children}
        </CotizacionContext.Provider>
    );
};

export const useCotizacion = () => {
    const context = useContext(CotizacionContext);
    if (!context) throw new Error("useCotizacion debe usarse dentro de CotizacionProvider");
    return context;
};
