import './Main.css'
import { useAuth } from '../../Hooks/useAuthentication';
import { Link } from 'react-router-dom';
import { ConcludedTasks } from '../concludedTasks/ConcludedTasks';
import { OpenTasks } from '../OpenTasks/OpenTasks';
import { useState } from 'react';
import { motion ,AnimatePresence } from 'framer-motion';

export const Main = () => {

    const { user } = useAuth()

    const [visible, setVisible] = useState('pendent')

    return (
        <div className='mainMenu'>
            <div className='divMainMenu'>
                <div className='menuOptions'>
                    <button onClick={() => setVisible('pendent')}>Tarefas pendentes</button>
                    <button onClick={() => setVisible('concluded')}>Tarefas concluídas</button>
                    <Link to={user ? '/createtask' : '/protectedRoute'}>
                        <button>Criar tarefa</button>
                    </Link>

                </div>
                <div className='optionChoosed'>
                    <AnimatePresence mode="wait">
                        {visible === "pendent" && (
                            <motion.div
                                key="pendent"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className='divAnimation'
                            >
                                <OpenTasks />
                            </motion.div>
                        )}

                        {visible === "concluded" && (
                            <motion.div
                                key="concluded"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className='divAnimation'
                            >
                            <ConcludedTasks />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* <div>
                <Link to={user ? '/createtask' : '/protectedRoute'}>
                    <button className='btnCreateTask'>Criar tarefa</button>
                </Link>
            </div> */}
        </div>
    )
}