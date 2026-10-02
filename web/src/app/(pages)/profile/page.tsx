"use client";

import React from "react";
import UserprofileComponent from "@/components/userprofileComponent";
import UserCreatedGigStatus from "@/components/UserCreatedGigStatus";
import UserApplyGigStatus from "@/components/UserApplyGigStatus.tsx";

const Profile = () => {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Profile Information */}
        <UserprofileComponent />

        {/* Applied Gigs */}
        <UserApplyGigStatus/>

        {/* Created Gigs */}
        <UserCreatedGigStatus />

      </div>
    </main>
  );
};

export default Profile;