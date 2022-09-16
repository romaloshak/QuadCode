import DoneIcon from 'src/Assets/icons/columnTypesIcons/Done';
import PassIcon from 'src/Assets/icons/columnTypesIcons/Pass';
import PinIcon from 'src/Assets/icons/columnTypesIcons/Pin';
import PlayIcon from 'src/Assets/icons/columnTypesIcons/Play';
import TestIcon from 'src/Assets/icons/columnTypesIcons/TestIcon';
import { ColumnsType } from './columnsTypes';

export const ColumnTypeIcon = (type: ColumnsType) => {
	switch (type) {
		case ColumnsType.BACLOG:
			return <PinIcon />;
		case ColumnsType.IN_TEST:
			return <TestIcon />;
		case ColumnsType.IN_WORK:
			return <PlayIcon />;
		case ColumnsType.DONE:
			return <DoneIcon />;
		case ColumnsType.PASS:
			return <PassIcon />;

		default:
			return null;
	}
};
