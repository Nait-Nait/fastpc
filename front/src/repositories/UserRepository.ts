import { API_BASE_URL } from "../config/backConfig";
import { handleJsonResponse } from "../utils";


export interface UserRepository {
    createUser(email: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<void>;
    verifyLogin(token: string): Promise<boolean>;
    logout(): Promise<void>;
}

export class UserRepositoryImpl implements UserRepository {
    async createUser(email: string, password: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const jsonResponse = await handleJsonResponse(response, "No se pudo realizar el registro");

        localStorage.setItem("login", jsonResponse.token);
    }
    async login(email: string, password: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const jsonResponse = await handleJsonResponse(response, "No se pudo realizar el inicio de sesión");

        localStorage.setItem("login", jsonResponse.token);
    }
    async verifyLogin(token: string): Promise<boolean> {
        const response = await fetch(`${API_BASE_URL}/users/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
            }),
        });

        if (response.status === 200) {
            return true;
        } else if (response.status === 401) {
            return false;
        } else {
            throw new Error("Error al verificar el token");
        }
    }

    async logout(): Promise<void> {
        localStorage.removeItem("login");
    }

}
