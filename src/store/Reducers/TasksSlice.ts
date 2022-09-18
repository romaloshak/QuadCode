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
			body: JSON.stringify({ name, columnId, order: 0 }),
		});
		return (await response.json()) as ITask;
	},
);

export const fetchUpdateTasks = createAsyncThunk(
	'tasks/updateTasks',
	async ({
		dragTask,
		columnId,
		dropIndex,
	}: {
		dragTask: ITask;
		columnId: number;
		dropIndex: number;
	}) => {
		const response = await fetch(`http://localhost:3001/tasks/${dragTask.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...dragTask, columnId, order: dropIndex + 1 }),
		});
		return (await response.json()) as ITask;
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
			const tasks = state.tasks.map(stateTask => {
				if (stateTask.id === payload.id) {
					return { ...stateTask, order: payload.order, columnId: payload.columnId };
				}
				return stateTask;
			});
			state.tasks = tasks;
		});
	},
});

export const { setTasks } = TasksSlice.actions;

export default TasksSlice.reducer;
