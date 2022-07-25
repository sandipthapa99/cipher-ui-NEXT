import { UserTaskCard } from '@components/Task/UserTaskCard/UserTaskCard'
import { Task } from 'types/tasks'

export interface Props {
  tasks: Task[]
}
export const UserTaskCardList = ({ tasks }: Props) => {
  const renderTaskList = () => {
    return tasks.map(task => <UserTaskCard task={task} key={task.id} />)
  }
  return (
    <div className='user-task-card-list'>
      <p>{tasks.length} Tasker in Kathmandu,Bagmati Nepal (1 new)</p>
      {renderTaskList()}
    </div>
  )
}
