import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("name");
        closeModal();
        navigate("/login")
    };

    const closeModal = () => {
        document.getElementById("logout_modal").close();
    }
    const openModal = () => {
        document.getElementById("logout_modal").showModal();
    }

    return (
        <>
            <BiLogOut className='w-5 h-5 cursor-pointer' onClick={openModal} />

            <dialog id='logout_modal' className='modal'>
                <div className='modal-box border rounded-md border-gray-700 shadow-md'>
                    <div>
                        <h3 className='font-bold text-lg my-3'>Are you sure you want to log out?</h3>
                        <div className="flex justify-end gap-4 mt-4">
                            <button className="btn rounded-full btn-outline" onClick={closeModal}>Cancel</button>
                            <button className="btn rounded-full btn-primary" onClick={handleLogout}>Logout</button>
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
export default LogoutModal;
