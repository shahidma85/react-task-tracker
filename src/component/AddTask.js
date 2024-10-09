import { useState } from 'react';

const AddTask = ({ addTask }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState('');

    const submitTask = (e) => {
        e.preventDefault();
        if (!text) {
            alert('please enter text');
            return;
        }
        const newTask = { text, day, reminder };
        addTask(newTask);
        setText('');
        setDay('');
        setReminder(false);
    }
    return (
        <form onSubmit={submitTask}>
            <div className='form-control'>
                <label> Add Task </label>
                <input type='text' placeholder='Enter Task'
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label> Day & Time </label>
                <input type='text' placeholder='Enter Day and Time'
                    value={day}
                    onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label> Reminder </label>
                <input type='checkbox'
                    value={reminder}
                    checked={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>
            <button type="submit" className='btn btn-block'> Save Task </button>
        </form>
    )
}

export default AddTask;