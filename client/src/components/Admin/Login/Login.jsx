import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      <div className="min-h-[84vh] bg-gray-100 flex justify-center items-center">
      <div className="w-4/5 md:w-3/5 bg-white rounded-lg shadow-md px-6 pb-10">
        <div className="mb-6">
          <div className=" ml-6 pt-10 font-semibold text-[#252525] text-2xl leading-[48px]">
            Log In
          </div>
          <div className=" flex ml-8">
            <div className="font-normal text-[#696969] text-base">
              Not a User...
            </div>
            <Link
              to={"/signup"}
              className="font-normal text-[#333333] text-base ml-2 underline"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div></div>
        <form onSubmit={submitHandler}>
          <div className="m-6 flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full md:w-1/2 m-2 md:m-6 mb-6 md:mb-12">
              <label
                className="block text-gray-700 text-base mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full bg-gray-200 border border-gray-300 rounded px-4 py-3"
                type="email"
                name="email"
                id="email"
                autoComplete="username"
                placeholder="Your Email"
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 m-2 md:m-6">
              <label
                className="block text-gray-700 text-base mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full bg-gray-200 border border-gray-300 rounded px-4 py-3"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                autoComplete="current-password"
                // onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-full md:w-2/4  bg-blue-100 text-white text-base font-medium py-3 rounded hover:bg-blue-950"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login