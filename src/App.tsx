import { useEffect, useState } from 'react';
import clsx from 'clsx';

import Plus from './Assets/icons/Plus';
import WavesIcon from './Assets/icons/Waves';
import MainLayout from './components/Layout';
import ProjectsColumn from './components/Projects/Column';
import Popup from './components/ui/Popup';
import { IColumn } from './Interfaces/IColum';
import './styles/index.css';
import { columnsTypes, ColumnsType } from './utils/list/columnsTypes';
import { ITask } from './Interfaces/ITask';

function App() {
	const [columns, setColumns] = useState<IColumn[]>([]);
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [showAddColumPopup, setShowAddColumPopup] = useState(false);
	const [columnOption, setColumnOption] = useState('');
	const [columnOptionError, setColumnOptionError] = useState('');
	const [currentTask, setCurrentTask] = useState<ITask | null>(null);

	const disabledOption = (type: ColumnsType) => columns.map(column => column.type).includes(type);

	const addColumnHandler = async () => {
		if (!columnOption) {
			setColumnOptionError('Обязательное поле');
			return;
		}
		setColumnOption('');
		setColumnOptionError('');
		await fetch('http://localhost:3001/columns', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ type: columnOption }),
		})
			.then(response => response.json())
			.then(data => {
				setColumns(value => [...value, data]);
			})
			.then(() => {
				setShowAddColumPopup(false);
			});
	};

	useEffect(() => {
		fetch('http://localhost:3001/columns')
			.then(res => res.json())
			.then(res => setColumns(res));
	}, []);

	useEffect(() => {
		fetch(`http://localhost:3001/tasks`, { method: 'GET' })
			.then(res => res.json())
			.then(res => setTasks(res));
	}, []);

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
					<ProjectsColumn
						key={column.id}
						column={column}
						tasks={tasks}
						setTasks={setTasks}
						setColumns={setColumns}
						currentTask={currentTask}
						setCurrentTask={setCurrentTask}
					/>
				))}
			</div>
			{showAddColumPopup && (
				<Popup setShowPopup={setShowAddColumPopup} popupClassName='top-1/4'>
					<div className='rounded bg-white py-10 px-20 w-[450px] flex flex-col gap-y-6'>
						<div className='flex justify-between items-center'>
							<span className='text-base leading-4 font-medium'>Новый столбец</span>
							<button
								className='rotate-45'
								onClick={() => {
									setShowAddColumPopup(false);
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
									className={clsx(
										'border text-sm bg-white rounded p-2',
										columnOptionError ? 'border-red-400' : '',
									)}
									value={columnOption}
									onChange={({ target: { value } }) => {
										setColumnOption(value);
									}}
								>
									<option value={''} disabled>
										Выберите тип
									</option>
									{columnsTypes.map(type => (
										<option key={type.id} value={type.id} disabled={disabledOption(type.id)}>
											{type.name}
										</option>
									))}
								</select>
								{columnOptionError ? (
									<span className='text-xs text-red-400'>{columnOptionError}</span>
								) : null}
							</div>
						</div>
						<div className='flex justify-end'>
							<button className='btn-primary' onClick={addColumnHandler}>
								Добавить
							</button>
						</div>
					</div>
				</Popup>
			)}
		</MainLayout>
	);
}

export default App;
