import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // try {
        //   console.log(data);
        //   const result = await createUser(data.email, data.password);
        //   const loggedUser = result.user;
        //   console.log(loggedUser);
      
        //   await updateUser(data.name, data.photoURL);
      
        //   const userInfo = {
        //     name: data.name,
        //     email: data.email,
        //   };
      
        //   const res = await axiosPublic.post('/users', userInfo);
        //   if (res.data.insertedId) {
        //     console.log('user added');
        //     reset();
        //     Swal.fire({
        //       position: "top-end",
        //       icon: "success",
        //       title: "Profile Updated",
        //       showConfirmButton: false,
        //       timer: 1500
        //     });
        //     navigate('/');
        //   }
        // } catch (error) {
        //   console.error('An error occurred:', error);
        // }
      };


    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Signup now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name",{ required: true })} name="name" placeholder="Name" className="input input-bordered"  />
                {errors.name && <span className="text-red-500">Name field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoURL</span>
                </label>
                <input type="text" {...register("photoURL",{ required: true })} name="photoURL" placeholder="photoURL" className="input input-bordered"  />
                {errors.photoURL && <span className="text-red-500">PhotoURL field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                {errors.email && <span className="text-red-500">Email field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} name="password" placeholder="password" className="input input-bordered"  />
                {errors.password?.type === "minLength" && (
        <p className="text-red-500">Password must be 6 character</p>
      )}
                {errors.password?.type === "maxLength" && (
        <p className="text-red-500">Password must be less than 20 character</p>
      )}
                {errors.password?.type === "pattern" && (
        <p className="text-red-500">Password must be uppercase,lowercase, number and a special character</p>
      )}
                <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Sign Up" />
                
              </div>
            </form>
            <p><small>Have a account? <Link to='/login'>Login Here</Link></small></p>
         
          </div>
        </div>
      </div>
    );
};

export default Register;