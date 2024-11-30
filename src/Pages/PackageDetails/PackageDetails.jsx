
import { Link, useLoaderData, useParams,} from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import TourGuide from "../../TourGuide/TourGuide";
import { useState } from "react";
import useTourGuide from "../../hooks/useTourGuide";
import useAdmin from "../../hooks/useAdmin";


const PackageDetails = () => {
  const {user} = useAuth()
  const [tourGuide] = useTourGuide()
  const [admin] = useAdmin()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState({ name: "", email: "" });

  const handleGuideChange = (e) => {
    const guideName = e.target.value;
    const guide = tourGuides.find((g) => g.name === guideName);
    setSelectedGuide({
      name: guide?.name || "",
      email: guide?.email || "",
    });
  };
  
  
    const packages = useLoaderData();
    // console.log(packages)
    const {id} = useParams();
   console.log(id)
 
    const spot = packages.find(spot=>spot._id===id)
    console.log(spot)

   

    const axiosPublicSpot =useAxiosPublic()
    const { data: touristSpot = [],  } = useQuery({
      queryKey: ['touristSpot'],
      queryFn: async () => {
          const res = await axiosPublicSpot.get('/touristSpot');
          return res.data;
      }
  })
  console.log(touristSpot)
 
 
   
    const axiosPublicTourGuide =useAxiosPublic()
    const { data: tourGuides = [],} = useQuery({
      queryKey: ['tourGuides'],
      queryFn: async () => {
          const res = await axiosPublicTourGuide.get('/tourGuides');
          return res.data;
      }
  })
  
  const { register, handleSubmit, control } = useForm();
  const onSubmit = async data =>{
    console.log(data);
   const formData = {
    tour_name: data.package_name,
    name: data.name,
    email: data.email,
    date: data.date,
    price: data.price,
    guide: data.guide_name,
    guide_email: data.guide_email,
    status: "In Review"
   }
   console.log(formData)
   Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, add it!"
  }).then((result) => {
    if (result.isConfirmed){
        fetch('http://localhost:5000/touristForm',{
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(res=>res.json())
          .then(data=>{
            console.log(data)
            if(data.insertedId){
              
                Swal.fire({
                    title: "Added!",
                    text: "Your assignment has been added.",
                    icon: "success"
                  })
                  .then(() => {
                    setIsModalOpen(true); // Open the modal only after success
                  });;
                  
            }
            
          })
     
    }
  });
  }
  
  
 
    return (
     
    <div>
        <div>
      <div className="flex w-10/12 items-center mx-auto gap-4">
      <div>
     <img className="mb-4" src={spot.secondary_images[0]} alt="" />
     <img src={spot.secondary_images[1]}  alt="" />
      </div>
      <div>
     <img className="mb-4" src={spot.secondary_images[2]} alt="" />
     <img src={spot.secondary_images[3]}  alt="" />
      </div>
      <div>
     <img className="mb-4" src={spot.secondary_images[4]} alt="" />
     <img src={spot.secondary_images[5]}  alt="" />
      </div>
      </div>
      <div className="text-center mt-6">
       <h2 className="text-4xl mb-4">About this tour</h2>
       <p className="p-2 text-lg">{spot.about}</p>
      </div>

      <div>
      <div className="collapse collapse-arrow bg-base-200 mt-6">
 <input type="radio" name="my-accordion-2" defaultChecked />
 <div className="collapse-title text-xl font-medium">{spot.tour_plan_day_1[0]}</div>
 <div className="collapse-content">
   <p>{spot.tour_plan_day_1[1]}</p>
 </div>
</div>
      <div className="collapse collapse-arrow bg-base-200">
 <input type="radio" name="my-accordion-2" defaultChecked />
 <div className="collapse-title text-xl font-medium">{spot.tour_plan_day_2[0]}</div>
 <div className="collapse-content">
   <p>{spot.tour_plan_day_2[1]}</p>
 </div>
</div>
      <div className="collapse collapse-arrow bg-base-200">
 <input type="radio" name="my-accordion-2" defaultChecked />
 <div className="collapse-title text-xl font-medium">{spot.tour_plan_day_3[0]}</div>
 <div className="collapse-content">
   <p>{spot.tour_plan_day_3[1]}</p>
 </div>
</div>
      </div>
      
     </div>
<div className="mb-6">
  <h3 className="text-center mb-6">Lets look at our tour guides</h3>
  <TourGuide></TourGuide>
</div>

     {/* {book now} */}

<div>
  <h3 className="mx-auto text-center mb-10">Here is your booking form</h3>
<form className="mx-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="avatar flex mx-auto items-center justify-center text-center mb-10">
        <div className="w-24 rounded-full">
          {user?.photoURL ? (
            <img src={user?.photoURL} alt="" />
          ) : (
            <img alt="" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          )}
        </div>
      </div>

      <div className="lg:flex mb-2 gap-4">
        <div className="form-control w-full">
          <label>
            <div className="label">
              <span className="label-text">Package Name</span>
            </div>
            <input
              {...register("package_name", { required: true })}
              type="text"
              defaultValue={spot?.tour_type}
              className="input input-bordered w-full"
              readOnly
            />
          </label>
        </div>
        <div className="form-control w-full">
          <label>
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              {...register("price", { required: true })}
              type="text"
              defaultValue={spot.price}
              className="input input-bordered w-full"
              readOnly
            />
          </label>
        </div>
      </div>

      <div className="lg:flex mb-2 gap-4">
        <div className="form-control w-full">
          <label>
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              defaultValue={user?.displayName}
              className="input input-bordered w-full"
              readOnly
            />
          </label>
        </div>
        <div className="form-control w-full">
          <label>
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              {...register("email", { required: true })}
              type="text"
              defaultValue={user?.email}
              className="input input-bordered w-full"
              readOnly
            />
          </label>
        </div>
      </div>

      <div className="lg:flex mb-2 gap-4">
        <div className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text">Guide Name</span>
          </div>
          <select
            defaultValue="default"
            {...register("guide_name", { required: true })}
            className="select select-bordered w-full" 
            onChange={handleGuideChange}
          >
            <option value="default" disabled>
              Select a category
            </option>
            {tourGuides.map((p) => (
              <option key={p._id} value={p?.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full">
          <label>
            <div className="label">
              <span className="label-text">Guide Email</span>
            </div>
            <input
              {...register("guide_email", { required: true })}
              type="text"
              value={selectedGuide.email} 
              className="input input-bordered w-full"
              readOnly
            />
          </label>
        </div>
      </div>
      <div className="form-control w-full">
        <label>
            <div className="label">
              <span className="label-text">Date</span>
            </div>
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              defaultValue={null} // Ensure default value is null to avoid issues
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  selected={value} // Bind value from form state
                  onChange={(date) => {
                    // Format the date into YYYY-MM-DD and update form state
                    const formattedDate = date ? date.toISOString().split("T")[0] : null;
                    onChange(formattedDate); // Pass formatted date to React Hook Form
                  }}
                  className="input input-bordered w-full"
                  dateFormat="yyyy-MM-dd" // Display the correct format in the input
                  placeholderText="YYYY-MM-DD"
                />
              )}
            />
          </label>

        </div>

      <div>
  {
    user && !tourGuide && !admin ? (
      <>
        <button
          onClick={() => setIsModalOpen(false)}
          className="btn flex mx-auto mt-4"
        >
          Book Now
        </button>
        
        {/* Modal Logic */}
        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Your Booking Was Successful</h3>
              <div className="modal-action">
                <Link to="/dashboard/myBookings">
                  <button className="btn btn-primary">My Bookings</button>
                </Link>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    ) : 
    user && (tourGuide || admin) ? (
      // User is an admin or tour guide
      <p className="text-center text-red-800 text-lg font-extrabold">
        You are not allowed to book any package. This option is eligible for tourists only.
      </p>
    ) :
    (
      <>
        <p className="text-center text-red-800 font-bold">
          Please{" "}
          <span>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </span>
          {" "}to book
        </p>
      </>
    )
  }
</div>

    </form>
 
   <div className="text-center justify-center items-center mx-auto mt-4">
   <Link to='/'>
     <button className="btn btn-primary">Go Back</button>
     </Link>
   </div>

 
</div>

     
    </div>
     
    );
};

export default PackageDetails;