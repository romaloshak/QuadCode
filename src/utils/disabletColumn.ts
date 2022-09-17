import { IColumn } from 'src/Interfaces/IColum';
import { ColumnsType } from './list/columnsTypes';

export const disabledOption = (type: ColumnsType, columns: IColumn[]) =>
	columns.map(column => column.type).includes(type);
