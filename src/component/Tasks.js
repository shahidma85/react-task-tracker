import TaskItem from './TaskItem';

const Tasks = ({ tasks, onDelete, toggleTask }) => {
    return (
        <>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    deleteTask={onDelete}
                    toggleTask={toggleTask} />
            ))}
        </>
    )
}

export default Tasks;