'use client';

import React, { useState } from 'react';
import { deleteUser } from '@/pages/api/user/user';

import Loader from '../../loader/Loader';
import './excluir.css';

export default function DeleteUser() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleDelete = async () => {
        if (!confirmed) {
            setConfirmed(true);
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            const response = await deleteUser();
            const data = await response.json();
            if (response.ok) {
                setMessage(`🕯️ ${data.message}`);
            } else {
                setMessage(`Erro: ${data.message}`);
            }
        } catch (error) {
            setMessage(`Erro: Não foi possível excluir o usuário. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="delete-container">
            <h1>Desaparecer?</h1>
            <p className="question">
                Às vezes, a vontade de partir parece uma resposta... <br />
                Mas você tem certeza que este é o caminho? <br />
                Esta ação não poderá ser desfeita.
            </p>

            <button
                className={`delete-button ${confirmed ? 'confirm' : ''}`}
                disabled={loading}
                onClick={handleDelete}
            >
                {confirmed ? 'Sim, desejo desaparecer' : 'Quero apagar minha existência'}
            </button>

            {loading && <Loader />}
            {message && <p className="delete-message">{message}</p>}
        </div>
    );
}
