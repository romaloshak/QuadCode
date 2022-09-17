import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ITask } from 'src/Interfaces/ITask';

export interface DrugTaskState {
	drugTask: ITask | null;
}

const initialState: DrugTaskState = {
	drugTask: null,
};

export const DragTaskSlice = createSlice({
	name: 'drugTask',
	initialState,
	reducers: {
		setDrugTask: (state, action: PayloadAction<ITask | null>) => {
			state.drugTask = action.payload;
		},
	},
});

export const { setDrugTask } = DragTaskSlice.actions;

export default DragTaskSlice.reducer;
