import { User } from "@prisma/client";
import bcrypt from 'bcryptjs';
import prisma from "../lib/prisma";

export class UserService {
    async createUser(nome: string, email: string, password: string): Promise<User> {
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
            throw new Error("Não foi possível criar um novo usuário devido a um problema interno!")
        } finally {
            await prisma.$disconnect();
        }
    }

    async loginUser(email: string, password: string): Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (!user) {
                return null;
            }

            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

            if (!isPasswordValid) {
                return null;
            }

            return user;
        } catch (e) {
            console.error("Não foi possível fazer login! " + e)
            throw new Error("Não foi possível fazer login");
        }
    }
}