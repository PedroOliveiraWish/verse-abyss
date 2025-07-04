'use client'

import React, { useState } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { authLogin, authSignup } from '@/pages/api/auth'

// Definindo os schemas de login e cadastro

const CadastroSchema = z.object({
    nome: z.string().min(6, "O nome necessita ter 6 caracteres ou mais"),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, "A senha necessita possuir mais de 6 caracteres"),
    confirmPassword: z.string()
})
    .refine(
        ({ password, confirmPassword }) => password === confirmPassword, {
        message: "As senhas não são iguais",
        path: ["confirmPassword"]
    }
    )

const LoginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, "A senha é obrigatória"),
})


// Inferindo-os como tipos

type CadastroType = z.infer<typeof CadastroSchema>;
type LoginType = z.infer<typeof LoginSchema>;

function Login({ onClick }: { onClick: (state: boolean) => void }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("")

    const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange"
    })

    const onSubmit = async (data: LoginType) => {
        setIsLoading(true)
        try {
            const response = await authLogin(data.email, data.password, "http://localhost:3000/auth/login");


            const json = await response.json()

            if (!response.ok) {
                setApiError(json.message)
            }

            console.log(json)
        } catch (err) {
            console.log(err)
            setApiError("Erro ao conectar com o servidor.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='login'>
            <div className="title-auth">Entre</div>

            {apiError && <p>{apiError}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="group">
                    <label>Email</label>
                    <input {...register('email')} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="group">
                    <label>Senha</label>
                    <input type='password' {...register('password')} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="button-submit">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Entrando..." : "Entrar"}
                    </button>
                </div>
            </form>
            <p>
                <span>Ainda não tem cadastro? </span>
                <button onClick={() => onClick(false)}>cadastre-se</button>
            </p>
        </section>
    )
}

function Cadastro({ onClick }: { onClick: (state: boolean) => void }) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [apiError, setApiError] = useState<string>("")

    const { register, handleSubmit, formState: { errors } } = useForm<CadastroType>({
        resolver: zodResolver(CadastroSchema),
        mode: 'onChange'
    })

    const onSubmit = async (data: CadastroType) => {
        setIsLoading(true)

        try {
            const response = await authSignup(data.nome, data.email, data.password, "http://localhost:3000/auth/register");

            const json = await response.json();

            if (!response.ok) {
                setApiError(json.message)
            }

            if (response.ok) {
                onClick(true);
            }

            console.log(json)
        } catch (err) {
            console.log(err)
            setApiError("Erro ao conectar com o servidor.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='cadastro'>
            <div className="title-auth">Cadastre-se</div>

            {apiError && <p>{apiError}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="group">
                    <label>Nome</label>
                    <input {...register('nome')} />
                    {errors.nome && <p>{errors.nome.message}</p>}
                </div>
                <div className="group">
                    <label>Email</label>
                    <input {...register('email')} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="group">
                    <label>Senha</label>
                    <input type='password' {...register('password')} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="group">
                    <label>Confirmar senha</label>
                    <input type='password' {...register('confirmPassword')} />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>

                <div className="button-submit">
                    <button type="submit">
                        {isLoading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </div>
            </form>
            <p>
                <span>Já tem cadastro? </span>
                <button onClick={() => onClick(true)}>faça login</button>
            </p>
        </section>
    )
}

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <div className="container-auth">
            {isLogin ? (
                <Login onClick={setIsLogin} />
            ) : (
                <Cadastro onClick={setIsLogin} />
            )}
        </div>
    )
}