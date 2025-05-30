import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../../Hooks/useAuthentication';
import './MyProfile.css'
import { TiPencil } from "react-icons/ti";

export const MyProfile = () =>{

    const {user} = useAuth()

    const openModalChangePassword = () =>{
        const modalChangePassword = document.querySelector('.modalChangePassword')

        modalChangePassword.showModal()
    }

    const closeModalChangePassword = () =>{
        const modalChangePassword = document.querySelector('.modalChangePassword')

        modalChangePassword.close()
    }

    const btnChangePassowrd = () =>{
        const auth = getAuth()

        const modalEmailSent = document.querySelector('.modalEmailSent')

        try {
            sendPasswordResetEmail(auth, user.email)
            modalEmailSent.showModal()
            closeModalChangePassword()
        } catch (error) {
            console.log(error)
        }
    }

    const closeModalEmailSent = () =>{
        const modalEmailSent = document.querySelector('.modalEmailSent')

        modalEmailSent.close()
    }

    return(
        <div className="divMyProfile">  
            <div className="myProfile">
                <h1>Meus dados:</h1>
                <div className='divChangeUserName'>
                    <p><strong>Nome de usuário:</strong> {user && user.displayName}</p>
                    {/* <TiPencil className='changeInfo'/> */}
                </div>
                <div className='divUserEmail'>
                    <p><strong>Email:</strong> {user && user.email}</p>
                </div>
                <div className='divChangePassword'>
                    <p><strong>Senha:</strong> *********</p>
                    <TiPencil className='changeInfo'  onClick={() => openModalChangePassword()} />
                </div>

            </div>

            <dialog className='modalChangePassword'>
                <p>Tem certeza que deseja alterar sua senha?</p>
                <div className='btnsModalChangePassword'>
                    <button className='btnChangePassword' onClick={() => btnChangePassowrd()}>Mudar senha</button>
                    <button className='btnCancelChangePassword' onClick={() => closeModalChangePassword()}>Cancelar</button>
                </div>
            </dialog>

            <dialog className='modalEmailSent'>
                <p>Te encaminhamos um e-mail para que seja efetuada a troca da sua senha, por favor, verifique sua caixa de entrada.</p>
                <button className='btnCancelModalEmailSent' onClick={() => closeModalEmailSent()}>Fechar</button>
            </dialog>
        </div>
    )
}