import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function CardComponent({name, description, img, onClick}: {name:string, description:string, img: string, onClick: () => void}) {
    return (
        <Card className="w-full max-w-sm" onClick={onClick} >
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <img src={img}/>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Ver Detalles
                </Button>
            </CardFooter>
        </Card>
    )
}