import { FC } from 'react'
import { LogoutIcon } from '@heroicons/react/solid'
import { useProcessAuth } from '../hooks/useProcessAuth'
import './Todo.css'

export const Todo: FC = () => {
  const { logout } = useProcessAuth()
  return (
    <div className="todo-content">
      <LogoutIcon onClick={logout} className="todo-icon" />
    </div>
  )
}
