import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import fetchWithAuth from "../../utils/fetchWithAuth";

const Post = ({ post, onDelete }) => {
	if (!post || !post.createdBy.username) {
		return <div className="p-4">Loading...</div>;
	}

	const postOwner = post.createdBy;
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	  }).format(new Date(post.createdDate));
	const currentUser = localStorage.getItem("username");

	const handleDeletePost = async () => {
		const confirmDelete = window.confirm("Are you sure you want to delete this tweet?");
		if (!confirmDelete) return;

		try {
			await fetchWithAuth(
				`http://localhost:3000/api/tweets/${post.id}`,
				{ method: "DELETE" }
			);
			onDelete(post.id);
			alert("Tweet deleted successfully.");
		} catch (error) {
			alert("Network error, failed to delete tweet. Please try again.")
			console.error(error);
		}
	};

	return (
		<div className='flex gap-2 items-start p-4 border-b border-gray-700'>
			<div className='avatar'>
				<Link to={`/${postOwner.username}`} className='w-8 rounded-full overflow-hidden'>
					<img src={postOwner.profileImg || "/avatar-placeholder.png"} alt={postOwner.name} />
				</Link>
			</div>
			<div className='flex flex-col flex-1'>
				<div className='flex justify-between'>
					<div className='flex flex-col'>
						<Link to={`/${postOwner.username}`} className='font-semibold hover:underline'>{postOwner.name}</Link>
						<p className='text-sm text-slate-500'>@{postOwner.username} • {formattedDate}</p>
					</div>
					{postOwner.username === currentUser && (
						<button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>
							<FaTrash />
						</button>
					)}
				</div>
				<p className='mt-2 max-w-lg break-words'>{post.message}</p>
			</div>
		</div>
	);
};

export default Post;
