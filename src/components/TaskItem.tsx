import React, { FC, memo } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { Task } from '../types/types'
import { useAppDispatch } from '../app/hooks'
import { setEditedTask } from '../slices/appSlice'
import { useMutateTask } from '../hooks/useMutateTask'
import './TaskItem.css'

const TaskItemMemo: FC<
  Task & {
    setId: React.Dispatch<React.SetStateAction<string>>
  }
> = ({ id, title, description, setId }) => {
  const dispatch = useAppDispatch()
  const { deleteTaskMutation } = useMutateTask()
  return (
    <li>
      <span className="taskitem-list fusen " onClick={() => setId(id)}>
        {title}
      </span>
      <div className="taskitem-list-content ">
        <PencilAltIcon
          className="taskitem-icon"
          onClick={() => {
            dispatch(
              setEditedTask({
                id: id,
                title: title,
                description: description,
              })
            )
          }}
        />
        <TrashIcon
          className="taskitem-icon"
          onClick={() => {
            deleteTaskMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}
export const TaskItem = memo(TaskItemMemo)
