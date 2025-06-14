import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export async function handleJsonResponse(response: Response, errorPrefix = "Error"): Promise<any> {
    try {
        const json = await response.json();
        if (!response.ok) {
            const message = json.message || "Error desconocido";
            throw new Error(`${errorPrefix}: ${message}`);
        }
        return json;
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error(`${errorPrefix}: ${e.message}`);
        } else {
            throw new Error(`${errorPrefix}`);
        }
    }
}