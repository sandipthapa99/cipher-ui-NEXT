import Image from 'next/image'
import { taskActionCardContent } from 'staticData/taskActionCardContent'
import TaskActionCard from './TaskActionCard'

const GettingStarted = () => {
  return (
    <div className="card-block">
      <div className="top-container">
        <h1>Getting Started</h1>
        <p>10% done - greate Work!</p>
      </div>
      <div className="task-cotainer">
        {taskActionCardContent &&
          taskActionCardContent.map((task) => (
            <TaskActionCard title={task.title} image={task.image} />
          ))}
      </div>
    </div>
  )
}
export default GettingStarted
