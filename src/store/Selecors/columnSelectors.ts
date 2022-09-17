import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { ColumnsType } from 'src/utils/list/columnsTypes';
import { RootState } from '..';

const selectSelf = (state: RootState) => state;

export const isSelectedColumnDone = (columnId: number) =>
	createDraftSafeSelector(
		selectSelf,
		state =>
			state.columns.columns.find(column => column.id === columnId)?.type === ColumnsType.DONE,
	);
