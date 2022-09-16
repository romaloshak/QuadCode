import ArrowRight from 'src/Assets/icons/ArrowRight';
import MagnifierIcon from 'src/Assets/icons/Magnifier';
import PlusIcon from 'src/Assets/icons/Plus';
import QuestionMarkIcon from 'src/Assets/icons/QuestionMark';
import SquareDotsIcon from 'src/Assets/icons/SquareDots';

const Sidebar = () => {
	return (
		<section className='fixed top-0 z-10 h-screen w-20 bg-primary_dark flex flex-col items-center justify-between pb-8 pt-20'>
			<div className='flex flex-col gap-y-5 mt-20'>
				<button>
					<MagnifierIcon />
				</button>
				<button>
					<PlusIcon />
				</button>
				<button>
					<SquareDotsIcon />
				</button>
			</div>
			<div className='relative w-20 h-20 overflow-hidden'>
				<button className='w-20 h-20 absolute top-0 left-1/2 bg-[#364952] rounded-full'>
					<span className='relative left-1/4'>
						<ArrowRight />
					</span>
				</button>
			</div>
			<div>
				<button>
					<QuestionMarkIcon />
				</button>
			</div>
		</section>
	);
};

export default Sidebar;
