import './Header.css'
import './HeaderMedia.css'

import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

import { VscAccount } from "react-icons/vsc";
import { FaUserPlus } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

import { Link, NavLink } from "react-router-dom";
import { useAuth } from '../../Hooks/useAuthentication';

export const Header = () => {

    const openModalLogout = () => {
        let modalLogOut = document.querySelector('.modalLogOut')
        modalLogOut.showModal()
    }

    const closeModalLogout = () => {
        let modalLogOut = document.querySelector('.modalLogOut')
        modalLogOut.close()
    }

    const { user, loading } = useAuth()

    if (loading) {
        return <div>Carregando...</div>;
    }

    const logOutUser = async () => {
        await signOut(auth)
        closeModalLogout()
    }

    return (
        <>
            <div className='header'>
                <NavLink to="/" className="navLinkH1">
                    Tarefas Andritz
                </NavLink>

                <div>
                    {user ? (
                        <div className='divProfileIcons'>
                            <NavLink to='/myprofile'>
                                <VscAccount className='profileIcon' />
                            </NavLink>

                            <IoIosLogOut className='logOutIcon' onClick={() => openModalLogout()} />
                        </div>
                    ) :
                        <NavLink to='/createAccount'>
                            <FaUserPlus className='createAccountIcon' />
                        </NavLink>
                    }
                </div>
            </div>

            <dialog className='modalLogOut'>
                <p>Tem certeza que deseja sair?</p>
                <div className='btnsModalLogOut'>
                    <Link to='/' className='btnLogOut' onClick={() => logOutUser()}>
                        Sair
                    </Link>
                    <button className='btnCloseModalLogout' onClick={() => closeModalLogout()}>Ficar</button>
                </div>
            </dialog>

            <hr className='headerHR' />
        </>
    )
}