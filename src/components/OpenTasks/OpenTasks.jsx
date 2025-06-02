import './OpenTasks.css'
import './OpenTasks-media.css'

import { useAuth } from '../../Hooks/useAuthentication';
import { db } from '../../config/firebase';
import { getDocs, collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { FaTrashCan } from "react-icons/fa6";
import { TiPencil } from "react-icons/ti";
import { FaRegCheckCircle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const OpenTasks = () =>{
    const [taskList, setTaskList] = useState([]);

    const taskCollectionRef = collection(db, 'tasks')
    const taskCollectionRef2 = collection(db, 'concludedTasks')
    
    const [selectedTask, setSelectedTask] = useState(null)

    const { user } = useAuth()

    useEffect(() => {
        const getTaskList = async () => {
            try {
                const data = await getDocs(taskCollectionRef)

                const filteredData = data.docs.map((doc) => (
                    { ...doc.data(), id: doc.id }
                ))

                setTaskList(filteredData)
            } catch (error) {
                console.log(error)
            }
        }

        getTaskList()

    }, [taskList])

    const finishTask = async () => {

        if (selectedTask && selectedTask.createdBy === user.displayName) {
            try {
                await addDoc(taskCollectionRef2, {
                    title: selectedTask.title,
                    description: selectedTask.description,
                    priority: selectedTask.priority,
                    createdBy: selectedTask.createdBy
                })
    
                const taskDoc = doc(db, 'tasks', selectedTask.id)
                await deleteDoc(taskDoc)
                closeModalFinishTask()
            } catch (error) {
                console.log("Erro ao finalizar tarefa", error)
            }
        }
        else {
            alert('Você não pode excluir uma tarefa criada por outra pessoa ')
        }
    }

    const deleteTask = async () => {

        if (selectedTask && selectedTask.createdBy === user.displayName) {
            try {
                const taskDoc = doc(db, 'tasks', selectedTask.id)
                await deleteDoc(taskDoc)
            closeModalDeleteTask()
            } catch (error) {
                console.log("Erro ao deletar a tarefa", error)
            }
        } else {
            alert('Você não pode excluir uma tarefa criada por outra pessoa ')
        }

    }

    const updateTaskStatus = async (newStatus) => {
        if (selectedTask && selectedTask.createdBy === user.displayName) {
            try {
                const taskDoc = doc(db, 'tasks', selectedTask.id);
                await updateDoc(taskDoc, { status: newStatus });
                console.log(`Status atualizado para: ${newStatus}`);
                setSelectedTask(null);
                closeModalEditTask();
            } catch (error) {
                console.error('Erro ao atualizar o status da tarefa:', error);
            }
        } else {
            alert('Você não pode editar uma tarefa criada por outra pessoa');
        }
    }

    const openModalFinishTask = (list) => {

        if(user === null){
            const modalNotAutenticated = document.querySelector(".modalNotAutenticated")

            modalNotAutenticated.showModal()
        }else if(user.displayName !== list.createdBy){
            const modalDiferentUser = document.querySelector(".modalDiferentUser")

            modalDiferentUser.showModal()
        }else{
            setSelectedTask(list)

            const modal = document.querySelector(".modalFinishTask")

            modal.showModal() 
        }
        
    }

    const closeModalFinishTask = () => {
        const modal = document.querySelector(".modalFinishTask")

        setSelectedTask(null)
        modal.close()
    }

    const openModalEditTask = (list) => {

        if(user === null){
            const modalNotAutenticated = document.querySelector(".modalNotAutenticated")

            modalNotAutenticated.showModal()
        }else if(user.displayName !== list.createdBy){
            const modalDiferentUser = document.querySelector(".modalDiferentUser")

            modalDiferentUser.showModal()
        }else{
            setSelectedTask(list)

            const modal = document.querySelector(".modalEditTask")

            modal.showModal()
        }
        
    }

    const closeModalEditTask = () => {

        const modal = document.querySelector(".modalEditTask")

        setSelectedTask(null);
        modal.close()
    }

    const openModalDeleteTask = (list) => {

        if(user === null){
            const modalNotAutenticated = document.querySelector(".modalNotAutenticated")

            modalNotAutenticated.showModal()
        } else if(user.displayName !== list.createdBy){
           const modalDiferentUser = document.querySelector(".modalDiferentUser")

           modalDiferentUser.showModal()
        } else{
            setSelectedTask(list)

            const modal = document.querySelector(".modalDeleteTask")

            modal.showModal() 
        }
        
    }

    const closeModalDeleteTask = () => {
        const modal = document.querySelector(".modalDeleteTask")

        setSelectedTask(null)
        modal.close()
    }

    const closeModalAutentication = () =>{
        const modalAutentication = document.querySelector(".modalNotAutenticated")

        modalAutentication.close()
    }

    const closeModalDiferentUser = () =>{
        const modalDiferentUser = document.querySelector(".modalDiferentUser")

        modalDiferentUser.close()
    }

    return(
        <div id='divOpenTasks'>
                    <h2>Tarefas em aberto</h2>
                    {taskList.length === 0 ? <div className='noTasksPending'> <p>Nenhuma tarefa pendente</p> </div> : taskList.map((list) => (
                        <div className='openTasks' key={list.id}>
                            <dialog className='modalFinishTask'>
                                <div className='divModalFinishTask'>
                                    <p className='areYouSure'>Tem certeza que deseja marcar essa tarefa como concluída?</p>
                                    <span className='spanObs'>Obs: Essa ação não pode ser desfeita </span>
                                    <div className='modalFinishTaskBtns'>
                                        <button onClick={() => finishTask(list)} className='btnFinishTask'>Concluir tarefa</button>
                                        <button onClick={() => closeModalFinishTask(list)} className='btnCancel'>Cancelar</button>
                                    </div>
                                </div>
                            </dialog>

                            <dialog className='modalEditTask'>
                                <div className='divEditTaskOptions'>
                                    <button className='pending' onClick={() => updateTaskStatus('Pendente')}>Pendente</button>
                                    <button className='inProgress' onClick={() => updateTaskStatus('Em progresso')}>Em progresso</button>
                                    <button className='paused' onClick={() => updateTaskStatus('Pausada')}>Pausada</button>
                                    <button className='waitingInfo' onClick={() => updateTaskStatus('Aguardando informações')}>Aguardando informações</button>
                                    <button className='waitingApproval'  onClick={() => updateTaskStatus('Aguardando aprovação')}>Aguardando aprovação</button>
                                </div>
                                <div className='divModalEditTaskBtnCancel'>
                                    <button onClick={() => closeModalEditTask()} className='btnCancel'>Cancelar</button> 
                                </div>
                            </dialog>

                            <dialog className='modalDeleteTask'>
                                <div className='divModalFinishTask'>
                                    <p className='areYouSure'>Tem certeza que deseja excluir essa tarefa?</p>
                                    <span className='spanObs'>Obs: Essa ação não pode ser desfeita</span>
                                    <div className='modalFinishTaskBtns'>
                                        <button onClick={() => deleteTask(list)} className='btnFinishTask'>Excluir tarefa</button>
                                        <button onClick={() => closeModalDeleteTask()} className='btnCancel'>Cancelar</button>
                                    </div>
                                </div>
                            </dialog>

                            <dialog className='modalNotAutenticated'>

                                <h3>Para realizar essa ação, você precisa estar autenticado.</h3>
                                    
                                <div className='modalNotAutenticatedBtns'>
                                    <Link to='/signIn' className='btnAutenticate'>Entrar</Link> 
                                    <button className='btnCancelAutentication' onClick={() => closeModalAutentication()}>Cancelar</button>
                                </div>
                            
                            </dialog>

                            <dialog className='modalDiferentUser'>

                                <h3>Você não pode fazer alterações em tarefas criadas por outro usuário</h3>
                                <button className='btnModalDiferentUser' onClick={() => closeModalDiferentUser()}>Fechar</button>
                                
                            </dialog>

                            <div className='openTasksTitle'>
                                <h3 className='openTasksTitleH3'>{list.title}</h3>
                            </div>
                            <hr />
                            <div className='divOpenTaskBox'>
                                <div className='openTaskBox'>
                                    <p className='openTaskBoxDescription'><strong>Descrição</strong>: {list.description}</p>
                                    <p><strong>Prioridade</strong>: {list.priority}</p>
                                    <p><strong>Criado por</strong>: {list.createdBy}</p>
                                    <p className='taskStatus'><strong>Status</strong>: {list.status}</p>
                                </div>

                                <div className='openTasksFunctions'>
                                    <button className='finishTask' onClick={() => openModalFinishTask(list)}>
                                        <FaRegCheckCircle />
                                    </button>
                                    <button className='changeTask' onClick={() => openModalEditTask(list)}>
                                        <TiPencil />
                                    </button>
                                    <button className='deleteTask'  onClick={() => openModalDeleteTask(list)}>
                                        <FaTrashCan />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
    )
}