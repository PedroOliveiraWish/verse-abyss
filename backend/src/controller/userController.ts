import { Request, Response } from "express";
import { UserService } from "../service/userService";

const userService = new UserService();

export class UserController {

    // Rota pública - não exige autenticação
    async createUser(req: Request, res: Response): Promise<Response> {
        const { nome, email, password } = req.body;

        try {
            const newUser = await userService.createUser(nome, email, password);

            return res.status(201).json({ message: "Usuário criado com sucesso!", user: newUser });
        } catch (error: any) {
            console.error(error);

            return res.status(400).json({ message: error.message || "Erro ao criar usuário." });
        }
    }

    // Rota pública - não exige autenticação
    async loginUser(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        try {
            const userToken = await userService.loginUser(email, password);

            if (!userToken) {
                return res.status(401).json({ message: "Credenciais inválidas." });
            }

            return res.status(200).json({ message: "Usuário autenticado com sucesso!", userToken });
        } catch (error: any) {
            console.error(error);

            return res.status(400).json({ message: error.message || "Erro ao fazer login." });
        }
    }

    // Rota privada - exige autenticação 
    async getUserById(req: Request, res: Response): Promise<Response> {
        const user = req.user;

        if (!user || typeof user === "string") {
            return res.status(400).json({message: "Usuário não identificado no token"})
        }

        const userId = user.userId;

        try {
            const userFound = await userService.getUserById(userId);

            if (!userFound) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            return res.status(200).json({ message: "Usuário encontrado com sucesso!", user: userFound });
        } catch (error: any) {
            console.error(error);

            return res.status(400).json({ message: error.message || "Erro ao buscar usuário." });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const user = req.user;

        if (!user || typeof user === "string") {
            return res.status(400).json({ message: "Usuário não identificado no token" })
        }

        const userId = user.userId;

        try {
            await userService.deleteUser(userId);
            return res.status(200).json({ message: "Usuário deletado com sucesso!" });
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({ message: error.message || "Erro ao deletar usuário." });
        }
    }
}
