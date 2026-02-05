/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  // const fileRef = useRef(null);

  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      avatar: currentUser.avatar,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/v1/users/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  async function handleDeleteUser() {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/v1/users/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  async function handleSignOut() {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/v1/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess());
      // navigate("/sign-in");
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          defaultValue={currentUser.username}
          id="username"
          className="border border-slate-500 p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border border-slate-500 p-3 rounded-lg "
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border border-slate-500 p-3 rounded-lg "
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 transition-all disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between items-center mt-4">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
  );
}
