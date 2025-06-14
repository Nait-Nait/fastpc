import CardComponent from "@/components/Card";


export default function Home() {
    return (
        <div>
            <div className="flex flex-row justify-center w-full pb-10">
                <div className="flex flex-col gap-4 text-center">
                    <h1 className="text-3xl">
                        Componentes Mas <span className="">Buscados</span> {/* bg-orange-300 text-gray-800 */}
                    </h1>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <CardComponent name="RTX 4050" description="Descripción 1" />
                <CardComponent name="RTX 4060" description="Descripción 2" />
                <CardComponent name="RTX 4070" description="Descripción 3" />
                <CardComponent name="RTX 4080" description="Descripción 4" />
                <CardComponent name="RTX 4090" description="Descripción 5" />
                <CardComponent name="RTX 4090" description="Descripción 6" />
            </div>

        </div>
    )
}