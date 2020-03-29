import React, {useEffect, useState} from 'react';
import {FiPower, FiTrash2} from 'react-icons/fi'

import {Link, useHistory} from 'react-router-dom';

import logoImg from '../../assets/logo.svg'; 
import './style.css'

import Api from '../../services/api'

export default function Profile() {
    const nomeOng = localStorage.getItem('ongNome');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    

    const [listIncidents, setListIncidents] = useState([]);

    useEffect(() =>{ 
        Api.get('incidents', {
            headers: {
                Authorizaton: ongId
            }
        }).then(retorno => {
            setListIncidents(retorno.data)
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {

        try {
            await Api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setListIncidents(listIncidents.filter(incident => incident.id != id))
        } catch (error) {
            alert('Não foi possivel deletar o item')
        }

        
    }

    function handleLogout() {
       localStorage.clear();

       history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>

                <span>Bem vinda, {nomeOng}</span>
                
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            
            <h1>Casos cadastrados</h1>
            <ul>
                {listIncidents.map(incident => (
                    <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>Descriçao:</strong>
                    <p>{incident.description}</p>
                    
                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-Br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}> 
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}