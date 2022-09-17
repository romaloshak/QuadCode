import { ColumnsType } from 'src/utils/list/columnsTypes';

export interface ITask {
	id: number;
	name: string;
	columnId: number;
	type: ColumnsType;
}
