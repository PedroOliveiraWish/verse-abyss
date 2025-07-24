import { Router } from "express";
import { UserController } from "../controller/userController";
import verifyToken from "../middleware/auth";

const userController = new UserController();

const router = Router();

// Rota protegida - exige autenticação
router.get('/get-by-id', verifyToken, async (req, res) => {
    try {
        await userController.getUserById(req, res)
    } catch (err) {
        console.error("Erro em GET /get-by-id", err)
    }
})

// Rota pública - não exige autenticação
router.post('/register', async (req, res) => {
    try {
        await userController.createUser(req, res)
    } catch (err) {
        console.error("Erro em POST /register", err)
    }
})

// Rota pública - não exige autenticação 
router.post('/login', async (req, res) => {
    try {
        await userController.loginUser(req, res)
    } catch (err) {
        console.error("Erro em POST /login", err)
    }
})

// Rota privada - exige autenticação
router.delete('/delete', verifyToken, async (req, res) => {
    try {
        await userController.deleteUser(req, res)
    } catch (err) {
        console.error("Erro em DELETE /delete", err)
    }
})

export default router;