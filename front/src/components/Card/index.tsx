import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageWithShimer from "../ImageWithShimer";

export default function CardComponent({
  name,
  description,
  img,
  onClick,
}: {
  name: string;
  description: string;
  img: string | undefined;
  onClick: () => void;
}) {
  return (
    <Card className="w-full max-w-sm" onClick={onClick}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="bg-zinc-500 flex justify-center items-center h-64">
          {!img ? (
            <p className="text-white font-bold text-xl">AGOTADO</p>
          ) : (
            <ImageWithShimer src={img} />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
