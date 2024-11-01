import { BiLogOut } from "react-icons/bi";


const LogoutModal = (props) => {
    return (
        <>
            <BiLogOut className='w-5 h-5 cursor-pointer' onClick={() => document.getElementById("logout_modal").showModal()} />

            <dialog id='logout_modal' className='modal'>
                <div className='modal-box border rounded-md border-gray-700 shadow-md'>
                    <div className='flex flex-wrap gap-2'>
                        <h3 className='font-bold text-lg my-3'>Are you sure?</h3>
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