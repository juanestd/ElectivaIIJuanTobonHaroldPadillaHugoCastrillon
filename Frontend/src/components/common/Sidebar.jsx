import XSvg from "../svgs/X";
import { MdHomeFilled } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const Sidebar = () => {
	const data = {
		fullName: localStorage.getItem("name"),
		username: localStorage.getItem("username"),
		profileImg: "/avatars/boy1.png",
	};

	return (
		<div className='w-20 md:w-52 flex-shrink-0'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700'>
				<Link to='/' className='flex justify-center md:justify-start'>
					<XSvg className='px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900' />
				</Link>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link to='/' className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4'>
							<MdHomeFilled className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Home</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link to={`/${data.username}`} className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4'>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>
				</ul>
				{data && (
					<Link to={"/" + data.username} className='mt-auto mb-10 flex gap-2 items-center transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img src={data?.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex justify-between flex-1 items-center'>
							<div className='hidden md:block'>
								<p className='text-white font-bold text-sm w-20 truncate'>{data?.fullName}</p>
								<p className='text-slate-500 text-sm'>@{data?.username}</p>
							</div>
							<LogoutModal />
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
