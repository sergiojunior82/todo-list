import styles from './Task.module.css';
import { Trash } from 'phosphor-react';

import checkOn from '../assets/check-on.svg';
import checkOff from '../assets/check-off.svg';
import { Todo } from '../types/types';

interface TaskProps {
  id: number;
  description: string;
  finished: boolean;
  onFinishTask: (task: Todo) => void;
  onDeleteTask: (task: Todo) => void;
}

export function Task({ id, description, finished, onFinishTask, onDeleteTask }: TaskProps) {

  function handleFinishTask(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const task: Todo = {id, description, finished};
    onFinishTask(task);
  }

  function handleDeleteTask(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const task: Todo = {id, description, finished};
    onDeleteTask(task);
    
  }

  return (
    <div className={styles.wrapperTask}>
      <div className={styles.imageContainer}>
        <button onClick={handleFinishTask} className={styles.check} title='Tarefa Realizada'>
        <img src={finished ? checkOn : checkOff} />
        </button>
      </div>
        <div className={`${styles.text} ${finished ? styles.taskFinished : ''}`}>
          <p className={finished ? styles.taskFinished : ''}>{description}</p>
        </div>
      <div className={styles.imageContainer}>
        <button onClick={handleDeleteTask} className={styles.trash}>
          <Trash size={22} />
        </button>
      </div>
    </div>
  )
}