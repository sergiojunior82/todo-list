import styles from './Main.module.css';

import plusIcon from '../assets/plus-icon.svg';
import boardIcon from "../assets/board-icon.svg";
import { Task } from './Task';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from '../types/types';

export function Main() {

  const [tasks, setTasks] = useState<Todo[]>([]);

  //const [id, setId] = useState(0);
  const [description, setDescription] = useState('');
  const [finished, setFinished] = useState(false);
  const [id, setId] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
 
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      description: description,
      finished: finished
    }

    setTasks([...tasks, newTask]);
    setDescription('');
    setFinished(false);
    setId(0);
  
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setDescription(event.target.value);
  }

  function finishTask(taskToFinish: Todo) {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskToFinish.id) {
        if(task.finished === false) {
          return { ...task, finished: true };
        } else {
          return { ...task, finished: false };
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(taskToDelete: Todo) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id != taskToDelete.id;
    })
    setTasks(tasksWithoutDeletedOne);
  }

  const isNewTaskEmpty = description.length == 0;


  return (
    <div className={styles.wrapperMain}>
      <form onSubmit={handleCreateNewTask}>
        <div className={styles.wrapperInput}>
          <input 
            type="text" 
            name='task'
            placeholder='Adicione uma nova tarefa'
            onChange={handleNewTaskChange}
            value={description}
          />
          <button disabled={isNewTaskEmpty} type='submit'>
            Criar
            <img src={plusIcon} alt="Icone do botão +" />
          </button>
        </div>
        <div className={styles.wrapperTasks}>
          <div className={styles.tasksDetails}>
            <div className={styles.tasksCreated}>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>
            <div className={styles.tasksDone}>
              <p>Concluídas</p>
              <span>{tasks.filter(task => task.finished).length} de {tasks.length}</span>
            </div>
          </div>
          <div className={`${styles.tasksList} ${tasks.length !== 0 ? styles.taskListDisabled : ''}`}>
            {tasks.length === 0 && (
              <div className={styles.noTasks}>
                <img src={boardIcon} alt="Icone de planilha" />
                <p>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
          )}
            {tasks.map(task => {
              return <Task 
                key={task.id}
                description={task.description}
                finished={task.finished}
                id={task.id}
                onFinishTask={finishTask}
                onDeleteTask={deleteTask}
                />
            })}
          </div>   
        </div>
      </form>
    </div>
  )
}