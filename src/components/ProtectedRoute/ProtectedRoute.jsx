import './ProtectedRoute.css'
import './ProtectedRoute-media.css'
import { Link } from 'react-router-dom'

export const ProtectedRoute = () =>{
    return(
        <div className="divProtectedRoute">
            <div className="protectedRoute"> 
                <h1>Você não está autenticado :(</h1>
                <div className='divOptionsProtectedRoute'>
                    <div className='divSignInProtectedRoute'>
                        <p>Faça login para ter acesso total ao site</p>
                        <Link to='../signIn' className='loginLink'>Entrar</Link>
                    </div>
                    <div className='divCreateAccountProtectedRoute'>
                        <p>Ainda não tem uma conta?</p>
                        <Link to='../CreateAccount' className='createAccountLink'>Cadastre-se</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}