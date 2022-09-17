import clsx from 'clsx';
import { useState } from 'react';

import GarbageIcon from 'src/Assets/icons/Gabage';
import PenIcon from 'src/Assets/icons/Pen';
import Plus from 'src/Assets/icons/Plus';
import PlusIcon from 'src/Assets/icons/Plus';
import Popup from 'src/components/ui/Popup';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { IColumn } from 'src/Interfaces/IColum';
import { ITask } from 'src/Interfaces/ITask';
import { fetchRemoveColumns, fetchUpdateColumns } from 'src/store/Reducers/ColumnsSlice';
import { setTasks } from 'src/store/Reducers/TasksSlice';
import { disabledOption } from 'src/utils/disabletColumn';
import { columnsTypes, columnsTypesRu } from 'src/utils/list/columnsTypes';
import { ColumnTypeIcon } from 'src/utils/list/columnTypeIcon';
import ColumnTask from '../Task';
import AddTaskPopup from '../Task/AddTaskPopup';

interface IProcessColumn {
	column: IColumn;
}

const ProcessColumn: React.FC<IProcessColumn> = ({ column }) => {
	const dispatch = useAppDispatch();

	const columns = useAppSelector(state => state.columns.columns);
	const tasks = useAppSelector(state => state.tasks.tasks);
	const dragTask = useAppSelector(state => state.drugTask.drugTask);

	const [addTask, setAddTask] = useState(false);
	const [columnOption, setColumnOption] = useState(String(column.type));
	const [changeColumn, setChangeColumn] = useState(false);

	const { id } = column;

	const removeHandler = () => {
		dispatch(fetchRemoveColumns(column.id));
	};

	const updateColumnHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(fetchUpdateColumns({ columnId: column.id, type: columnOption })).finally(() => {
			setChangeColumn(false);
		});
	};

	const updateTask = async (array: ITask[], dragTaskId: number) => {
		if (dragTask) {
			await fetch(`http://localhost:3001/tasks/${dragTaskId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...dragTask, columnId: id }),
			})
				.then(response => response.json())
				.then(() => {
					dispatch(setTasks(array.filter((a, i) => array.findIndex(s => a.id === s.id) === i)));
				})
				.catch(err => console.log(err));
		}
	};

	const DragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const DropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
		const columnTasks = tasks.filter(taskEl => taskEl.columnId === column.id);
		if (dragTask) {
			columnTasks.splice(0, 0, { ...dragTask, columnId: id });
			const arr = [...columnTasks, ...tasks];
			updateTask(arr, dragTask.id);
		}
	};

	return (
		<div
			className='grow shrink basis-0 flex flex-col gap-y-[10px] rounded column'
			onDragOver={DragOverHandler}
			onDrop={DropHandler}
		>
			<div className='flex justify-between sticky top-1 bg-white z-20'>
				<div className='flex gap-x-2'>
					{ColumnTypeIcon(column.type)}
					{columnsTypesRu(column.type)}
				</div>
				<div className='flex gap-x-2'>
					<button
						onClick={() => {
							setChangeColumn(true);
						}}
					>
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
					return <ColumnTask key={task.id} task={task} />;
				})}

			<div className='flex justify-center'>
				<button
					className='w-8 h-8 bg-[#D0D0D0] hover:bg-text-light_blue flex justify-center items-center'
					onClick={() => {
						setAddTask(true);
					}}
				>
					<PlusIcon />
				</button>
			</div>
			{addTask && <AddTaskPopup setAddTask={setAddTask} columnId={column.id} />}
			{changeColumn && (
				<Popup setShowPopup={setChangeColumn} popupClassName='top-1/4'>
					<form
						className='rounded bg-white py-10 px-20 w-[450px] flex flex-col gap-y-6'
						onSubmit={updateColumnHandler}
					>
						<div className='flex justify-between items-center'>
							<span className='text-base leading-4 font-medium'>Редактрование столбца</span>
							<button
								className='rotate-45'
								onClick={() => {
									setChangeColumn(false);
								}}
							>
								<Plus color='text-primary' />
							</button>
						</div>

						<div className='flex flex-col gap-y-1'>
							<label htmlFor='column-type' className='text-xs text-gray-400'>
								Тип столбца:
							</label>
							<div className='flex flex-col'>
								<select
									name='column-type'
									className={clsx('border text-sm bg-white rounded p-2')}
									value={columnOption}
									onChange={({ target: { value } }) => {
										setColumnOption(value);
									}}
								>
									{columnsTypes.map(type => (
										<option
											key={type.id}
											value={type.id}
											disabled={disabledOption(type.id, columns)}
										>
											{type.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='flex justify-end'>
							<button className='btn-primary' type='submit'>
								Сохранить
							</button>
						</div>
					</form>
				</Popup>
			)}
		</div>
	);
};

export default ProcessColumn;
