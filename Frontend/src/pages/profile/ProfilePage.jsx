import { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../../components/common/PostCard";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import FollowsProfileModal from "./FollowsProfileModal";
import { POSTS } from "../../utils/db/dummy";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import headerFactory from '../../utils/headerFactory';

const ProfilePage = () => {
	const { username } = useParams();
	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");

	const isLoading = false;
	const isMyProfile = true;

	const user = {
		_id: "1",
		fullName: localStorage.getItem('name'),
		username: username,
		profileImg: "/avatars/boy2.png",
		coverImg: "/cover.png",
		bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		link: "https://youtube.com/@asaprogrammer_",
		following: ["1", "2", "3"],
		followers: ["1", "2", "3"],
	};

	const headerApi = headerFactory;

	const [loading, setLoading] = useState(true);
	const [tweets, setTweets] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const response = await fetch(
				`http://localhost:3000/api/${username}/tweets?page=1&limit=10000`,
				{ method: "GET", headers: headerApi }
			);
			const data = await response.json()

			if (response.ok) {
				setTweets(data.tweets);
			}
			setLoading(false);
			return;
		}
		fetchData();
	}, [username]);

	const [following, setFollowing] = useState(0);
	const [followers, setFollowers] = useState(0);
	useEffect(() => {
		async function fetchFollowers() {
			const response = await fetch(
				`http://localhost:3000/api/${username}/followers/count`,
				{ method: "GET", headers: headerApi }
			);
			const data = await response.json()

			if (response.ok) {
				setFollowers(data.followers);
			}
			return;
		}
		async function fetchFollowing() {
			const response = await fetch(
				`http://localhost:3000/api/${username}/following/count`,
				{ method: "GET", headers: headerApi }
			);
			const data = await response.json()

			if (response.ok) {
				setFollowing(data.following);
			}
			return;
		}
		if(username){
			fetchFollowers();
			fetchFollowing();
		}

	}, [username]);


	return (
		<>
			<div className='flex-[4_4_0]  border-r border-gray-700 min-h-screen '>
				{/* HEADER */}
				{isLoading && <ProfileHeaderSkeleton />}
				{!isLoading && !user && <p className='text-center text-lg mt-4'>User not found</p>}
				<div className='flex flex-col'>
					{!isLoading && user && (
						<>
							<div className='flex gap-10 px-4 py-2 items-center'>
								<Link to='/'>
									<FaArrowLeft className='w-4 h-4' />
								</Link>
								<div className='flex flex-col'>
									<p className='font-bold text-lg'>{user?.fullName}</p>
									<span className='text-sm text-slate-500'>{POSTS?.length} posts</span>
								</div>
							</div>
							{/* COVER IMG */}
							<div className='relative group/cover'>
								<img
									src={coverImg || user?.coverImg || "/cover.png"}
									className='h-52 w-full object-cover'
									alt='cover image'
								/>
								{/* USER AVATAR */}
								<div className='avatar absolute -bottom-16 left-4'>
									<div className='w-32 rounded-full relative group/avatar'>
										<img src={profileImg || user?.profileImg || "/avatar-placeholder.png"} />
									</div>
								</div>
							</div>
							<div className='flex justify-end px-4 mt-5'>
								{!isMyProfile && (
									<button
										className='btn btn-outline rounded-full btn-sm'
										onClick={() => alert("Followed successfully")}
									>
										Follow
									</button>
								)}
							</div>

							<div className='flex flex-col gap-4 mt-14 px-4'>
								<div className='flex flex-col'>
									<span className='font-bold text-lg'>{user?.fullName}</span>
									<span className='text-sm text-slate-500'>@{user?.username}</span>
									<span className='text-sm my-1'>{user?.bio}</span>
								</div>

								<div className='flex gap-2 flex-wrap'>
									{user?.link && (
										<div className='flex gap-1 items-center '>
											<>
												<FaLink className='w-3 h-3 text-slate-500' />
												<a
													href='https://youtube.com/@asaprogrammer_'
													target='_blank'
													rel='noreferrer'
													className='text-sm text-blue-500 hover:underline'
												>
													youtube.com/@asaprogrammer_
												</a>
											</>
										</div>
									)}
									<div className='flex gap-2 items-center'>
										<IoCalendarOutline className='w-4 h-4 text-slate-500' />
										<span className='text-sm text-slate-500'>Joined July 2021</span>
									</div>
								</div>
								<FollowsProfileModal followersCount={followers} followingCount={following} />
							</div>
							<div className='flex w-full border-b border-gray-700 mt-4'>
								<div
									className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer'
									onClick={() => setFeedType("posts")}
								>
									Posts
									{feedType === "posts" && (
										<div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary' />
									)}
								</div>
								<div
									className='flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer'
									onClick={() => setFeedType("likes")}
								>
									Likes
									{feedType === "likes" && (
										<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary' />
									)}
								</div>
							</div>
						</>
					)}

					{/* POSTS */}
					{loading ? (
						<div>Cargando...</div>
					) : (
						tweets && !loading && tweets.map((tweet, index) => (<Post key={index} post={tweet} />))
					)}

					{!tweets?.length && !loading && (
						<div>No hay tweets por ver.</div>
					)}
				</div>
			</div>
		</>
	);
};
export default ProfilePage;