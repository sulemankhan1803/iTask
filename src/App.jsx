import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskCard from './components/TaskCard';
import Navbar from './components/Navbar';
import { MdOutlineAddTask } from 'react-icons/md';
import { FiList } from 'react-icons/fi';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showFinished, setShowFinished] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('tasks'));
      const taskList = saved?.tasks || [];
      setTasks(taskList);
    } catch (err) {
      console.error('Failed to parse tasks from localStorage', err);
      setTasks([]);
    }
  }, []);

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify({ tasks: newTasks }));
  };

  const saveTask = () => {
    if (!title || !dueDate || title.length < 3) return;

    const newTask = {
      id: editingId || uuidv4(),
      title,
      dueDate,
      completed: false,
    };

    const updated = editingId
      ? tasks.map((t) => (t.id === editingId ? newTask : t))
      : [...tasks, newTask];

    updateTasks(updated);
    setTitle('');
    setDueDate('');
    setEditingId(null);
  };

  const deleteTask = (id) => {
    const filtered = tasks.filter((t) => t.id !== id);
    updateTasks(filtered);
  };

  const toggleCompleted = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    updateTasks(updated);
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDueDate(task.dueDate);
    setEditingId(task.id);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-xl space-y-6">

            {/* Task Form Card */}
            <div className="bg-violet-100 border border-violet-200 p-6 rounded-2xl shadow-xl">
              <h1 className="text-xl font-bold mb-4 text-center text-violet-900">
                iTask - Manage your todos at one place
              </h1>

              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-violet-700">
                <MdOutlineAddTask /> {editingId ? 'Edit Task' : 'Add a Todo'}
              </h2>

              <input
                className="mb-3 bg-white w-full rounded-full px-5 py-2 border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="date"
                className="mb-4 bg-white w-full rounded-full px-5 py-2 border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <button
                className="bg-violet-800 hover:bg-violet-950 text-white py-2 px-4 rounded-full w-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={saveTask}
                disabled={title.length < 3}
              >
                {editingId ? 'Update Task' : 'Save Task'}
              </button>

              <div className="mt-4">
                <label className="inline-flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2 accent-violet-700"
                    checked={showFinished}
                    onChange={() => setShowFinished(!showFinished)}
                  />
                  Show Finished Tasks
                </label>
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-violet-700 flex items-center gap-2">
                <FiList /> Your Tasks
              </h2>

              {tasks
                .filter((t) => showFinished || !t.completed)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={editTask}
                    onDelete={deleteTask}
                    onToggle={toggleCompleted}
                  />
                ))}

              {tasks.length === 0 && (
                <p className="text-gray-500 text-center text-sm mt-4">
                  No tasks yet. Add one above!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
