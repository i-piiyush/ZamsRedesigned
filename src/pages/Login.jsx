import React from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    // Simulate login
    console.log(data)
    toast.success('Logged in!')
  }

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <Toaster position="top-center" />
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs flex flex-col gap-3 items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-semibold text-xl mb-1 text-center">Login to your account</h2>

        <input
          type="text"
          placeholder="User ID"
          {...register('login', { required: 'User ID required' })}
          className={`w-full border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:border-black text-sm
            ${errors.login ? 'border-red-400' : ''} rounded-none`}
          autoComplete="username"
        />
        {errors.login && (
          <span className="text-xs text-red-500 w-full text-left">{errors.login.message}</span>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password required' })}
          className={`w-full border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:border-black text-sm
            ${errors.password ? 'border-red-400' : ''} rounded-none`}
          autoComplete="current-password"
        />
        {errors.password && (
          <span className="text-xs text-red-500 w-full text-left">{errors.password.message}</span>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 mt-2 font-medium rounded-none hover:opacity-90 transition-all cursor-pointer"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-xs mt-4 text-center text-gray-500">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => {
              navigate('/signup')
            }}
            className="text-black underline cursor-pointer"
            role="button"
            tabIndex={0}
          >
            Register
          </span>
        </div>
      </motion.form>
    </div>
  )
}

export default Login
