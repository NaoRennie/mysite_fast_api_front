import { FC } from 'react'
import { LogoutIcon } from '@heroicons/react/solid'
import { ShieldCheckIcon } from '@heroicons/react/outline'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setEditedTask, selectTask } from '../slices/appSlice'
import { useProcessAuth } from '../hooks/useProcessAuth'
import { useProcessTask } from '../hooks/useProcessTask'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { useQueryUser } from '../hooks/useQueryUser'
import { TaskItem } from './TaskItem'
import './Todo.css'

export const Todo: FC = () => {
  const { logout } = useProcessAuth()
  const { data: dataUser } = useQueryUser()
  const { data: dataTasks, isLoading: isLoadingTasks } = useQueryTasks()
  const dispatch = useAppDispatch()
  const editedTask = useAppSelector(selectTask)
  return (
    <div className="todo-content">
      <div className="todo-title">
        <ShieldCheckIcon className="todo-icon" />
        <span className="text-center text-3xl font-extrabold">Todo tasks</span>
      </div>
      <p className="todo-user-info">{dataUser?.username}</p>
      <p className="todo-user-info">{dataUser?.birthday}</p>
      <img src={dataUser?.avatar} alt={dataUser?.username} />

      <LogoutIcon onClick={logout} className="todo-icon" />
    </div>
  )
}
