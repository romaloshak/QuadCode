import Header from '../Header';
import Sidebar from '../Sidebar';
interface IMainLayout {
	children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
	return (
		<>
			<Header />
			<Sidebar />
			<section className='py-20 pl-40 pr-20 w-full h-full'>{children}</section>
		</>
	);
};

export default MainLayout;
