/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  // const fileRef = useRef(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* <input type="file" ref={fileRef} hidden accept="image/*" /> */}
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 cursor-pointer object-cover self-center my-2"
          // onClick={() => fileRef.current.click()}
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border border-slate-500 p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border border-slate-500 p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border border-slate-500 p-3 rounded-lg "
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 transition-all disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between items-center mt-4">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
