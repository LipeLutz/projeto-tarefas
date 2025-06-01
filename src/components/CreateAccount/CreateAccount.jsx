import './CreateAccount.css';
import './CreateAccount-media.css'
import { useState } from 'react';

import { LuEye, LuEyeClosed } from "react-icons/lu";
import { IoIosCloseCircle } from "react-icons/io";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Link } from 'react-router-dom';
import { sendEmailVerification } from "firebase/auth";

export const CreateAccount = () =>{

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false) 
    const [showPassword2, setShowPassword2] = useState(false) 

    const [errorMessage, setErrorMessage] = useState('')

    const createAccount = async (e) =>{  
        
        e.preventDefault()

        if(password !== confirmPassword){
            setErrorMessage('As senhas devem ser iguais.')
            const modalAccountError = document.querySelector('.modalAccountError')

            modalAccountError.showModal()
        } else{
            const createUser = await createUserWithEmailAndPassword(auth, email, password)
            const user = createUser.user

            await updateProfile(user, {
                displayName
            });

            sendEmailVerification(user)

            const modalAccountCreated = document.querySelector('.modalAccountCreated')

            modalAccountCreated.showModal()
        }
    }

    const closeModalAccountError = () =>{
        const modalAccountError = document.querySelector('.modalAccountError')

        modalAccountError.close()
    }

    return(
        <form className="formCreateAccount" onSubmit={(e) => createAccount(e)}>
            <div className="divCreateAccount">
                <h1>Cadastre - se</h1>
                <div className='createUserName'>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" name="" id="name" placeholder="Adicione seu nome e um sobrenome" onChange={(e) => setDisplayName(e.target.value)} required />
                </div>

                <div className='createEmail'>
                    <label htmlFor="email" >Email:</label>
                    <input type="email" name="" id="email" placeholder="Adicione um email de confiança" onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <div className='divInputIcon'>
                    <div className='divPassword'>
                        <label htmlFor="password">Senha:</label>
                        <input type={showPassword ? 'text' : 'password'} name="" id="password" placeholder="Crie uma senha" onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div>
                        {showPassword ? <LuEye className='showPassword' onClick={() => setShowPassword(!showPassword)}/> : <LuEyeClosed className='showPassword' onClick={() => setShowPassword(!showPassword)}/>}
                    </div>
                </div>

                <div className='divInputIcon'>
                    <div className='divPassword'>
                        <label htmlFor="confirmPassword">Confirmação de senha:</label>
                        <input type={showPassword2 ? 'text' : 'password'} name="" id="confirmPassword" placeholder="Confirme sua senha" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </div>

                    <div>
                        {showPassword2 ? <LuEye className='showPassword' onClick={() => setShowPassword2(!showPassword2)}/> : <LuEyeClosed className='showPassword' onClick={() => setShowPassword2(!showPassword2)}/>}
                    </div>
                </div>

                <div className='divNAAccount'>
                    <p>Já tem uma conta?</p>
                    <Link to='/signIn' className='createAccountLink2'>Entrar</Link>
                </div>

                <button className='btnCreateAccount' type='submit'>Criar conta</button>
            </div>

            <dialog className='modalAccountCreated'>
                <div>
                    <p>Conta criada com sucesso!</p>
                    <p>Um link de verificação foi enviado para o seu E-mail cadastrado, fazemos isso para garantirmos que você tem acesso ao E-mail cadastrado :)</p>
                </div>
                <button className='btnModalAccountCreated'>
                    <Link to='/'>Voltar para o menu</Link>
                </button>
            </dialog>

            <dialog className='modalAccountError'>
                <div className='divCloseIconAccountError'>
                    <IoIosCloseCircle className='closeIcon' onClick={() => closeModalAccountError()}/>
                </div>
                <p>{errorMessage}</p>
            </dialog>
        </form>
    )
}