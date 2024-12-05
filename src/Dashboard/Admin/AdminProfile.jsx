import React from 'react';
import useAuth from '../../hooks/useAuth';

const AdminProfile = () => {
    const {user} = useAuth()
    return (
      <div className='border-[2px] border-red-600'>
        <div className="avatar flex mx-auto items-center justify-center text-center">
<div className="w-24 rounded-full">
{user?.photoURL? <img src={user?.photoURL} alt=""  /> : 
<img alt="" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
/>

}
</div>
</div>
        <div className='ml-4'>
        <form className="card-body w-1/2 mt-4 mx-auto">
<div className="items-center justify-center text-center mb-3 form-control w-full">
<label className="input input-bordered flex justify-center items-center text-center gap-2">
{
           user?.displayName
       }
</label>
</div>
<div className="form-control w-full items-center justify-center text-center">
<label className="input input-bordered flex justify-center items-center text-center gap-2">

{
user?.email
}

</label>
</div>
</form>
        </div>
      </div>
    );
};

export default AdminProfile;

{/* <div className="border-[2px] border-red-600">
<div className="avatar flex mx-auto items-center justify-center text-center">
<div className="w-24 rounded-full">
{user?.photoURL? <img src={user?.photoURL} alt=""  /> : 
<img alt="" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
/>

}
</div>
</div>
<form className="lg:card-body lg:w-1/2 max-w-sm mt-4 mx-auto">
<div className="items-center justify-center text-center mb-3 ">
<label className="input input-bordered flex justify-center items-center text-center gap-2">
{
           user?.displayName
       }
</label>
</div>
<div className=" items-center justify-center text-center">
<label className="input input-bordered flex justify-center items-center text-center gap-2">

{
user?.email
}

</label>
</div>
</form>
</div> */}