import './SignIn.css';
import './SignIn-media.css'
import { useState } from 'react';
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { IoIosCloseCircle } from 'react-icons/io';
import { useAuth } from '../../Hooks/useAuthentication';

export const SignIn = () => {

    const { user } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState('')

    const openModalError = () =>{
        const modalLoginNotFound = document.querySelector('.modalLoginNotFound')

        modalLoginNotFound.showModal()
    }

    const closeModalError = () =>{
        const modalLoginNotFound = document.querySelector('.modalLoginNotFound')

        modalLoginNotFound.close()
    }

     const openModalLoginSuccess = () =>{
        const modalLoginSuccess = document.querySelector('.modalLoginSuccess')

        modalLoginSuccess.showModal()
    }

    const closeModalLoginSuccesss = () =>{
        const modalLoginSuccess = document.querySelector('.modalLoginSuccess')

        modalLoginSuccess.close()
    }

    const login = async (e) =>{
        e.preventDefault()

        try {
            await signInWithEmailAndPassword(auth, email, password)
            openModalLoginSuccess()
        } catch (error) {
            console.log(error)
            openModalError()
        }

    }

    return (
        <>
            <form className='formLogin' onSubmit={(e) => login(e)}>
                <div className='divLogin'>
                    <h1>Entrar</h1>
                    <div className='emailSignIn'>
                        <label htmlFor="email" >Email:</label>
                        <input type="email" name="" id="email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='divInputIcon'>
                        <div className='divPassword'>
                            <label htmlFor="password">Senha:</label>
                            <input type={showPassword ? 'text' : 'password'} name="" id="password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            {showPassword ? <LuEye className='showPassword' onClick={() => setShowPassword(!showPassword)} /> : <LuEyeClosed className='showPassword' onClick={() => setShowPassword(!showPassword)} />}
                        </div>
                    </div>
                    <div className='divNAAccount'>
                        <p>Ainda não tem uma conta?</p>
                        <Link to='/createAccount' className='createAccountLink2'>Cadastre-se</Link>
                    </div>
                    <button className='btnLogin'>Entrar</button>
                </div>
            </form>

            <dialog className='modalLoginNotFound'>
                    <div className='divCloseIcon'>
                        <IoIosCloseCircle className='closeIcon' onClick={() => closeModalError()} />
                    </div>
                    <div className='divLoginNotFound'>
                        <p>E-mail e/ou senha inválido(s). Verifique seus dados, e tente novamente.</p>
                    </div>
            </dialog>

            <dialog className='modalLoginSuccess'>
                    <div className='divCloseIcon'>
                        <Link to='/'>
                            <IoIosCloseCircle className='closeIcon' onClick={() => closeModalLoginSuccesss()} />
                        </Link>
                    </div>
                    <div className='divModalLoginSuccess'>
                        <p>Que bom te ver por aqui, {user?.displayName} :)</p> 
                        <p>Seja bem vindo ao nosso site de tarefas.</p>
                    </div>
            </dialog>
        </>
    )
}