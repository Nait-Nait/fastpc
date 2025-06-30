import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CotizacionItem, useCotizacion } from '@/hooks/useCotizacionCookie'
import { ScrapedComponent } from '@/entities/ScrapedComponent'
import { ComponentRepositoryImpl } from '@/repositories/ComponentRepository'
import ImageWithShimer from '@/components/ImageWithShimer'
import { Component } from '@/entities/Component'

type CotiItem = {
    savedCoti: CotizacionItem,
    component: ScrapedComponent
}

const extractPrice = (price: number | string): number => {
    if (typeof price === 'number') return price
    const cleaned = price.replace(/\./g, '').replace(/\D/g, '')
    return parseInt(cleaned, 10) || 0
}

export default function CotizacionPage() {
    const { cotizacion, addCotizacion, removeCotizacion } = useCotizacion();
    const [components, setComponents] = useState<CotiItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const repo = new ComponentRepositoryImpl()

        const fetchDetails = async () => {
            const promises = cotizacion.map(async (cotiItem) => {
                return {
                    savedCoti: cotiItem,
                    component: (await repo.details(cotiItem.category, cotiItem.id)).results[0]
                } as CotiItem
            })

            const newComponents = await Promise.all(promises)
            setComponents(newComponents)
            setLoading(false)
        }

        fetchDetails()


    }, [cotizacion])

    const total = components.reduce((sum, c) => {
        const price = c.component.products[0]?.price ?? 0
        return sum + extractPrice(price)
    }, 0)

    if (loading) return <p className="p-8">Cargando cotización...</p>

    return (
        <div className="p-8 pt-20 max-w-screen-xl mx-auto text-gray-900">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Cotización</h1>
                {components.length > 0 && (
                    <div className="text-xl font-semibold bg-main/50 border-2 border-border/40 px-4 py-2 rounded shadow-[2px_2px_0px_#000]">
                        Total: ${total.toLocaleString('es-CL')}
                    </div>
                )}
            </div>

            {components.length === 0 ? (
                <p>No hay componentes en la cotización.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {components.map(c => {
                        const prod = c.component.products[0]
                        return (
                            <div
                                key={c.component.component.id}
                                className="flex items-center gap-4 border-4 border-border/40 bg-main/50 p-4 rounded-lg shadow-[4px_4px_0px_#000]"
                            >
                                <img
                                    src={prod?.img ?? ''}
                                    alt={c.component.component.name}
                                    className="w-24 h-24 object-cover border-2 border-black shadow-[2px_2px_0px_#000]"
                                />
                                <div className="flex flex-col justify-between">
                                    <h3 className="text-xl font-semibold">{c.component.component.name}</h3>
                                    <p className="text-lg">
                                        {prod?.price
                                            ? `$${new Intl.NumberFormat('es-CL').format(prod.price)}`
                                            : 'Sin precio'}
                                    </p>
                                </div>
                                <div className="ml-auto">
                                    <Button
                                        onClick={() =>
                                            removeCotizacion({
                                                id: c.component.component.id,
                                                category: c.savedCoti.category,
                                            })
                                        }
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}