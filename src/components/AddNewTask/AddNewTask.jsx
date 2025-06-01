import './AddNewTask.css'
import './AddNewTask-media.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosCloseCircle } from "react-icons/io";

import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuth } from '../../Hooks/useAuthentication';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';

export const AddNewTask = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    const [emailVerified, setEmailVerified] = useState()

    const taskCollectionRef = collection(db, "tasks")

    const { user } = useAuth()

    const addNewTask = async (e) => {
        e.preventDefault()

        try {
            await addDoc(taskCollectionRef, {
                title,
                description,
                priority,
                createdBy: user.displayName,
                status: 'Pendente'
            })

            const modal = document.querySelector(".modalTaskCreated")

            modal.show()

        } catch (error) {
            console.log(error)
        }

    }

    const closeModalTaskCreated = () => {
        const modal = document.querySelector(".modalTaskCreated")

        modal.close()
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user.emailVerified === false) {
                setEmailVerified(false)
            } else {
                setEmailVerified(true)
            }
        });
    }, [user])

    const resendVerificationEmail = () => {

        sendEmailVerification(auth.currentUser)

    }

    return (
        <>
            {emailVerified ?
                <form className='divCreateNewTask' onSubmit={(e) => addNewTask(e)}>

                    <dialog className='modalTaskCreated'>
                        <div className='divModalTaskCreated'>
                            <p className='areYouSure'>Tarefa criada com sucesso</p>

                            <div className='taskCreatedBtns'>
                                <button type='button' onClick={() => closeModalTaskCreated()} className='btnCloseModalTaskCreated'>Criar nova tarefa</button>
                                <button className='btnReturnMenu'>
                                    <Link to='/'>Voltar para o menu</Link>
                                </button>

                            </div>
                        </div>
                    </dialog>

                    <div className='createNewTask'>

                        <div className='divTaskInformations'>
                            <label htmlFor="title">Titulo da tarefa:</label>
                            <input type="text" required name="titulo" id="title" onChange={(e) => setTitle(e.target.value)} />
                            <label htmlFor="description">Descrição da tarefa:</label>
                            <input type="text" required name="descricao" id="description" onChange={(e) => setDescription(e.target.value)} />
                            <label htmlFor="selectPriority">Prioridade:</label>
                            <select name="" id="selectPriority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <optgroup>
                                    <option value="Baixa">Baixa</option>
                                    <option value="Média">Média</option>
                                    <option value="Alta">Alta</option>
                                    <option value="Máxima">Máxima</option>
                                </optgroup>
                            </select>

                            <button type='submit' className='btnAddNewTask'>Adicionar</button>

                        </div>

                        <div>
                            <Link to='/'>
                                <IoIosCloseCircle className='closeIcon' />
                            </Link>
                        </div>
                    </div>
                </form>
                :
                <div className='divModalUserNotVerified'>

                    <div className='modalUserNotVerified'>
                        <h4>Ops... seu email ainda não foi verificado</h4>
                        <p>Para usar a funcionalidade de criação de tarefas, você precisa confirmar que tem acesso ao e-mail cadastrado.</p>
                        <p>No momento em que sua conta foi criada, enviamos um link de verificação para o email cadastrado,por favor, verifique sua caixa de entrada</p>
                        <span>Obs: Caso não encontre na caixa de entrada, verifique também a caixa de spam</span>
                        <button className='btnResendEmail' onClick={() => resendVerificationEmail()}>Se precisar, clique aqui para reenviar o E-mail de verificação</button>
                    </div>
                </div>}

        </>

    )
}