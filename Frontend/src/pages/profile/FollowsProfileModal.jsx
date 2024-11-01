import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import headerFactory from '../../utils/headerFactory';

const FollowsProfileModal = (props) => {

	const { username } = useParams();
	const headerApi = headerFactory;


	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		bio: "",
		link: "",
		newPassword: "",
		currentPassword: "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const [following, setFollowing] = useState([]);
	const [followers, setFollowers] = useState([]);
	useEffect(() => {
		async function fetchFollowers() {
			const response = await fetch(
				`http://localhost:3000/api/${username}/followers?page=1&limit=10`,
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
				`http://localhost:3000/api/${username}/following?page=1&limit=10`,
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
				<div className='modal-box border rounded-md border-gray-700 shadow-md'>
					<div className="columns-2">
						<div>
							<div className='flex flex-wrap gap-2'>
								<h3 className='font-bold text-lg my-3'>Following</h3>
							</div>

							{following && following.map((follower, index) => (
								<div key={index} className='flex gap-2 items-center p-2'>
									<div className='avatar'>
										<Link to={`/${follower.username}`} className='w-8 rounded-full overflow-hidden'>
											<img src={'' || "/avatar-placeholder.png"} alt={''} />
										</Link>
									</div>
									<div className='flex flex-col flex-1'>
										<div className='flex justify-between'>
											<div className='flex flex-col'>
												<Link to={`/${follower.username}`} className='font-semibold hover:underline whitespace-nowrap'>{follower.name}</Link>
												<p className='text-sm text-slate-500'>@{follower.username}</p>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
						<div>
							<div className='flex flex-wrap gap-2'>
								<h3 className='font-bold text-lg my-3'>Followers</h3>
							</div>

							{followers && followers.map((follower, index) => (
								<div key={index} className='flex gap-2 items-center p-2'>
									<div className='avatar'>
										<Link to={`/${follower.username}`} className='w-8 rounded-full overflow-hidden'>
											<img src={'' || "/avatar-placeholder.png"} alt={''} />
										</Link>
									</div>
									<div className='flex flex-col flex-1'>
										<div className='flex justify-between items-center'>
											<div className='flex flex-col'>
												<Link to={`/${follower.username}`} className='font-semibold hover:underline whitespace-nowrap'>{follower.name}</Link>
												<p className='text-sm text-slate-500'>@{follower.username}</p>
											</div>
											{!follower.following && (
												<div className='flex justify-end px-4'>
													<button
														className='btn btn-outline rounded-full btn-sm'
														onClick={() => alert("Followed successfully")} >
														Follow
													</button>
												</div>
											)}
										</div>
									</div>
								</div>
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