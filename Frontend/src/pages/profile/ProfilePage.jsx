import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Post from "../../components/common/PostCard";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import FollowsProfileModal from "./FollowsProfileModal";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import fetchWithAuth from "../../utils/fetchWithAuth";


const ProfilePage = () => {
	const navigate = useNavigate();
	const { username } = useParams();
	const [feedType, setFeedType] = useState("posts");
	const [profileData, setProfileData] = useState({});
	const [isUserFollowing, setIsUserFollowing] = useState(false);
	const [tweets, setTweets] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [loadingTweets, setLoadingTweets] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [following, setFollowing] = useState(0);
	const [followers, setFollowers] = useState(0);
	const observer = useRef();

	const isMyProfile = localStorage.getItem("username") === username;

	const userComplement = {
		profileImg: "/avatars/boy2.png",
		coverImg: "/cover.png",
		bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		link: "https://youtube.com/@asaprogrammer_",
	};

	const fetchProfileData = useCallback(async (pageNum = 1) => {
		if (loadingTweets) return;

		setLoadingTweets(true);
		try {
			const data = await fetchWithAuth(`http://localhost:3000/api/${username}/tweets?page=${pageNum}&limit=10`, {
				method: "GET",
			});

			if (pageNum === 1) {
				setProfileData({ ...data.userData, ...userComplement });
				setIsUserFollowing(data.isUserFollowing);
				setLoading(false);
			}

			setTweets((prevTweets) => pageNum === 1 ? data.tweets : [...prevTweets, ...data.tweets]);
			setHasMore(pageNum < data.totalPages);
		} catch (error) {
			console.error("Failed to load profile data:", error);
			setTweets([]);
			navigate("/");
		} finally {
			setLoadingTweets(false);
		}
	}, [username, navigate, hasMore, loading, loadingTweets]);

	useEffect(() => {
		setLoading(true);
		setTweets([]);
		setPage(1);
		setHasMore(true);
		setProfileData({});
		fetchProfileData(1);
		fetchFollowers();
		fetchFollowing();
	}, [username, isUserFollowing]);

	useEffect(() => {
		if (page > 1 && hasMore) fetchProfileData(page);
	}, [page]);

	const lastTweetRef = useCallback(
		(node) => {
			if (loading || !hasMore) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((prevPage) => prevPage + 1);
				}
			});

			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	const fetchFollowers = async () => {
		try {
			const data = await fetchWithAuth(
				`http://localhost:3000/api/${username}/followers/count`,
				{ method: "GET" }
			);
			setFollowers(data.followers);
		} catch (error) {
			console.error("Failed to load followers count:", error);
			setFollowers(0);
		}
	};

	const fetchFollowing = async () => {
		try {
			const data = await fetchWithAuth(
				`http://localhost:3000/api/${username}/following/count`,
				{ method: "GET" }
			);
			setFollowing(data.following);
		} catch (error) {
			console.error("Failed to load following count:", error);
			setFollowing(0);
		}
	};

	const handleDeletePost = (tweetId) => {
		setTweets((prevTweets) => prevTweets.filter((t) => t.id !== tweetId));
	};

	const formatJoinDate = (createdDate) => {
		if (!createdDate) return;
		const date = new Date(createdDate);
		const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
		const year = date.getFullYear();
		return `Joined ${month} ${year}`;
	};

	const handleFollowUser = async () => {
		try {
			await fetchWithAuth(`http://localhost:3000/api/${username}/follow`, { method: 'POST' });
			alert(`You are now following ${username}`);
			setIsUserFollowing(true)
		} catch(error) {
			console.error("Error:", error);
			alert("Network Error, please try again");
		}
	}


	return (
		<div className='flex-[4_4_0]  border-r border-gray-700 min-h-screen '>
			{loading && !tweets.length && <ProfileHeaderSkeleton />}
			{!loading && !profileData && <p className='text-center text-lg mt-4'>User not found</p>}
			<div className='flex flex-col'>
				{!loading && profileData && (
					<>
						<div className='flex gap-10 px-4 py-2 items-center'>
							<Link to='/'>
								<FaArrowLeft className='w-4 h-4' />
							</Link>
							<div className='flex flex-col'>
								<p className='font-bold text-lg'>{profileData?.name}</p>
								<span className='text-sm text-slate-500'>{tweets?.length} posts</span>
							</div>
						</div>
						<div className='relative group/cover'>
							<img
								src={profileData?.coverImg || "/cover.png"}
								className='h-52 w-full object-cover'
								alt='cover'
							/>
							<div className='avatar absolute -bottom-16 left-4'>
								<div className='w-32 rounded-full relative group/avatar'>
									<img src={profileData?.profileImg || "/avatar-placeholder.png"} />
								</div>
							</div>
						</div>
						<div className='flex justify-end px-4 mt-5'>
							{!isMyProfile && !isUserFollowing && (
								<button
									className='btn btn-outline rounded-full btn-sm'
									onClick={() => handleFollowUser()}
								>
									Follow
								</button>
							)}
						</div>

						<div className='flex flex-col gap-4 mt-14 px-4'>
							<div className='flex flex-col'>
								<span className='font-bold text-lg'>{profileData?.name}</span>
								<span className='text-sm text-slate-500'>@{profileData?.username}</span>
								<span className='text-sm my-1'>{profileData?.bio}</span>
							</div>

							<div className='flex gap-2 flex-wrap'>
								{profileData?.link && (
									<div className='flex gap-1 items-center '>
										<FaLink className='w-3 h-3 text-slate-500' />
										<a
											href={`https://X.com/${username}`}
											target='_blank'
											rel='noreferrer'
											className='text-sm text-blue-500 hover:underline'
										>
											x.com/{username}
										</a>
									</div>
								)}
								<div className='flex gap-2 items-center'>
									<IoCalendarOutline className='w-4 h-4 text-slate-500' />
									<span className='text-sm text-slate-500'>{formatJoinDate(profileData?.createdDate)}</span>
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
				{tweets.map((tweet, index) => (
					<div ref={index === tweets.length - 1 ? lastTweetRef : null} key={tweet.id}>
						<Post post={tweet} onDelete={handleDeletePost} />
					</div>
				))}
				{loadingTweets && (<div className="p-4">Loading...</div>)}
				{!tweets?.length && !loadingTweets && (
					<div className="p-4">No tweets available.</div>
				)}
			</div>
		</div>
	);
};
export default ProfilePage;
