import { useEffect, useState } from 'react';

import './styles/index.css';

import WavesIcon from './Assets/icons/Waves';
import MainLayout from './components/Layout';
import ProjectsColumn from './components/Process/Column';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { fetchColumns } from './store/Reducers/ColumnsSlice';
import { fetchTasks } from './store/Reducers/TasksSlice';
import AddColumnPopup from './components/Process/Column/AddColumnPopup';

function App() {
	const dispatch = useAppDispatch();

	const columns = useAppSelector(state => state.columns.columns);

	const [showAddColumPopup, setShowAddColumPopup] = useState(false);

	useEffect(() => {
		dispatch(fetchColumns());
		dispatch(fetchTasks());
	}, [dispatch]);

	return (
		<MainLayout>
			<div>
				<div className='flex justify-between'>
					<div className='flex gap-x-2 items-center'>
						<WavesIcon />
						<span className='text-base leading-4 font-medium'>Процессы проекта CRM - система</span>
					</div>
					<button
						className='btn-primary'
						onClick={() => {
							setShowAddColumPopup(true);
						}}
					>
						Добавить столбец
					</button>
				</div>
			</div>
			<hr className='my-4 border border-[#E9E9E9]' />
			<div className='flex gap-x-10'>
				{columns.map(column => (
					<ProjectsColumn key={column.id} column={column} />
				))}
			</div>
			{showAddColumPopup && <AddColumnPopup setShowAddColumPopup={setShowAddColumPopup} />}
		</MainLayout>
	);
}

export default App;
