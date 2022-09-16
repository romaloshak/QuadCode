import GarbageIcon from 'src/Assets/icons/Gabage';
import PenIcon from 'src/Assets/icons/Pen';
import { IColumn } from 'src/Interfaces/IColum';
import { columnsTypesRu } from 'src/utils/list/columnsTypes';
import { ColumnTypeIcon } from 'src/utils/list/columnTypeIcon';

const ProjectsColumn: React.FC<{
	column: IColumn;
	setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;
}> = ({ column, setColumns }) => {
	const removeHandler = async () => {
		await fetch(`http://localhost:3001/columns/${column.id}`, { method: 'DELETE' })
			.then(res => res.json())
			.then(res => {
				setColumns(columns => columns.filter(stateColumn => stateColumn.type !== column.type));
			});
	};
	return (
		<div className='grow shrink-0 basis-auto flex flex-col'>
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
		</div>
	);
};

export default ProjectsColumn;
