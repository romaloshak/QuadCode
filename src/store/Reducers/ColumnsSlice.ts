import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IColumn } from 'src/Interfaces/IColum';

export interface ColumnsState {
	columns: IColumn[];
}

export const fetchColumns = createAsyncThunk('columns/getColumns', async () => {
	const response = await fetch('http://localhost:3001/columns', { method: 'GET' });
	return (await response.json()) as IColumn[];
});

export const fetchAddColumn = createAsyncThunk(
	'columns/addColumn',
	async (columnOption: string) => {
		const response = await fetch('http://localhost:3001/columns', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ type: columnOption }),
		});
		return (await response.json()) as IColumn;
	},
);

export const fetchRemoveColumns = createAsyncThunk(
	'columns/removeColumns',
	async (columnId: number) => {
		await fetch(`http://localhost:3001/columns/${columnId}`, { method: 'DELETE' });
		return columnId;
	},
);

export const fetchUpdateColumns = createAsyncThunk(
	'columns/updateColumn',
	async ({ columnId, type }: { columnId: number; type: string }) => {
		const response = await fetch(`http://localhost:3001/columns/${columnId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: columnId, type }),
		});
		return { respose: await response.json(), columnId };
	},
);

const initialState: ColumnsState = {
	columns: [],
};

export const columnsSlice = createSlice({
	name: 'columns',
	initialState,
	reducers: {
		setColumns: (state, action: PayloadAction<IColumn[]>) => {
			state.columns = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchColumns.fulfilled, (state, { payload }) => {
			state.columns = payload;
		});
		builder.addCase(fetchColumns.rejected, (state) => {
			state.columns = [];
		});
		builder.addCase(fetchAddColumn.fulfilled, (state, { payload }) => {
			state.columns = [...state.columns, payload];
		});
		builder.addCase(fetchRemoveColumns.fulfilled, (state, { payload }) => {
			state.columns = state.columns.filter(column => column.id !== payload);
		});
		builder.addCase(fetchUpdateColumns.fulfilled, (state, { payload }) => {
			const columns = [...state.columns];
			const index = columns.findIndex(column => column.id === payload.columnId);
			columns.splice(index, 1, payload.respose);
			state.columns = columns;
		});
	},
});

export default columnsSlice.reducer;
