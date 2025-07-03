import { Request, Response } from "express";
import { UserService } from "../service/userService";

const userService = new UserService();

export class UserController {
    async createUser(req: Request, res: Response): Promise<Response> {
        const { nome, email, password } = req.body;

        try {
            const newUser = await userService.createUser(nome, email, password);

            if (!newUser) {
                return res.status(400).send({ message: "Não foi possível criar um novo usuário!" })
            }

            return res.status(200).send({ message: "Usuário criado com sucesso!", newUser: newUser })
        } catch (e) {
            return res.status(500).send({ message: "Não foi possível criar um novo usuário devido a um problema interno!" })
        }
    }

    async loginUser(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body;

        try {
            const userToken = await userService.loginUser(email, senha)

            if (!userToken) {
                return res.status(404).send({ message: "Usuário não encontrado!" })
            }

            return res.status(200).send({ message: "Usuário autenticado!", userToken })
        } catch (e) {
            return res.status(500).send({ message: "Não foi possível autenticar o usuário devido a um problema interno!" })
        }
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params;

        try {
            const userFound = await userService.getUserById(Number(userId))

            if (!userFound) {
                return res.status(404).send({ message: "Usuário não encontrado!" })
            }

            return res.status(200).send({ message: "Usuario encontrado", userFound: userFound })
        } catch (e) {
            return res.status(500).send({ message: "Não foi possível encontrar o usuário devido a um problema interno!" })
        }
    }
}