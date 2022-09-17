import clsx from 'clsx';
import { IPopup } from 'src/Interfaces/IPopup';

const Popup: React.FC<IPopup> = ({ setShowPopup, children, popupClassName = 'top-12' }) => {
	return (
		<>
			<div
				className='fixed top-0 left-0 z-30 w-full h-full bg-gray-700 opacity-20'
				onClick={() => {
					setShowPopup(false);
				}}
			></div>
			<div className={clsx('fixed left-1/2 -translate-x-[225px] z-30 h-auto', popupClassName)}>
				{children}
			</div>
		</>
	);
};

export default Popup;
