/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

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

  async function handleShowListings() {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/v1/users/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  async function handleDeleteListing(id) {
    try {
      const res = await fetch(`/api/v1/listings/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (error) {
      console.log(error.message);
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
        <Link
          to="/create-listing"
          className="bg-green-700 text-center p-3 uppercase text-white rounded-lg hover:opacity-95 transition-all"
        >
          Create Listing
        </Link>
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

      <button onClick={handleShowListings} className="text-green-700 w-full">
        Show listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-semibold text-2xl mt-7">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className=" border border-slate-400 rounded-lg p-3 flex items-center justify-between gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold flex-1 hover:underline  truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <button className="text-green-700 uppercase">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
