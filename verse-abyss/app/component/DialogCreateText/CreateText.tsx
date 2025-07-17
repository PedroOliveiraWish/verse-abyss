'use client'

import React, { useState, useEffect } from "react";
import { Dialog } from "radix-ui"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { getAllTags } from "@/pages/api/tags/tags";
import { createText } from "@/pages/api/texts/texts";

import "./style.css";

type Tag = {
    id: number
    nome: string
}

const CreateTxtSchema = z.object({
    titulo: z.string().min(1, "O título é obrigatório"),
    conteudo: z.string().min(1, "O conteúdo é obrigatório"),
    tagId: z.string().min(1, "A tag é obrigatória"),
})

type CreateTxtType = z.infer<typeof CreateTxtSchema>;

export function CreateText() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");
    const [tags, setTags] = useState<Tag[]>([])

    useEffect(() => {
        fetchTags()
    }, [])

    async function fetchTags() {
        try {
            const response = await getAllTags();

            const json = await response.json()

            setTags(json);
        } catch (error) {
            console.log(error)
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(CreateTxtSchema)
    });

    const onSubmit = async (data: CreateTxtType) => {
        setIsLoading(true);
        setApiError("");

        try {
            const response = await createText(Number(data.tagId), data.titulo, data.conteudo);

            const json = await response.json();

            if (!response.ok) {
                return setApiError(json?.message || "Erro ao criar texto. Tente novamente.");
            }

            // Reset form or handle success
            console.log("Texto criado com sucesso:", json);
        } catch (error) {
            console.error("Erro ao criar texto:", error);
            setApiError("Erro ao criar texto. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="dialog-button-open">Criar texto</button>
                </Dialog.Trigger>
                <Dialog.Content className="dialog-wrapper">
                    <div className="dialog-wrapper-content">
                        <div className="dialog-wrapper-header">
                            <Dialog.Title className="dialog-title">Criar Texto</Dialog.Title>

                            <Dialog.Close asChild>
                                <button className="close-button" aria-label="Fechar">
                                    ×
                                </button>
                            </Dialog.Close>
                        </div>
                        {apiError && <p className='api-error'>{apiError}</p>}
                        <Dialog.Description className="dialog-description">
                            Preencha os campos abaixo para criar um novo texto.
                        </Dialog.Description>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="group-input">
                                <label htmlFor="titulo">Titulo</label>
                                <input {...register("titulo")} placeholder="Título" />
                                {errors.titulo && <span>{errors.titulo.message}</span>}
                            </div>
                            <div className="group-input">
                                <label htmlFor="conteudo">Conteúdo</label>
                                <textarea {...register("conteudo")} placeholder="Conteúdo" />
                                {errors.conteudo && <span>{errors.conteudo.message}</span>}
                            </div>
                            <div className="group-input">
                                <label htmlFor="tagId">Assunto</label>
                                <select {...register("tagId")}>
                                    <option value="">Selecione uma tag</option>
                                    {tags.map(tag => (
                                        <option key={tag.id} value={tag.id}>{tag.nome}</option>
                                    ))}
                                </select>
                                {errors.tagId && <span>{errors.tagId.message}</span>}
                            </div>
                            <div className="group-input">
                                <label htmlFor=""></label>
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? "Criando..." : "Criar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
}