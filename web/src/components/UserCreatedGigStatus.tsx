"use client";

import React, { useState } from "react";

type CreatedGig = {
  id: number;
  title: string;
  amount: number;
  status: "Open" | "In Progress" | "Completed" | "Cancelled";
};

const initialGigs: CreatedGig[] = [
  { id: 1, title: "Need Help With Packaging", amount: 500, status: "Open" },
  { id: 2, title: "Event Setup Assistant", amount: 800, status: "In Progress" },
  { id: 3, title: "Local Delivery Assistance", amount: 300, status: "Completed" },
];

const UserCreatedGigStatus = () => {
  const [gigs, setGigs] = useState(initialGigs);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState({ title: "", amount: 0 });

  const startEdit = (gig: CreatedGig) => {
    setDraft({ title: gig.title, amount: gig.amount });
    setEditingId(gig.id);
  };

  const saveEdit = (id: number) => {
    if (!draft.title.trim() || draft.amount < 0) return;

    setGigs((current) =>
      current.map((gig) =>
        gig.id === id
          ? { ...gig, title: draft.title.trim(), amount: draft.amount }
          : gig
      )
    );

    setEditingId(null);
  };

  const updateStatus = (
    id: number,
    status: CreatedGig["status"]
  ) => {
    setGigs((current) =>
      current.map((gig) => (gig.id === id ? { ...gig, status } : gig))
    );
  };

  const total = gigs.length;
  const active = gigs.filter(
    (gig) => gig.status === "Open" || gig.status === "In Progress"
  ).length;
  const completed = gigs.filter((gig) => gig.status === "Completed").length;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">My Created Gigs</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage the gigs you have posted.
          </p>
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
          {total} Total
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <p className="text-xl font-bold text-gray-900">{total}</p>
          <p className="mt-1 text-xs text-gray-500">All Gigs</p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <p className="text-xl font-bold text-gray-900">{active}</p>
          <p className="mt-1 text-xs text-gray-500">Active</p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3 text-center">
          <p className="text-xl font-bold text-gray-900">{completed}</p>
          <p className="mt-1 text-xs text-gray-500">Completed</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {gigs.map((gig) => (
          <div
            key={gig.id}
            className="rounded-xl border border-gray-100 p-4"
          >
            {editingId === gig.id ? (
              <div className="space-y-3">
                <input
                  value={draft.title}
                  onChange={(e) =>
                    setDraft({ ...draft, title: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-indigo-500"
                  placeholder="Gig title"
                />

                <input
                  type="number"
                  min="0"
                  value={draft.amount}
                  onChange={(e) =>
                    setDraft({ ...draft, amount: Number(e.target.value) })
                  }
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-indigo-500"
                  placeholder="Gig amount"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(gig.id)}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {gig.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Displayed amount: ₹{gig.amount}
                  </p>
                </div>

                <button
                  onClick={() => startEdit(gig)}
                  className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 sm:self-center"
                >
                  Edit Gig
                </button>
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-xs text-gray-500">Gig status:</span>

              <select
                aria-label={`Status for ${gig.title}`}
                value={gig.status}
                onChange={(e) =>
                  updateStatus(gig.id, e.target.value as CreatedGig["status"])
                }
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}

        {gigs.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-500">
            You have not created any gigs yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default UserCreatedGigStatus;