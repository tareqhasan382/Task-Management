"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import LoaderModal from "./LoaderModal";

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(4).max(10).required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    // console.log("data:", data);
    try {
      setLoading(true);
      const result = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (result.ok) {
        setLoading(false);
        toast.success("User created successfully");
        router.push("/sign-in");
      } else if (result.status === 409) {
        setLoading(false);
        toast.warning("User already exist");
        router.push("/sign-in");
      } else {
        setLoading(false);
        toast.error("User created failed");
        //    form.reset()
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  if(loading){
    return <LoaderModal show={loading} />
   }
  return (
    <div className=" flex flex-col items-center justify-center h-full text-white ">
      
      <div className=" my-10 h-full pb-10 rounded-lg shadow-lg flex flex-col bg-white text-black px-6 md:px-10 border border-gray-300">
        <form onSubmit={handleSubmit(onSubmit)} className="  ">
          <h1 className=" py-5 font-bold mb-4 text-center text-5xl ">
            Register
          </h1>
          <div className=" flex flex-col mb-4">
            <label className=" mb-2 ">Name</label>
            <input
              className=" p-2 border-gray-300 border-[1px] rounded-lg w-[300px]  outline-none focus:border-gray-600 text-black  "
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className=" text-sm text-red-500 ">
                {errors?.name?.message}
              </span>
            )}
          </div>
          <div className=" flex flex-col mb-4">
            <label className=" mb-2 ">Email</label>
            <input
              className=" p-2 border-gray-300 border-[1px] rounded-lg w-[300px]  outline-none focus:border-gray-600 text-black  "
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className=" text-sm text-red-500 ">
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div className=" flex flex-col mb-4">
            <label className=" mb-2 ">Password</label>
            <input
              className=" p-2 border-gray-300 border-[1px] rounded-lg w-[300px]  outline-none focus:border-gray-600 text-black "
              type="text"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className=" text-sm text-red-500 ">
                {errors?.password?.message}
              </span>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className=" w-full text-xl font-bold p-2 rounded-lg bg-black hover:bg-gray-800 duration-700 text-white mb-4  mt-2"
          >
            {loading ? "Loading..." : "Submit"}
          </button>

          <div className=" w-full flex items-center justify-center text-gray-600">
            <hr className="w-1/2 border-gray-400" /> OR
            <hr className="w-1/2 border-gray-400" />
          </div>
        </form>
        <div className=" w-full flex flex-col gap-2 py-5 ">
          <button className=" flex flex-row items-center justify-around text-base font-semibold p-2 outline outline-1 outline-black rounded-lg bg-white text-black hover:bg-black hover:text-white duration-700">
            <FcGoogle size={30} /> Continue with Google
          </button>
          <button className=" flex flex-row items-center justify-around text-base font-semibold p-2 outline outline-1 outline-black rounded-lg bg-white text-black hover:bg-black hover:text-white duration-700">
            <FaGithub size={30} /> Continue with Github
          </button>
        </div>
        <span className=" text-right ">
          Already have an account?
          <Link href="/sign-in" className=" underline text-blue-600 pl-2 ">
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;

//SignUpForm