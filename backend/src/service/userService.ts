import { User } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "../lib/prisma";

export class UserService {
    private JWT_SECRET = process.env.JWT_SECRET || "Meu"

    async createUser(nome: string, email: string, password: string): Promise<User | null> {
        // hash da senha
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        if (!nome || !email || !password) {
            throw new Error("Todos os campos são requeridos!")
        }

        try {
            if (await prisma.user.findUnique({
                where: {
                    email: email
                }
            })) {
                throw new Error("Este email já está cadastrado!")
            }

            const newUser = await prisma.user.create({
                data: {
                    nome,
                    email,
                    passwordHash
                }
            })

            return newUser;
        } catch (e) {
            console.error("Não foi possível criar um usuário: " + e)
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }

    async loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (!user) {
                throw new Error("Usuário não encontrado! Por favor, cadastre-se")
            }

            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

            if (!isPasswordValid) {
                throw new Error("Senha inválida")
            }

            const tokenPayload = {
                userId: user.id,
                email: user.email
            }

            const token = jwt.sign(
                tokenPayload,
                this.JWT_SECRET,
                { expiresIn: "24h" }
            )

            const userReturn = {
                user,
                token
            }

            return userReturn
        } catch (e) {
            console.error("Não foi possível fazer login! " + e)
            throw e;
        }
    }

    async getUserById(userId: number): Promise<User> {
        try {
            const userFound = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })

            if (!userFound) {
                throw new Error("Não foi possível encontrar o usuário. Faça login!")
            }

            return userFound;
        } catch (e) {
            console.error("Não foi encontrar o usuário! " + e)
            throw e;
        }
    }

    async deleteUser(userId: number): Promise<void> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            })

            if (!user) {
                throw new Error("Usuário não encontrado!")
            }

            await prisma.user.delete({
                where: {
                    id: userId
                }
            })

            console.log("Usuário deletado com sucesso!")
        } catch (e) {
            console.error("Não foi possível deletar o usuário! " + e)
            throw e;
        } finally {
            await prisma.$disconnect();
        }
    }
}