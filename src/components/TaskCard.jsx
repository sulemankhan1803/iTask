import React from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BsCheckCircleFill, BsClockFill } from "react-icons/bs"; // Icons for status
import { FiCalendar } from "react-icons/fi"; // Icon for due date

const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <div className="bg-violet-100 p-4 rounded-xl shadow flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4 flex-grow">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="accent-violet-700"
        />

        <div>
          <div className="font-bold text-lg line-clamp-1">{task.title}</div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <FiCalendar /> Due: {task.dueDate}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1
          ${task.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
            }`}
        >
          {task.completed ? <BsCheckCircleFill /> : <BsClockFill />}
          {task.completed ? 'Completed' : 'Pending'}
        </span>

        <button
          onClick={() => onEdit(task)}
          className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm text-white rounded-md"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm text-white rounded-md"
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
