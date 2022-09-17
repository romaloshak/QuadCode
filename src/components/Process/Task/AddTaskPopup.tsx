import { useState } from 'react';
import { clsx } from 'clsx';

import Plus from 'src/Assets/icons/Plus';
import Popup from 'src/components/ui/Popup';
import { useAppDispatch } from 'src/hooks/reduxHooks';
import { fetchAddTasks } from 'src/store/Reducers/TasksSlice';

interface IAddTaskPopup {
	setAddTask: (value: boolean) => void;
	columnId: number;
}

const AddTaskPopup: React.FC<IAddTaskPopup> = ({ columnId, setAddTask }) => {
	const [taskName, setTaskName] = useState('');
	const [taskNameError, setTaskNameError] = useState(false);

	const dispatch = useAppDispatch();

	const addTaskHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!taskName) {
			return setTaskNameError(true);
		}
		setTaskNameError(false);
		setTaskName('');
		dispatch(fetchAddTasks({ name: taskName, columnId })).finally(() => {
			setAddTask(false);
		});
	};
	return (
		<Popup setShowPopup={setAddTask} popupClassName='top-1/4'>
			<form
				className='rounded bg-white py-10 px-20 w-[450px] flex flex-col gap-y-6'
				onSubmit={addTaskHandler}
			>
				<div className='flex justify-between items-center'>
					<span className='text-base leading-4 font-medium'>Новая задача</span>
					<button
						type='button'
						className='rotate-45'
						onClick={() => {
							setAddTask(false);
						}}
					>
						<Plus color='text-primary' />
					</button>
				</div>

				<div className='flex flex-col gap-y-1'>
					<label htmlFor='column-type' className='text-xs text-gray-400'>
						Название
					</label>
					<div className='flex flex-col'>
						<input
							type='text'
							className={clsx(
								'peer border text-sm bg-white rounded p-2',
								taskNameError ? 'border-red-400' : '',
							)}
							value={taskName}
							onChange={({ target: { value } }) => setTaskName(value)}
						/>
						{taskNameError && <span className='text-xs text-red-400'>Обязательное поле</span>}
					</div>
				</div>
				<div className='flex justify-end'>
					<button className='btn-primary' type='submit'>
						Добавить
					</button>
				</div>
			</form>
		</Popup>
	);
};

export default AddTaskPopup;
