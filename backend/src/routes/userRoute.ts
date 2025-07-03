import { Router } from "express";
import { UserController } from "../controller/userController";

const userController = new UserController();

const router = Router();

router.get('/get-by-id', async (req, res) => {
    try {
        await userController.getUserById(req, res)
    } catch (err) {
        console.error("Erro em GET /get-by-id", err)
    }
})

router.post('/register', async (req, res) => {
    try {
        await userController.createUser(req, res)
    } catch (err) {
        console.error("Erro em POST /register", err)
    }
})

router.post('/login', async (req, res) => {
    try {
        await userController.loginUser(req, res)
    } catch (err) {
        console.error("Erro em POST /login", err)
    }
})

export default router;