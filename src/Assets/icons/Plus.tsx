import clsx from 'clsx';

interface IIcon {
	color?: string;
}
const PlusIcon: React.FC<IIcon> = ({ color = 'text-white' }) => {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={clsx('fill-current', color)}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M19.4286 9.14286H11.7143C11.3989 9.14286 11.1429 8.88686 11.1429 8.57143V0.571429C11.1429 0.256 10.8869 0 10.5714 0H9.42857C9.11314 0 8.85714 0.256 8.85714 0.571429V8.57143C8.85714 8.88686 8.60114 9.14286 8.28571 9.14286H0.571429C0.256 9.14286 0 9.39886 0 9.71429V10.8571C0 11.1726 0.256 11.4286 0.571429 11.4286H8.28571C8.60114 11.4286 8.85714 11.6846 8.85714 12V19.4286C8.85714 19.744 9.11314 20 9.42857 20H10.5714C10.8869 20 11.1429 19.744 11.1429 19.4286V12C11.1429 11.6846 11.3989 11.4286 11.7143 11.4286H19.4286C19.744 11.4286 20 11.1726 20 10.8571V9.71429C20 9.39886 19.744 9.14286 19.4286 9.14286Z'
			/>
		</svg>
	);
};
export default PlusIcon;