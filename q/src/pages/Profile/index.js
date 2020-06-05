//user effect dispara uma função em algum determinado momento do componente
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import "./styles.css";

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]); //busca conjunto de informações do backend, por isso o state vem vazio
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    //primeiro parametro qual função quero que seja executada
    //segundo parametro quando essa função vai ser executada
    //se o array fica vazio ele vai executar somente uma vez
    useEffect(() => {
        api.get('profile', { 
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);   
        });
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,   
                }
            });
            //mantem apenas os incidentes que forem diferentes do incidente atual
            setIncidents(incidents.filter(incident => incident.id !== id ));

        }   catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {/* percorrer cada um deles retornando alguma coisa */}
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        {/* currency formato de moeda */}
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        {/* nesse formato está sendo passado uma função, e não o retorno de uma função */}
                        {/* se passasse o retorno de uma função deletaria todos os registros */}
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}