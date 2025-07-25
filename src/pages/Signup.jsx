import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import PageTransitions from "../components/PageTransitions";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    toast.success("Signup successful!");
  };

  const navigate = useNavigate();

  return (
    <>
    
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <Toaster position="top-center" />
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md flex flex-col gap-3 items-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-center mb-2">
          Create an account
        </h2>

        <div className="w-full flex gap-2">
          <input
            type="text"
            placeholder="First name"
            autoComplete="given-name"
            {...register("firstName", { required: "First name required" })}
            className={`w-1/2 border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none ${
              errors.firstName ? "border-red-400" : ""
            }`}
          />
          <input
            type="text"
            placeholder="Last name"
            autoComplete="family-name"
            {...register("lastName", { required: "Last name required" })}
            className={`w-1/2 border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none ${
              errors.lastName ? "border-red-400" : ""
            }`}
          />
        </div>
        <div className="w-full flex gap-2 text-xs text-red-500">
          <span className="w-1/2">{errors.firstName?.message}</span>
          <span className="w-1/2">{errors.lastName?.message}</span>
        </div>

        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          {...register("email", {
            required: "Email required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          className={`w-full border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none ${
            errors.email ? "border-red-400" : ""
          }`}
        />
        {errors.email && (
          <span className="w-full text-xs text-red-500">
            {errors.email.message}
          </span>
        )}

        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          {...register("password", {
            required: "Password required",
            minLength: { value: 6, message: "Min 6 characters" },
          })}
          className={`w-full border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none ${
            errors.password ? "border-red-400" : ""
          }`}
        />
        {errors.password && (
          <span className="w-full text-xs text-red-500">
            {errors.password.message}
          </span>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white font-medium py-2 mt-2 rounded-none hover:opacity-90 transition-all cursor-pointer"
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>

        <div className="mt-2 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="underline text-black cursor-pointer"
            role="button"
            tabIndex={0}
          >
            Log in
          </span>
        </div>

        <div className="w-full flex items-center my-2">
          <hr className="border-gray-300 flex-1" />
          <span className="mx-2 text-xs text-gray-400">OR</span>
          <hr className="border-gray-300 flex-1" />
        </div>

        <button
          type="button"
          className="w-full border border-gray-300 bg-white flex items-center justify-center gap-2 py-2 text-sm rounded-none hover:bg-gray-100 transition-all cursor-pointer"
        >
          <span className="text-lg">
            <FaApple />
          </span>
          Continue with Apple
        </button>
        <button
          type="button"
          className="w-full border border-gray-300 bg-white flex items-center justify-center gap-2 py-2 text-sm rounded-none hover:bg-gray-100 transition-all cursor-pointer"
        >
          <span className="text-base ">
            <FcGoogle />
          </span>
          Continue with Google
        </button>

        <div className="text-xs text-gray-400 mt-2 text-center">
          <a href="#" className="underline cursor-pointer">
            Terms of Use
          </a>
          &nbsp;|&nbsp;
          <a href="#" className="underline cursor-pointer">
            Privacy Policy
          </a>
        </div>
      </motion.form>
    </div>
    </>
    
  );
};

export default Signup;
