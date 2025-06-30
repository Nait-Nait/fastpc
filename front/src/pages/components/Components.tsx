import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Category } from "@/entities/ComponentCategories"
import { Product } from "@/entities/Product";
import { ScrapedComponent } from "@/entities/ScrapedComponent";
import { ComponentRepositoryImpl } from "@/repositories/ComponentRepository";
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ImageWithShimer from "@/components/ImageWithShimer";
import { useCotizacion } from "@/hooks/useCotizacionCookie";


function ComponentCard({ component, category }: { component: ScrapedComponent, category: Category }) {

    const agotado = component.products.length == 0
    const producto = component.products[0] ?? null

    const { cotizacion, addCotizacion, removeCotizacion } = useCotizacion();

    const enCotizacion = cotizacion.some((item) =>
        item.id === component.component.id && item.category === category
    );


    return (
        <div className="border border-black overflow-hidden  rounded-base mb-3 flex h-[26rem] w-80 flex-col  lg:h-[11.25rem] lg:w-200 lg:flex-row  ">
            <div className="h-[11.25rem] w-80 border-e border-black shrink-0 bg-zinc-500 flex items-center justify-center">
                {agotado ? (
                    <p className="text-white font-bold text-xl">AGOTADO</p>
                ) : (
                    <ImageWithShimer src={component.products[0].img} />
                )}
            </div>

            <div className="bg-[var(--foreground)] text-black h-full w-full p-3 min-w-full relative flex flex-col justify-between">
                <div>
                    <h3 className=" font-semibold font-publicSans">
                        {component.component.name}
                    </h3>
                    <div className="font-publicSans mt-1 grid grid-cols-2 gap-x-2.5 gap-y-1 w-fit text-sm">
                        {(Object.entries(component.component).slice(0, 3))
                            .filter(([key]) => key !== 'name' && key !== 'id')
                            .map(([key, value]) => (
                                <p key={key}>
                                    <span className="font-semibold w-fit capitalize">{key}:</span> {String(value)}
                                </p>
                            ))}
                        {Object.keys(component.component).length > 4 && (
                            <p>
                                <span className="font-semibold text-zinc-400">...</span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 justify-center items-center w-max mb-5">
                    {!agotado && (<>
                        <div>
                            <Button onClick={() => window.location.href = `/components/component?category=${category}&id=${component.component.id}`} >
                                Ver Detalles
                            </Button>
                        </div>
                        {!enCotizacion && (<div>
                            <Button onClick={() => {
                                addCotizacion({ id: component.component.id, category })
                            }} >
                                Añadir a Cotización
                            </Button>
                        </div>)}

                        {enCotizacion && (<div>
                            <Button onClick={() => {
                                removeCotizacion({ id: component.component.id, category })
                            }} >
                                Eliminar de Cotización
                            </Button>
                        </div>)}

                    </>
                    )}

                    <div className="border-2 p-1 bg-[var(--main)] rounded-base">
                        {agotado && (
                            <p className="font-publicSans line-through">
                                AGOTADO
                            </p>
                        )}

                        {!agotado && (
                            <p className="font-publicSans">
                                ${new Intl.NumberFormat('es-CL').format(component.products[0].price)}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function Components() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (category: string) => {
        const params = new URLSearchParams(location.search);
        params.set('category', category);
        params.set('page', '0');
        navigate({ search: params.toString() });
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(location.search);
        params.set('category', category);
        params.set('page', newPage.toString());
        navigate({ search: params.toString() });
    };

    const [searchParams] = useSearchParams();

    const categoryParam = searchParams.get('category') as Category | null;
    const pageParam = parseInt(searchParams.get('page') || '0', 10);
    const searchParam = searchParams.get('search') || null;

    const category: Category = categoryParam ?? Category.CPU;
    const page: number = isNaN(pageParam) ? 0 : pageParam;
    const search: string = searchParam ?? "";

    const categoryValues = Object.values(Category);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [components, setComponents] = useState([] as ScrapedComponent[]);
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        setLoading(true)
        if (search) {
            const componentRepo = new ComponentRepositoryImpl();
            componentRepo
                .search(category, search)
                .then((value) => {
                    setComponents(value.results);
                    setTotalPages(0)
                    setLoading(false);
                    console.log(value);
                })
                .catch(() => {
                    setError(true);
                    setLoading(false);
                });
        } else {
            const componentRepo = new ComponentRepositoryImpl();
            componentRepo
                .list(category, page)
                .then((value) => {
                    setComponents(value.results);
                    setTotalPages(value.totalPages)
                    setLoading(false);
                    console.log(value);
                })
                .catch(() => {
                    setError(true);
                    setLoading(false);
                });
        }

    }, [category, page]);

    if (error) {
        return (
            <div className="flex justify-center items-center">
                <h1>Error al obtener los componentes</h1>
            </div>
        );
    }

    if (loading) {
        return (<h1>CARGANDO...</h1>)
    }

    return (
        <div className="flex flex-col ">
            <div className="flex flex-row justify-around space-x-0 -mt-1 pb-5 border-b-2 border-[var(--main)]">
                {categoryValues.map((cat) => (
                    <Button
                        key={cat}
                        onClick={() => handleClick(cat)}
                        className={`text-lg ${category == cat
                            ? " border border-black rounded-base bg-[var(--main)] text-black"
                            : " bg-[var(--foreground)] border-0 hover:border hover:border-black"
                            }`}>
                        {cat}
                    </Button>
                ))}
            </div>
            <div className="mt-5 flex flex-col justify-center items-center">
                {components.map((component) => {
                    return (
                        <ComponentCard component={component} category={category} />
                    )
                })}
            </div>

            <div>
                <div className="my-5 flex justify-center">
                    <Pagination>
                        <PaginationContent>

                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (page > 0) handlePageChange(page - 1);
                                    }}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href="#"
                                        isActive={i === page}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(i);
                                        }}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (page + 1 < totalPages) handlePageChange(page + 1);
                                    }}
                                />
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}