export interface IPopup {
	children: React.ReactNode;
	setShowPopup: (value: boolean) => void;
	popupClassName?: string;
}
