import clsx from 'clsx';

import TaskStatusIcon from 'src/Assets/icons/TaskStatus';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { ITask } from 'src/Interfaces/ITask';
import { setDrugTask } from 'src/store/Reducers/DragTask';
import { fetchUpdateTasks } from 'src/store/Reducers/TasksSlice';
import { isSelectedColumnDone } from 'src/store/Selecors/columnSelectors';

interface IColumnTask {
	task: ITask;
}

const ColumnTask: React.FC<IColumnTask> = ({ task }) => {
	const { columnId } = task;

	const dispatch = useAppDispatch();

	const dragTask = useAppSelector(state => state.drugTask.drugTask);
	const tasks = useAppSelector(state => state.tasks.tasks);
	const isColumnDone = useAppSelector(isSelectedColumnDone(columnId));

	const updateTask = async (dragTask: ITask, columnId: number, dropIndex: number) => {
		if (dragTask) {
			dispatch(fetchUpdateTasks({ dragTask, columnId, dropIndex }));
		}
	};

	const DragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.currentTarget.className.includes('card')) {
			e.currentTarget.style.backgroundColor = '#e8e6e6';
		}
	};
	const DragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
		dispatch(setDrugTask(task));
	};
	const DragEndHandler = async (e: React.DragEvent<HTMLDivElement>) => {
		if (e.currentTarget.className.includes('card')) {
			e.currentTarget.style.backgroundColor = '';
		}
	};
	const DragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.currentTarget.className.includes('card')) {
			e.currentTarget.style.backgroundColor = '';
		}
	};

	const DropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.currentTarget.className.includes('card')) {
			e.currentTarget.style.backgroundColor = '';
		}
		if (dragTask) {
			const columnTasks = tasks
				.filter(columnTask => columnTask.columnId === columnId)
				.sort((a, b) => {
					if (a.order === 0 || b.order === 0) return -1;
					return a.order - b.order;
				});
			const dragIndex = columnTasks.indexOf(dragTask);
			const dropIndex = columnTasks.indexOf(task);
			updateTask(dragTask, task.columnId, dropIndex);
			if (task.columnId === dragTask.columnId) {
				updateTask(task, dragTask.columnId, dragIndex);
			}
		}
	};

	return (
		<div
			className={clsx('flex rounded flex-shrink-0 basis-0 bg-[#F5F5F5] card')}
			onDragStart={DragStartHandler}
			onDragLeave={DragLeaveHandler}
			onDragEnd={DragEndHandler}
			onDragOver={DragOverHandler}
			onDrop={DropHandler}
			draggable={true}
		>
			<div className='bg-[#EFEFEF] w-1/4 p-4 flex flex-col items-center relative'>
				<span className='h-8 w-8 rounded-full bg-white'></span>
				<span className='h-8 w-8 rounded-full bg-slate-500 absolute top-8'></span>
				<span className='mt-8'>
					<TaskStatusIcon />
				</span>
			</div>
			<div
				className={clsx(
					'w-3/4 px-3 py-4 text-[13px] leading-[18px] break-all',
					isColumnDone ? 'line-through opacity-50' : '',
				)}
			>
				<span className='font-normal text-[#3D4044]'>#{task.id}:</span>
				<span className='font-medium text-[#3E65BE]'>{task.name}</span>
			</div>
		</div>
	);
};

export default ColumnTask;
