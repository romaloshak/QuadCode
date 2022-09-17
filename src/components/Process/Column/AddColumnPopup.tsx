import clsx from 'clsx';
import { useState } from 'react';

import Plus from 'src/Assets/icons/Plus';
import Popup from 'src/components/ui/Popup';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { fetchAddColumn } from 'src/store/Reducers/ColumnsSlice';
import { disabledOption } from 'src/utils/disabletColumn';
import { columnsTypes } from 'src/utils/list/columnsTypes';

interface IAddColumnPopup {
	setShowAddColumPopup: (value: boolean) => void;
}

const AddColumnPopup: React.FC<IAddColumnPopup> = ({ setShowAddColumPopup }) => {
	const dispatch = useAppDispatch();

	const columns = useAppSelector(state => state.columns.columns);

	const [columnOption, setColumnOption] = useState('');
	const [columnOptionError, setColumnOptionError] = useState('');

	const addColumnHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!columnOption) {
			setColumnOptionError('Обязательное поле');
			return;
		}
		setColumnOption('');
		setColumnOptionError('');
		dispatch(fetchAddColumn(columnOption)).finally(() => {
			setShowAddColumPopup(false);
		});
	};

	return (
		<Popup setShowPopup={setShowAddColumPopup} popupClassName='top-1/4'>
			<form
				className='rounded bg-white py-10 px-20 w-[450px] flex flex-col gap-y-6'
				onSubmit={addColumnHandler}
			>
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
								<option key={type.id} value={type.id} disabled={disabledOption(type.id, columns)}>
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
					<button className='btn-primary' type='submit'>
						Добавить
					</button>
				</div>
			</form>
		</Popup>
	);
};
export default AddColumnPopup;
