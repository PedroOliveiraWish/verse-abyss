'use client';

import React from "react";
import { Tabs } from "radix-ui";

import Perfil from "../perfil/Perfil";
import DeleteUser from "../excluir/Excluir";
import UserTexts from "../textos/Textos";

import './tab.css';

export default function TabUser() {
    return (
        <Tabs.Root defaultValue="textos" className="tabs-root">
            <Tabs.List className="tabs-list">
                <Tabs.Trigger value="perfil" className="tabs-trigger">Perfil</Tabs.Trigger>
                <Tabs.Trigger value="textos" className="tabs-trigger">Textos</Tabs.Trigger>
                <Tabs.Trigger value="excluir" className="tabs-trigger">Excluir</Tabs.Trigger>
            </Tabs.List>

            <div className="tab-container">
                <Tabs.Content value="perfil" className="tabs-content">
                    <Perfil />
                </Tabs.Content>

                <Tabs.Content value="textos" className="tabs-content">
                    <UserTexts />
                </Tabs.Content>

                <Tabs.Content value="excluir" className="tabs-content">
                    <DeleteUser />
                </Tabs.Content>
            </div>
        </Tabs.Root>
    )
}