import { useState } from 'react';

import GarbageIcon from 'src/Assets/icons/Gabage';
import PenIcon from 'src/Assets/icons/Pen';
import PlusIcon from 'src/Assets/icons/Plus';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { IColumn } from 'src/Interfaces/IColum';
import { fetchRemoveColumns } from 'src/store/Reducers/ColumnsSlice';
import { fetchUpdateTasks } from 'src/store/Reducers/TasksSlice';
import { columnsTypesRu } from 'src/utils/list/columnsTypes';
import { ColumnTypeIcon } from 'src/utils/list/columnTypeIcon';
import ColumnTask from '../Task';
import AddTaskPopup from '../Task/AddTaskPopup';
import ChangeColumnPopup from './ChangeColumnPopup';

interface IProcessColumn {
	column: IColumn;
}

const ProcessColumn: React.FC<IProcessColumn> = ({ column }) => {
	const dispatch = useAppDispatch();

	const tasks = useAppSelector(state => state.tasks.tasks);
	const dragTask = useAppSelector(state => state.drugTask.drugTask);

	const [addTask, setAddTask] = useState(false);
	const [changeColumn, setChangeColumn] = useState(false);

	const { id } = column;

	const removeHandler = () => {
		dispatch(fetchRemoveColumns(column.id));
	};

	const DragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const DropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
		if (dragTask) {
			dispatch(fetchUpdateTasks({ dragTask, columnId: id, dropIndex: 0 }));
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
				.sort((a, b) => {
					if (a.order === 0 || b.order === 0) return -1;
					return a.order - b.order;
				})
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
			{changeColumn && <ChangeColumnPopup column={column} setChangeColumn={setChangeColumn} />}
		</div>
	);
};

export default ProcessColumn;
