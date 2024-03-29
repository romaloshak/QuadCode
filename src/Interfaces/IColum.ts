import { ColumnsType } from 'src/utils/list/columnsTypes';
import { ITask } from './ITask';

export interface IColumn {
	id: number;
	type: ColumnsType;
	tasks: ITask[];
}
