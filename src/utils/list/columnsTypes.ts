export enum ColumnsType {
	BACLOG = 'Backlog',
	IN_WORK = 'In work',
	DONE = 'Done',
	PASS = 'Pass',
	IN_TEST = 'In test',
}

export const columnsTypes = [
	{ name: 'Беклог', id: ColumnsType.BACLOG },
	{ name: 'Тестирование', id: ColumnsType.IN_TEST },
	{ name: 'В работе', id: ColumnsType.IN_WORK },
	{ name: 'Выполнена', id: ColumnsType.DONE },
	{ name: 'Сдана', id: ColumnsType.PASS },
];

export const columnsTypesRu = (type: ColumnsType) => {
	return columnsTypes.find(columnType => columnType.id === type)?.name;
};
