'use client';

import React, { useState, useEffect } from 'react';
import { getUserById } from '@/pages/api/user/user';

import Loader from '../../loader/Loader';
import { Avatar } from 'radix-ui';

import './perfil.css';

export default function Perfil() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await getUserById('http://localhost:3001/auth/get-by-id');
            const data = await response.json();

            if (data?.user) {
                setNome(data.user.nome);
                setEmail(data.user.email);
            } else {
                console.error('User data not found');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="perfil-container">
            <h1>Perfil</h1>
            {loading ? (
                <Loader />
            ) : (
                <div className="perfil-info">
                    <div className="logo">
                        <Avatar.Root>
                            <Avatar.Fallback className="avatar-fallback">
                                {nome ? nome[0] : '?'}
                            </Avatar.Fallback>
                        </Avatar.Root>
                    </div>
                    <div className="nome-email">
                        <p><strong>Nome:</strong> {nome || 'Não disponível'}</p>
                        <p><strong>Email:</strong> {email || 'Não disponível'}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
