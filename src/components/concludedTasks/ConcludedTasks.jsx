import './ConcludedTasks.css'

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/firebase"

export const ConcludedTasks = () => {

    const [concludedTasks, setConcludedTasks] = useState([])
    const taskCollectionRef = collection(db, 'concludedTasks')

    useEffect(() => {
        const getConcludedTasks = async () => {
            try {
                const data = await getDocs(taskCollectionRef)

                const filteredData = data.docs.map((doc) => (
                    { ...doc.data(), id: doc.id }
                ))

                setConcludedTasks(filteredData)
            } catch (error) {
                console.log(error)
            }
        }

        getConcludedTasks()
    }, [concludedTasks])

    return (
        <div id='divConcludedTasks'>
            <h2>Tarefas concluídas</h2>
            {concludedTasks.length === 0 ? <div className='noTasksConcluded'> <p>Nenhuma tarefa concluída</p> </div> : concludedTasks.map((list) => (
                <div key={list.id}>
                    <div className='concludedTasks' >
                        <h3 className='concludedTasksTitle'>{list.title}</h3>
                        <hr />
                        <div className='concludedTasksBox'>
                            <p>{list.description}</p>
                            <p><strong>Prioridade</strong>: {list.priority}</p>
                            <p><strong>Criado por</strong>: {list.createdBy}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}