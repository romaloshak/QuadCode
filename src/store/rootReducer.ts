import { combineReducers } from '@reduxjs/toolkit';
import columnsReducer from './Reducers/ColumnsSlice';
import tasksReducer from './Reducers/TasksSlice';
import dragTaskSlice from './Reducers/DragTask';

export const rootReducer = combineReducers({
	columns: columnsReducer,
	tasks: tasksReducer,
	drugTask: dragTaskSlice,
});
