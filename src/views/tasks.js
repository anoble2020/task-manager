import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { MoreVertical, PlusCircle, Search, Eye, Edit, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import './list.css';
import { insertTask, fetchTasks, fetchProjects } from '../db.js';
import { showToast } from '../toast.js';

const RowMenu = ({ taskId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (event.target.closest('.row-menu') === null) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative row-menu">
      <button onClick={toggleMenu}>
        <MoreVertical color="black" size={30} className="h-3" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Eye className="mr-2" size={16} />
              View
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Edit className="mr-2" size={16} />
              Edit
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <Trash className="mr-2" size={16} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Tasks = (props) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskTargetDate, setTaskTargetDate] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskProject, setTaskProject] = useState('');
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);

    const modalVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
        };

    const modalTransition = {
        ease: "easeOut", duration: 2
        /*type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.5*/
    };

    const headerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    useEffect(() => {
        const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTasks(filtered);
    }, [searchQuery, tasks]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                setIsLoading(true);
                const fetchedTasks = await fetchTasks();
                setTasks(fetchedTasks);
                setFilteredTasks(fetchedTasks);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        getTasks();
    }, []);

    const openModal = async () => {
        try {
            const fetchedProjects = await fetchProjects();
            setProjects(fetchedProjects);
            setModalIsOpen(true);
        } catch (error) {
            console.error('Error fetching projects:', error);
            showToast('Error fetching projects', 'error');
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const saveTask = async () => {
        try {
            const task = {
                title: taskTitle,
                description: taskDescription,
                target_date: taskTargetDate,
                priority: taskPriority,
                project: taskProject,
            };

            const savedTask = await insertTask(task);

            // Reset form fields
            setTaskTitle('');
            setTaskDescription('');
            setTaskTargetDate('');
            setTaskPriority('');
            setTaskProject('');

            const fetchedTasks = await fetchTasks();
            setTasks(fetchedTasks);
            closeModal();
            showToast('Task created successfully', 'success');
        } catch (error) {
            console.error('Error saving task:', error);
            showToast('Error creating Task', 'error');
        }
    };

    return (
        <div className="list-container">
            <motion.h1
                className="font-medium"
                initial="hidden"
                animate="visible"
                variants={headerVariants}
                transition={{ ease: "linear", duration: 0.8 }}>
                Tasks
                </motion.h1>
            <div className="flex items-center justify-between px-2">
                <div className="search-filter mb-4 flex items-center w-1/2">
                    <input
                    type="text"
                    placeholder="🔍  Search tasks..."
                    className="pl-10 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            <span className="flex items-center">
                    <button className="flex items-center text-black px-4 py-2 rounded hover:bg-gray-300 focus:outline-none" onClick={openModal}>
                        <PlusCircle color="black" size={16} className="mr-2" />
                        New Task
                    </button>
                </span>
            </div>
        {isLoading ? (
            <div className="flex justify-center items-center">
                <div className="spinner ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        ) : (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <table class="issues-table">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th>Task</th>
                        <th>Title</th>
                        <th>Project</th>
                        <th>Priority</th>
                        <th>Target Date</th>
                        <th>Created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task.id} className="border-b hover:bg-gray-100">
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>
                                <span className="project border-2">
                                    {task.project.name}
                                </span>
                            </td>
                            <td>
                                <span className={`priority ${task.priority.toLowerCase()}`}>
                                    {task.priority}
                                </span>
                            </td>
                            <td>{new Date(task.target_date).toLocaleDateString()}</td>
                            <td>{new Date(task.created_at).toLocaleDateString()}</td>
                            <td>
                                <RowMenu taskId={task.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </motion.div>
        )}

            {/* Modal */}
            <AnimatePresence>
            {modalIsOpen && (
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="modal-container"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={modalVariants}
                    transition={modalTransition}
                >
            <Modal
                appElement={document.getElementById('app')}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="New Task Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2 className="text-2xl font-bold mb-4">New Task</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="taskTitle"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">
                            Description:
                        </label>
                        <textarea
                            id="taskDescription"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="taskTargetDate" className="block text-sm font-medium text-gray-700">
                            Target Date:
                        </label>
                        <input
                            type="date"
                            id="taskTargetDate"
                            value={taskTargetDate}
                            onChange={(e) => setTaskTargetDate(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-700">
                            Priority:
                        </label>
                        <select
                            id="taskPriority"
                            value={taskPriority}
                            onChange={(e) => setTaskPriority(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="taskProject" className="block text-sm font-medium text-gray-700">
                            Project:
                        </label>
                        <select
                            id="taskProject"
                            value={taskProject}
                            onChange={(e) => setTaskProject(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled>Select Project</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveTask}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </div>
            </Modal>
            </motion.div>
        </motion.div>
    )}
    </AnimatePresence>
    </div>
    )
}

export default Tasks