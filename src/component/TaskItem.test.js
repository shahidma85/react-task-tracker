import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';
import { FaTimes } from 'react-icons/fa';

describe('TaskItem Component', () => {
    const task = {
        id: 1,
        text: 'Test Task',
        day: 'Feb 5th at 2:30pm',
        reminder: true,
    };

    const deleteTask = jest.fn();
    const toggleTask = jest.fn();

    test('renders task text and day', () => {
        render(<TaskItem task={task} deleteTask={deleteTask} toggleTask={toggleTask} />);
        expect(screen.getByText('Test Task')).toBeInTheDocument();
        expect(screen.getByText('Feb 5th at 2:30pm')).toBeInTheDocument();
    });

    test('applies reminder class when reminder is true', () => {
        render(<TaskItem task={task} deleteTask={deleteTask} toggleTask={toggleTask} />);
        const taskDiv = screen.getByText('Test Task').closest('div');
        expect(taskDiv).toHaveClass('reminder');
    });

    test('does not apply reminder class when reminder is false', () => {
        const taskWithoutReminder = { ...task, reminder: false };
        render(<TaskItem task={taskWithoutReminder} deleteTask={deleteTask} toggleTask={toggleTask} />);
        const taskDiv = screen.getByText('Test Task').closest('div');
        expect(taskDiv).not.toHaveClass('reminder');
    });

    test('calls deleteTask when FaTimes icon is clicked', () => {
        render(<TaskItem task={task} deleteTask={deleteTask} toggleTask={toggleTask} />);
        const deleteIcon = screen.getByRole('button');
        fireEvent.click(deleteIcon);
        expect(deleteTask).toHaveBeenCalledWith(task.id);
    });

    test('calls toggleTask when task div is double-clicked', () => {
        render(<TaskItem task={task} deleteTask={deleteTask} toggleTask={toggleTask} />);
        const taskDiv = screen.getByText('Test Task').closest('div');
        fireEvent.doubleClick(taskDiv);
        expect(toggleTask).toHaveBeenCalledWith(task.id);
    });
});