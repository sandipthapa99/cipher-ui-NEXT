import {
  faCalendar,
  faClockEight,
  faLocationDot,
  faShare,
  faUserGroup,
} from "@fortawesome/pro-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TaskCardProps } from "types/taskCard"
// css for this file is done in _gettingStartedTask.scss page
const TaskCard = ({ title, charge, location, date, time }: TaskCardProps) => {
  return (
    <div className="task-applied-card-block">
      <div className="task-applied-card-block__header d-flex justify-content-between">
        <h4 className="title">{title}</h4>
        <h4 className="charge">Rs {charge}</h4>
      </div>
      <div className="task-applied-card-block__body">
        <p className="location mb-3">
          <FontAwesomeIcon icon={faLocationDot} className="svg-icon" />
          {location}
        </p>
        <div className="task-location-time d-flex">
          <span className="time me-4">
            <FontAwesomeIcon icon={faClockEight} className="svg-icon" />
            {time}
          </span>
          <span className="date">
            <FontAwesomeIcon icon={faCalendar} className="svg-icon" />
            {date}
          </span>
        </div>
        <hr className="mb-0" />
      </div>
      <div className="task-applied-card-block__footer d-flex mt-4">
        <span className="share d-flex align-items-center me-5">
          <FontAwesomeIcon icon={faShare} className="svg-icon" />
          Share
        </span>
        <span className="applicants d-flex align-items-center">
          <FontAwesomeIcon icon={faUserGroup} className="svg-icon" />
          100 Applied
        </span>
      </div>
    </div>
  )
}
export default TaskCard
