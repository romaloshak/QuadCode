import clsx from 'clsx';
import { useState } from 'react';
import Plus from 'src/Assets/icons/Plus';

import Popup from 'src/components/ui/Popup';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { IColumn } from 'src/Interfaces/IColum';
import { fetchUpdateColumns } from 'src/store/Reducers/ColumnsSlice';
import { disabledOption } from 'src/utils/disabletColumn';
import { columnsTypes } from 'src/utils/list/columnsTypes';
interface IChangeColumnPopup {
	setChangeColumn: React.Dispatch<React.SetStateAction<boolean>>;
	column: IColumn;
}

const ChangeColumnPopup: React.FC<IChangeColumnPopup> = ({ setChangeColumn, column }) => {
	const { type, id } = column;
	const [columnOption, setColumnOption] = useState(String(type));
	const dispatch = useAppDispatch();
	const columns = useAppSelector(state => state.columns.columns);
	const updateColumnHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(fetchUpdateColumns({ columnId: id, type: columnOption })).finally(() => {
			setChangeColumn(false);
		});
	};
	return (
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
								<option key={type.id} value={type.id} disabled={disabledOption(type.id, columns)}>
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
	);
};

export default ChangeColumnPopup;
