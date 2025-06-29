import { Button } from "@/components/ui/button";
import { Category } from "@/entities/ComponentCategories"
import { useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";



export default function Components() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (category: string) => {
        const params = new URLSearchParams(location.search);
        params.set('category', category);
        params.set('page', '0');
        navigate({ search: params.toString() });
    };


    const [searchParams] = useSearchParams();

    const categoryParam = searchParams.get('category') as Category | null;
    const pageParam = parseInt(searchParams.get('page') || '0', 10);

    const category: Category = categoryParam ?? Category.CPU;
    const page: number = isNaN(pageParam) ? 0 : pageParam;

    const categoryValues = Object.values(Category);

    return (
        <div className="flex flex-col ">
            <div className="flex flex-row justify-around space-x-0 -mt-1 pb-5 border-b-2 border-[var(--main)]">
                {categoryValues.map((cat) => (
                    <Button
                        key={cat}
                        onClick={() => handleClick(cat)}
                        variant="reverse"
                        className={`bg-[var(--background)] text-white text-lg ${category == cat
                            ? " border border-black rounded-base bg-[var(--main)] text-black"
                            : " bg-[var(--background)] border-0 hover:border hover:border-black"
                            }`}>
                        {cat}
                    </Button>
                ))}
            </div>
            <div>
                HOLA
            </div>
        </div>
    )
}