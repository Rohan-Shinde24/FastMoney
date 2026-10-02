"use client";

import React, { useState } from "react";

type AppliedGig = {
  id: number;
  title: string;
  amount: number;
  status: "Pending" | "Accepted" | "Rejected" | "Completed";
};

const initialGigs: AppliedGig[] = [
  { id: 1, title: "Help with Product Packaging", amount: 500, status: "Pending" },
  { id: 2, title: "Deliver Local Documents", amount: 300, status: "Accepted" },
  { id: 3, title: "Help Organize an Event", amount: 800, status: "Completed" },
];

const UserApplyGigStatus = () => {
  const [gigs, setGigs] = useState(initialGigs);
  const [editingId, setEditingId] = useState<number | null>(null);

  const updateStatus = (id: number, status: AppliedGig["status"]) => {
    setGigs((current) =>
      current.map((gig) => (gig.id === id ? { ...gig, status } : gig))
    );
    setEditingId(null);
  };

  const counts = {
    Total: gigs.length,
    Pending: gigs.filter((g) => g.status === "Pending").length,
    Accepted: gigs.filter((g) => g.status === "Accepted").length,
    Completed: gigs.filter((g) => g.status === "Completed").length,
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Applied Gigs</h2>
          <p className="mt-1 text-sm text-gray-500">
            Track the gigs you have applied for.
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
          {counts.Total} Total
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {(["Pending", "Accepted", "Completed"] as const).map((status) => (
          <div key={status} className="rounded-xl bg-gray-50 p-3 text-center">
            <p className="text-xl font-bold text-gray-900">{counts[status]}</p>
            <p className="mt-1 text-xs text-gray-500">{status}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {gigs.map((gig) => (
          <div
            key={gig.id}
            className="flex flex-col justify-between gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{gig.title}</h3>
              <p className="mt-1 text-sm text-gray-500">
                ₹{gig.amount} · Application #{gig.id}
              </p>
              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  gig.status === "Accepted"
                    ? "bg-green-50 text-green-700"
                    : gig.status === "Completed"
                    ? "bg-blue-50 text-blue-700"
                    : gig.status === "Rejected"
                    ? "bg-red-50 text-red-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {gig.status}
              </span>
            </div>

            <button
              onClick={() =>
                setEditingId(editingId === gig.id ? null : gig.id)
              }
              className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 sm:self-center"
            >
              {editingId === gig.id ? "Cancel" : "Edit"}
            </button>

            {editingId === gig.id && (
              <select
                aria-label={`Update status for ${gig.title}`}
                value={gig.status}
                onChange={(e) =>
                  updateStatus(gig.id, e.target.value as AppliedGig["status"])
                }
                className="rounded-lg border border-gray-300 p-2 text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
              </select>
            )}
          </div>
        ))}

        {gigs.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-500">
            You have not applied for any gigs yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default UserApplyGigStatus;