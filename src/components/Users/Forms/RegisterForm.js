import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slice/users/usersSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";

const RegisterForm = () => {
  //dispatch
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  //---Destructuring---
  const { fullname, email, password } = formData;

  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUserAction({ fullname, email, password }));
  };

  //select store data
  const { user, error, loading } = useSelector((state) => state?.users);

  //redirect
useEffect(() => {
  if (user) {
    window.location.href = "/login";
  }
},[user])

  return (
    <>
 
  
          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full lg:w-2/6 px-4 my-8 lg:mb-0 shadow-2xl  rounded-3xl">
              <div className=" text-center">
                <h3 className="mb-8 text-4xl md:text-5xl font-bold font-heading">
                  Sign Up
                </h3>
                

                {error && <ErrorMsg message={error?.message} />}
               
                <form onSubmit={onSubmitHandler} className="">
                  <input
                    name="fullname"
                    value={fullname}
                    onChange={onChangeHandler}
                    className="w-full mb-4 px-12 py-6 border text-2xl  border-gray-200 focus:ring-pink-300 focus:border-pink-300 rounded-md"
                    type="text"
                    placeholder="Full Name "
                  />
                  <input
                    name="email"
                    value={email}
                    onChange={onChangeHandler}
                    className="w-full mb-4 px-12 py-6 border text-2xl border-gray-200  focus:ring-pink-300 focus:border-pink-300 rounded-md"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <input
                    name="password"
                    value={password}
                    onChange={onChangeHandler}
                    className="w-full  px-12 mb-4 pb-4 pt-6 border text-2xl border-gray-200  focus:ring-pink-300 focus:border-pink-300 rounded-md"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {loading ? (
                    <LoadingComponent />
                  ) : (
                    <button className=" mb-4 md:mt-16 bg-pink-800  hover:bg-pink-900 text-white font-bold font-heading py-3 px-8 rounded-md uppercase">
                      Register
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        
        {/* <div
          className="hidden lg:block lg:absolute top-0 bottom-0 right-0 lg:w-3/6 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2017/03/29/04/47/high-heels-2184095_1280.jpg")',
          }}
        /> */}
     
    </>
  );
};

export default RegisterForm;
