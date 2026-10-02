"use client";

import React, { useState } from "react";

const UserprofileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Rohan Shinde");
  const [bio, setBio] = useState(
    "Full Stack Developer | Finding opportunities and completing gigs."
  );

  return (
    <section className="flex w-full flex-col items-center rounded-2xl bg-white px-4 py-8 text-center">
      {/* Profile Image */}
      <div className="relative">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Profile"
          className="h-28 w-28 rounded-full border-4 border-gray-100 object-cover shadow-sm"
        />

        <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white bg-green-500" />
      </div>

      {/* Name */}
      {isEditing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-center text-lg font-semibold text-gray-900 outline-none focus:border-blue-500"
          placeholder="Your name"
        />
      ) : (
        <h1 className="mt-4 text-2xl font-bold text-gray-900">{name}</h1>
      )}

      {/* Bio */}
      {isEditing ? (
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-3 w-full max-w-sm rounded-lg border border-gray-300 p-3 text-center text-sm text-gray-700 outline-none focus:border-blue-500"
          rows={3}
          placeholder="Write your bio"
        />
      ) : (
        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
          {bio}
        </p>
      )}

      {/* Rating and Score */}
      <div className="mt-6 flex items-center justify-center gap-12">
        <div>
          <p className="text-lg font-bold text-gray-900">4.8 ★</p>
          <p className="mt-1 text-xs text-gray-500">Rating</p>
        </div>

        <div className="h-10 w-px bg-gray-200" />

        <div>
          <p className="text-lg font-bold text-gray-900">920</p>
          <p className="mt-1 text-xs text-gray-500">Gig Score</p>
        </div>
      </div>

      {/* Edit Profile */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="mt-6 rounded-full border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
      >
        {isEditing ? "Save Profile" : "Edit Profile"}
      </button>
    </section>
  );
};

export default UserprofileComponent;