import React, {useState} from 'react'

import {FiArrowLeft} from 'react-icons/fi'

import {Link} from 'react-router-dom';

import logoImg from '../../assets/logo.svg'; 

import Api from '../../services/api'

import './style.css'

export default function NewIncident() {
        
    
    
    const [title, setTitle] = useState('');
    const [description, setDescricao] = useState('');
    const [value, setValue] = useState('');

    async function handleCreateNew(event) {

        event.preventDefault();
        const ongId = localStorage.getItem('ongId')
        const data = {
            title,
            description,
            value
        }

        try {
            await Api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            alert("Sucesso ao criar um novo caso");
            setTitle('');
            setDescricao('');
            setValue('');
        } catch (error) {
            alert("Erro ao criar um novo caso");
        }

    }

    return (
        <div className="incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>descreva o caso detalhadamente para encontrar um herou para resolver isso.</p>

                    <Link className="back-link" to="/profile" >
                        <FiArrowLeft size={20} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleCreateNew}>
                    <input 
                        type="text" placeholder="Titulo do caso"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <textarea  
                        placeholder="Descrição"
                        value={description}
                        onChange={event => setDescricao(event.target.value)}
                    />
                    <input 
                        type="text" placeholder="Valor em reais"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />

                    <div className="form-group">
                        <button className="button-outline" style={{ width: 300}}>Cancelar</button>
                        <Link className="button" to="/profile">Castrar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}