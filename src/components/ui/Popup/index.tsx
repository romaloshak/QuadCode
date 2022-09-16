import clsx from 'clsx';

interface IPopup {
	children: React.ReactNode;
	setShowPopup: (value: boolean) => void;
	popupClassName?: string;
}

const Popup: React.FC<IPopup> = ({ setShowPopup, children, popupClassName = 'top-12' }) => {
	return (
		<>
			<div
				className='fixed top-0 left-0 z-30 w-full h-full bg-gray-700 opacity-20'
				onClick={() => {
					setShowPopup(false);
				}}
			></div>
			<div className={clsx('fixed left-0 z-30 w-full h-auto', popupClassName)}>
				<div className='flex items-center justify-center'>{children}</div>
			</div>
		</>
	);
};

export default Popup;
