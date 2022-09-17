import clsx from 'clsx';

import TaskStatusIcon from 'src/Assets/icons/TaskStatus';
import { ITask } from 'src/Interfaces/ITask';
import { ColumnsType } from 'src/utils/list/columnsTypes';

const ProjectsTask: React.FC<{
	task: ITask;
	tasks: ITask[];
	setTasks: (value: any[]) => void;
	currentTask: ITask | null;
	setCurrentTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}> = ({ tasks, setTasks, task, currentTask, setCurrentTask }) => {
	const { type, columnId } = task;
	const updateTask = async (array: ITask[], currentTaskId: number) => {
		await fetch(`http://localhost:3001/tasks/${currentTaskId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...currentTask, type, columnId }),
		})
			.then(response => response.json())
			.then(() => {
				setTasks(array.filter((a, i) => array.findIndex(s => a.id === s.id) === i));
			})
			.catch(err => console.log(err));
	};
	const DragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.currentTarget.className.includes('card')) {
			e.currentTarget.classList.add('bg-[#e8e6e6]');
		}
	};
	const DragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
		setCurrentTask(task);
	};
	const DragEndHandler = async (e: React.DragEvent<HTMLDivElement>) => {
		if (e.currentTarget.className.includes('card')) {
			e.currentTarget.classList.remove('bg-[#e8e6e6]');
		}
	};
	const DragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.currentTarget.className.includes('card')) {
			e.currentTarget.classList.remove('bg-[#e8e6e6]');
		}
	};

	const DropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.currentTarget.className.includes('card')) {
			e.currentTarget.classList.remove('bg-[#e8e6e6]');
		}
		const columnTasks = tasks.filter(taskEl => taskEl.columnId === task.columnId);
		const currentIndexInColumn = columnTasks.findIndex(taskEl => taskEl.id === currentTask?.id);
		const dropIndex = columnTasks.findIndex(colTask => colTask.id === task.id);
		if (currentTask) {
			if (task.columnId !== currentTask.columnId) {
				columnTasks.splice(dropIndex, 0, { ...currentTask, type, columnId });
				const arr = [...columnTasks, ...tasks];
				updateTask(arr, currentTask.id);
			} else {
				columnTasks.splice(currentIndexInColumn, 1);
				console.log(currentIndexInColumn, dropIndex);

				if (Math.abs(currentIndexInColumn - dropIndex) > 0) {
					columnTasks.splice(dropIndex, 0, currentTask);
				} else {
					columnTasks.splice(dropIndex + 1, 0, currentTask);
				}
				const arr = [...new Set([...columnTasks, ...tasks])];
				updateTask(arr, currentTask.id);
			}
		}
	};

	return (
		<div
			className={clsx('flex rounded bg-[#F5F5F5] card')}
			onDragStart={DragStartHandler}
			onDragLeave={DragLeaveHandler}
			onDragEnd={DragEndHandler}
			onDragOver={DragOverHandler}
			onDrop={DropHandler}
			draggable={true}
		>
			<div className='bg-[#EFEFEF] grow-[1] p-4 flex flex-col items-center relative'>
				<span className='h-8 w-8 rounded-full bg-white'></span>
				<span className='h-8 w-8 rounded-full bg-slate-500 absolute top-8'></span>
				<span className='mt-8'>
					<TaskStatusIcon />
				</span>
			</div>
			<div
				className={clsx(
					'grow-[3.5] px-3 py-4 text-[13px] leading-[18px]',
					task.type === ColumnsType.DONE ? 'line-through opacity-50' : '',
				)}
			>
				<span className='font-normal text-[#3D4044]'>#{task.id}:</span>
				<span className='font-medium text-[#3E65BE]'>{task.name}</span>
			</div>
		</div>
	);
};

export default ProjectsTask;
