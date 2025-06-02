import './Main.css'
import './Main-media.css'
import { ConcludedTasks } from '../concludedTasks/ConcludedTasks';
import { OpenTasks } from '../OpenTasks/OpenTasks';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAuth } from '../../Hooks/useAuthentication';

export const Main = () => {
  const [visible, setVisible] = useState('pendent');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [showMenu, setShowMenu] = useState(false);

  const { user } = useAuth()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);
    setShowMenu(false)
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <div className='mainMenu'>
      <div className='divMainMenu'>
        <div className='divMenuOptions'>
          {isMobile && (
            <button className={showMenu ? 'hamburgerBtnOpen' : 'hamburgerBtnClosed'} onClick={() => setShowMenu(!showMenu)}>
              <GiHamburgerMenu size={30} />
            </button>
          )}
          {(showMenu || !isMobile) && (
            <motion.div
              className='menuOptions'
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
            >
              <button onClick={() => { setVisible('pendent'); setShowMenu(false); }}>Tarefas pendentes</button>
              <button onClick={() => { setVisible('concluded'); setShowMenu(false); }}>Tarefas concluídas</button>
              <Link to={user ? '/createtask' : '/protectedRoute'}>
                <button onClick={() => setShowMenu(false)}>Criar tarefa</button>
              </Link>
            </motion.div>
          )}
        </div>

        <div className={showMenu ? 'menuTasksBlocked' : 'optionChoosed'}>
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
    </div>
  );
};

