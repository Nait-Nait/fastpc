import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function CardComponent({name, description}: {name:string, description:string}) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Ver Detalles
                </Button>
            </CardFooter>
        </Card>
    )
}