import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import fetchWithAuth from "../../utils/fetchWithAuth";
import RightPanelSkeleton from "../../components/skeletons/RightPanelSkeleton";

const FollowsProfileModal = (props) => {

	const { username } = useParams();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [following, setFollowing] = useState([]);
	const [followers, setFollowers] = useState([]);

	useEffect(() => {
		async function fetchFollowers() {
			try {
				const data = await fetchWithAuth(
					`http://localhost:3000/api/${username}/followers?page=1&limit=10`,
					{ method: "GET" }
				);
				const sortedFollowers = data.followers.sort((a, b) => a.name.localeCompare(b.name));
				setFollowers(sortedFollowers);
			} catch (error) {
				setFollowers([]);
			}
		}
		async function fetchFollowing() {
			try {
				const data = await fetchWithAuth(
					`http://localhost:3000/api/${username}/following?page=1&limit=10`,
					{ method: "GET" }
				);
				const sortedFollowing = data.following.sort((a, b) => a.name.localeCompare(b.name));
				setFollowing(sortedFollowing);
				setIsLoading(false);
			} catch (error) {
				setFollowing([]);
			}
		}
		if (username) {
			setIsLoading(true);
			fetchFollowers();
			fetchFollowing();
		}

	}, [username]);

	const isMyProfile = (username) => {
		return username === localStorage.getItem('username')
	}

	const handleFollowUser = async (userToFollow) => {
		try {
			await fetchWithAuth(`http://localhost:3000/api/${userToFollow.username}/follow`, { method: 'POST' });

			document.getElementById("follows_profile_modal").close()
			navigate(`/${userToFollow.username}`);
			alert(`You are now following ${userToFollow.name}`);
		} catch (error) {
			console.error("Error:", error);
			document.getElementById("follows_profile_modal").close()
			alert("Network Error, please try again");
		}
	}

	return (
		<>
			<div className='flex gap-2 cursor-pointer' onClick={() => document.getElementById("follows_profile_modal").showModal()}>
				<div className='flex gap-1 items-center'>
					<span className='font-bold text-xs'>{props.followingCount}</span>
					<span className='text-slate-500 text-xs'>Following</span>
				</div>
				<div className='flex gap-1 items-center'>
					<span className='font-bold text-xs'>{props.followersCount}</span>
					<span className='text-slate-500 text-xs'>Followers</span>
				</div>
			</div>

			<dialog id='follows_profile_modal' className='modal'>
				<div className='modal-box border rounded-md border-gray-700 shadow-md p-4'>
					<div className="flex columns-2 justify-between">
						<div className="border-box mb-4">
							<div className='flex flex-wrap gap-2'>
								<h3 className='font-bold text-lg my-3'>Following</h3>
							</div>
							{isLoading && (
								<>
									<RightPanelSkeleton />
									<RightPanelSkeleton />
								</>
							)}
							{!isLoading && following?.map((follower) => (
								<Link to={`/${follower.username}`} onClick={() => document.getElementById("follows_profile_modal").close()} className='flex items-center justify-between gap-1 mb-2' key={follower.username}>
									<div className='flex gap-2 items-center'>
										<div className='avatar'>
											<div className='w-8 rounded-full overflow-hidden'>
												<img src={'' || "/avatar-placeholder.png"} alt={follower.name} />
											</div>
										</div>
										<div className='flex flex-col'>
											<span className='font-semibold tracking-tight truncate w-28 text-white'>{follower.name}</span>
											<span className='text-sm text-slate-500'>@{follower.username}</span>
										</div>
									</div>
									{!follower.following && !isMyProfile(follower.username) && (
										<div>
											<button
												className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
												onClick={() => handleFollowUser(follower)}
											>
												Follow
											</button>
										</div>
									)}
								</Link>
							))}
						</div>
						<div className="border-box mb-4">
							<div className='flex flex-wrap gap-2'>
								<h3 className='font-bold text-lg my-3'>Followers</h3>
							</div>
							{isLoading && (
								<>
									<RightPanelSkeleton />
									<RightPanelSkeleton />
								</>
							)}
							{!isLoading && followers?.map((follower) => (
								<Link to={`/${follower.username}`} onClick={() => document.getElementById("follows_profile_modal").close()} className='flex items-center justify-between gap-1 mb-2' key={follower.username}>
									<div className='flex gap-2 items-center'>
										<div className='avatar'>
											<div className='w-8 rounded-full overflow-hidden'>
												<img src={'' || "/avatar-placeholder.png"} alt={follower.name} />
											</div>
										</div>
										<div className='flex flex-col'>
											<span className='font-semibold tracking-tight truncate w-28 text-white'>{follower.name}</span>
											<span className='text-sm text-slate-500'>@{follower.username}</span>
										</div>
									</div>
									{!follower.following && !isMyProfile(follower.username) && (
										<div>
											<button
												className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
												onClick={() => handleFollowUser(follower)}
											>
												Follow
											</button>
										</div>
									)}
								</Link>
							))}
						</div>
					</div>

				</div>
				<form method='dialog' className='modal-backdrop'>
					<button className='outline-none'>close</button>
				</form>
			</dialog>
		</>
	);
};
export default FollowsProfileModal;