import { FC, useState } from 'react'
import { LogoutIcon } from '@heroicons/react/outline'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setEditedTask, selectTask } from '../slices/appSlice'
import { useProcessAuth } from '../hooks/useProcessAuth'
import { useProcessTask } from '../hooks/useProcessTask'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { useQueryUser } from '../hooks/useQueryUser'
import { useQuerySingleTask } from '../hooks/useQuerySingleTask'
import { TaskItem } from './TaskItem'
import './Todo.css'

export const Todo: FC = () => {
  const [id, setId] = useState('')
  const { logout } = useProcessAuth()
  const { data: dataUser } = useQueryUser()
  const { data: dataTasks, isLoading: isLoadingTasks } = useQueryTasks()
  const { data: dataSingleTask, isLoading: isLoadingTask } =
    useQuerySingleTask(id)
  const { processTask } = useProcessTask()
  const dispatch = useAppDispatch()
  const editedTask = useAppSelector(selectTask)

  console.log(dataUser, 'this is userdate')
  return (
    <div className="todo-content">
      <div className="todo-title">
        <ShieldCheckIcon className="todo-icon" />
        <span className="text-center text-3xl font-extrabold">
          {dataUser?.username}'s Todo Tasks
        </span>
      </div>
      <div className="todo-user-info">
        <img src={dataUser?.avatar} alt={dataUser?.username} />
        <p>
          <span>user name:</span>
          {dataUser?.username}
        </p>
        <p>
          <span>birthday:</span>
          {dataUser?.birthday}
        </p>
        <LogoutIcon onClick={logout} className="todo-icon" />
      </div>
      <form onSubmit={processTask}>
        <input
          className="todo-input"
          placeholder="title ?"
          type="text"
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
          value={editedTask.title}
        />
        <input
          className="todo-input"
          placeholder="description ?"
          type="text"
          onChange={(e) =>
            dispatch(
              setEditedTask({ ...editedTask, description: e.target.value })
            )
          }
          value={editedTask.description}
        />
        <button
          className="todo-button"
          disabled={!editedTask.title || !editedTask.description}
        >
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
      <div className="todo-list">
        {isLoadingTasks ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p className="todo-title-text">Todo List</p>
            <ul className="todo-ul">
              {dataTasks?.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  setId={setId}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
      <h2 className="todo-title-text">Selected Task</h2>
      {isLoadingTask && <p>Loading...</p>}
      <div className="kakomi-tab2">
        <p className="todo-p-text title-tab2">{dataSingleTask?.title}</p>
        <p className="todo-p-text">{dataSingleTask?.description}</p>
      </div>
    </div>
  )
}
