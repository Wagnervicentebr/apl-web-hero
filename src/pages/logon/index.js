import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'

import {FiLogIn} from 'react-icons/fi';

import './style.css';

import heroesImg from '../../assets/heroes.png'; 
import logoImg from '../../assets/logo.svg'; 

import Api from '../../services/api'


export default  function Logon() {

    const [id_ongs, setOng_id] = useState('');
    const history = useHistory();

    async function handleLogon(event) {
        event.preventDefault();

        try {
            const retorno = await Api.post('session', {id_ongs});

           localStorage.setItem('ongNome', retorno.data.name);
           localStorage.setItem('ongId', id_ongs);

            history.push('/profile');
        } catch (error) {
            alert("Erro ao encontrar ID informado")
        }
    }


    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>

                    <input 
                        type="text" placeholder="Sua ID"
                        value={id_ongs}
                        onChange={event => setOng_id(event.target.value)}
                    />
                    <button className="button" type="subimt">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}



