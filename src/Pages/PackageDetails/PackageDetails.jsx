
import { Link, useLoaderData, useParams,} from "react-router-dom";


const PackageDetails = () => {
    const packages = useLoaderData();
    // console.log(packages)
    const {id} = useParams();
   console.log(id)
 
    const spot = packages.find(spot=>spot._id===id)
    console.log(spot)
   
    return (
     
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
      <Link to='/'>
     <button className="btn btn-primary">Go Back</button>
     </Link>
     </div>
     
    );
};

export default PackageDetails;