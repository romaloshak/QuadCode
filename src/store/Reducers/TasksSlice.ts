import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ITask } from 'src/Interfaces/ITask';

export interface TasksState {
	tasks: ITask[];
}

export const fetchTasks = createAsyncThunk('tasks/getTasks', async () => {
	const response = await fetch('http://localhost:3001/tasks', { method: 'GET' });
	return (await response.json()) as ITask[];
});

export const fetchAddTasks = createAsyncThunk(
	'tasks/addTasks',
	async ({ name, columnId }: { name: string; columnId: number }) => {
		const response = await fetch('http://localhost:3001/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, columnId }),
		});
		return (await response.json()) as ITask;
	},
);

export const fetchUpdateTasks = createAsyncThunk(
	'tasks/updateTasks',
	async ({
		dragTaskId,
		name,
		columnId,
		tasks,
	}: {
		dragTaskId: number;
		name: string;
		columnId: number;
		tasks: ITask[];
	}) => {
		await fetch(`http://localhost:3001/tasks/${dragTaskId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, columnId }),
		});
		return tasks;
	},
);

const initialState: TasksState = {
	tasks: [],
};

export const TasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action: PayloadAction<ITask[]>) => {
			state.tasks = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
			state.tasks = payload;
		});
		builder.addCase(fetchAddTasks.fulfilled, (state, { payload }) => {
			state.tasks = [...state.tasks, payload];
		});
		builder.addCase(fetchUpdateTasks.fulfilled, (state, { payload }) => {
			state.tasks = payload;
		});
	},
});

export const { setTasks } = TasksSlice.actions;

export default TasksSlice.reducer;
