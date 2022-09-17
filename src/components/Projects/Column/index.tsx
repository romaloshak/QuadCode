import clsx from 'clsx';
import { useState } from 'react';

import GarbageIcon from 'src/Assets/icons/Gabage';
import PenIcon from 'src/Assets/icons/Pen';
import Plus from 'src/Assets/icons/Plus';
import PlusIcon from 'src/Assets/icons/Plus';
import Popup from 'src/components/ui/Popup';
import { IColumn } from 'src/Interfaces/IColum';
import { ITask } from 'src/Interfaces/ITask';
import { columnsTypesRu } from 'src/utils/list/columnsTypes';
import { ColumnTypeIcon } from 'src/utils/list/columnTypeIcon';
import ProjectsTask from '../Task';

const ProjectsColumn: React.FC<{
	column: IColumn;
	tasks: ITask[];
	setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
	currentTask: ITask | null;
	setCurrentTask: React.Dispatch<React.SetStateAction<ITask | null>>;
	setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;
}> = ({ column, tasks, setColumns, currentTask, setCurrentTask, setTasks }) => {
	const [addTask, setAddTask] = useState(false);
	const [taskName, setTaskName] = useState('');
	const [taskNameError, setTaskNameError] = useState(false);

	const { id, type } = column;

	const removeHandler = async () => {
		await fetch(`http://localhost:3001/columns/${column.id}`, { method: 'DELETE' })
			.then(res => res.json())
			.then(() => {
				setColumns(columns => columns.filter(stateColumn => stateColumn.type !== column.type));
			});
	};

	const addTaskHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!taskName) {
			return setTaskNameError(true);
		}
		setTaskNameError(false);
		setTaskName('');
		await fetch('http://localhost:3001/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: taskName, columnId: column.id, type: column.type }),
		})
			.then(response => response.json())
			.then(data => {
				setTasks(value => [...value, data]);
			})
			.finally(() => {
				setAddTask(false);
			});
	};

	const updateTask = async (array: ITask[], currentTaskId: number) => {
		if (currentTask) {
			await fetch(`http://localhost:3001/tasks/${currentTaskId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...currentTask, type, columnId: id }),
			})
				.then(response => response.json())
				.then(() => {
					setTasks(array.filter((a, i) => array.findIndex(s => a.id === s.id) === i));
				})
				.catch(err => console.log(err));
		}
	};

	const DragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.currentTarget.className.includes('card')) {
			e.currentTarget.classList.add('bg-[#e8e6e6]');
		}
	};
	const DropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
		const columnTasks = tasks.filter(taskEl => taskEl.columnId === column.id);
		if (currentTask) {
			columnTasks.splice(0, 0, { ...currentTask, columnId: id, type });
			const arr = [...columnTasks, ...tasks];
			updateTask(arr, currentTask.id);
		}
	};

	return (
		<div
			className='grow shrink basis-0 flex flex-col gap-y-[10px]'
			onDragOver={DragOverHandler}
			onDrop={DropHandler}
		>
			<div className='flex justify-between'>
				<div className='flex gap-x-2'>
					{ColumnTypeIcon(column.type)}
					{columnsTypesRu(column.type)}
				</div>
				<div className='flex gap-x-2'>
					<button>
						<PenIcon />
					</button>
					<button onClick={removeHandler}>
						<GarbageIcon />
					</button>
				</div>
			</div>
			{tasks
				.filter(task => task.columnId === column.id)
				.map(task => {
					return (
						<ProjectsTask
							key={task.id}
							task={task}
							currentTask={currentTask}
							setCurrentTask={setCurrentTask}
							tasks={tasks}
							setTasks={setTasks}
						/>
					);
				})}

			<div className='flex justify-center'>
				<button
					className='w-8 h-8 bg-text-light_blue flex justify-center items-center'
					onClick={() => {
						setAddTask(true);
					}}
				>
					<PlusIcon />
				</button>
			</div>
			{addTask && (
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
			)}
		</div>
	);
};

export default ProjectsColumn;
