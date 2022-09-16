import BellIcon from 'src/Assets/icons/Bell';
import Gear from 'src/Assets/icons/Gear';

const Header = () => {
	return (
		<header className='p-6 bg-primary flex justify-between relative z-20'>
			<div className='flex items-center gap-x-2'>
				<Gear />
				<span className='text-white text-[16px] leading-[21px]'>eveli.todo</span>
			</div>
			<div className='flex gap-x-8'>
				<button className='nav-link'>Задачи</button>
				<button className='nav-link nav-active'>Проекты</button>
				<button className='nav-link'>Статистика</button>
				<button className='nav-link'>Финансы</button>
				<button className='nav-link'>План</button>
				<button className='nav-link'>Пользователи</button>
			</div>
			<div className='flex gap-x-8'>
				<div className='flex items-center gap-x-5'>
					<button>
						<span className="after:content-['₽'] after:ml-2 text-white text-[16px] leading-[19px]">
							60 000
						</span>
					</button>
					<BellIcon />
				</div>
				<div>
					<button className='flex items-center gap-x-2 group'>
						<span className='w-8 h-8 rounded-full bg-white'></span>
						<span className='text-white text-[16px] leading-[18px] flex items-center after:content-arrow-down after:ease-linear after:duration-100 after:ml-2 after:flex group-hover:after:rotate-180'>
							Назир
						</span>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
