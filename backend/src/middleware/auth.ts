import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { JwtPayload } from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET || "Meu"

export default function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(401).json({ message: "Token não provido!" })
        return;
    }

    const tokenReplaced = token.split(',')[1];

    try {
        const decoded = jwt.verify(tokenReplaced, JWT_SECRET);

        if (!decoded) {
            res.status(403).json({ message: "Token inválido" })
            return;
        }

        req.user = decoded;

        next();
    } catch (error: any) {
        res.status(403).json({ message: error.message })
    }
}