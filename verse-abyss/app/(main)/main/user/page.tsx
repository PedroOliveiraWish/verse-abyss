'use client'
import { Hero } from "@/app/component/hero/hero";
import React from "react";

import TabUser from "@/app/component/user/tabs/TabUser";

import './style.css';

export default function UserPage() {
    return (
        <div className="user-page">
            <Hero
                title="Perfil do Usuário"
                text="Explore o seu espaço pessoal, onde cada texto é uma janela para a sua alma."
                sub="🌑 Todos os textos compartilhados por você."
            />
                <TabUser />
        </div>
    );
}