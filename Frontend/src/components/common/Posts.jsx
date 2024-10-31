import { FaRegComment, FaRegHeart, FaRegBookmark, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
	const [comment, setComment] = useState("");

	if (!post || !post.user) {
		return <div>Cargando...</div>; 
	}

	const postOwner = post.user;
	const formattedDate = "1h"; 

	const handleDeletePost = () => {
		
	};

	const handlePostComment = (e) => {
		e.preventDefault();
		
	};

	return (
		<div className='flex gap-2 items-start p-4 border-b border-gray-700'>
			<div className='avatar'>
				<Link to={`/profile/${postOwner.username}`} className='w-8 rounded-full overflow-hidden'>
					<img src={postOwner.profileImg || "/avatar-placeholder.png"} alt={postOwner.fullName} />
				</Link>
			</div>
			<div className='flex flex-col flex-1'>
				<div className='flex justify-between'>
					<div className='flex flex-col'>
						<Link to={`/profile/${postOwner.username}`} className='font-semibold hover:underline'>{postOwner.fullName}</Link>
						<p className='text-sm text-slate-500'>@{postOwner.username} • {formattedDate}</p>
					</div>
					<button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>
						<FaTrash />
					</button>
				</div>
				<p className='mt-2'>{post.content}</p>
				<div className='flex gap-4 mt-2'>
					<button className='flex items-center text-slate-500 hover:text-blue-500'>
						<FaRegComment className='mr-1' />
						Comment
					</button>
					<button className='flex items-center text-slate-500 hover:text-red-500'>
						<FaRegHeart className='mr-1' />
						Like
					</button>
					<button className='flex items-center text-slate-500 hover:text-gray-500'>
						<FaRegBookmark className='mr-1' />
						Save
					</button>
				</div>
				<form onSubmit={handlePostComment} className='mt-2'>
					<input
						type='text'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder='Add a comment...'
						className='w-full p-2 border border-gray-300 rounded'
					/>
				</form>
			</div>
		</div>
	);
};

export default Post;
