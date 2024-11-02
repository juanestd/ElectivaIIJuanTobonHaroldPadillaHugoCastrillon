import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchWithAuth from "../../utils/fetchWithAuth";


const RightPanel = () => {
	const [userName, setUserName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	const handleFollowUser = async () => {
		if (!userName) {
			setErrorMessage("Please enter a username");
			return;
		}else if(userName === localStorage.getItem("username")){
			setErrorMessage("You can't follow yourself");
			return;
		}

		setIsLoading(true);
		setErrorMessage("");

		try {
			await fetchWithAuth(`http://localhost:3000/api/${userName}/follow`, { method: "POST" });
			alert(`Your are now following ${userName}`);
			navigate(`/${userName}`);
		} catch (error) {
			if(error.message === "404"){
				setErrorMessage("User not found");
			}else if(error.message === "400"){
				setErrorMessage("You are already following this user");
			}else{
				setErrorMessage("Network error, please try again.");
			}
		} finally{
			setIsLoading(false);
		}
	}

	return (
		<div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold text-white'>Follow another user</p>
				<div className='flex flex-col gap-4 '>
					<input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter username" className="p-2 border border-gray-300 rounded mt-2" />
					<button disabled={isLoading} onClick={handleFollowUser} className="btn rounded-full btn-primary text-white">
						{isLoading ? "Following..." : "Follow user"}
					</button>
					{
						errorMessage && <p className="text-red-500 mt-2 max-w-48">{errorMessage}</p>
					}
				</div>
			</div>
		</div>
	);
};

export default RightPanel;