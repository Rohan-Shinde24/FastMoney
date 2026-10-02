"use client";

import React from "react";
import { useForm } from "react-hook-form";

type WorkFormData = {
  title: string;
  description: string;
  category: string;
  location: string;
  workType: string;
  deadline: string;
  budget: number;
  skills: string;
};

const CreateWorkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkFormData>();

  const onSubmit = (data: WorkFormData) => {
    console.log("Create Work:", data);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Create a Work
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Post a small task and find someone who can complete it.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Work Title
          </label>

          <input
            type="text"
            placeholder="Example: Help with product packaging"
            {...register("title", {
              required: "Work title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Title cannot exceed 100 characters",
              },
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
          />

          {errors.title && (
            <p className="mt-1 text-xs text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Explain what needs to be done..."
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
          />

          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category
          </label>

          <select
            {...register("category", {
              required: "Please select a category",
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
          >
            <option value="">Select category</option>
            <option value="delivery">Delivery</option>
            <option value="packaging">Packaging</option>
            <option value="event">Event Help</option>
            <option value="design">Design</option>
            <option value="writing">Writing</option>
            <option value="education">Education</option>
            <option value="technology">Technology</option>
            <option value="other">Other</option>
          </select>

          {errors.category && (
            <p className="mt-1 text-xs text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Location
          </label>

          <input
            type="text"
            placeholder="Example: Miraj, Maharashtra"
            {...register("location", {
              required: "Location is required",
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
          />

          {errors.location && (
            <p className="mt-1 text-xs text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Work Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Work Type
          </label>

          <select
            {...register("workType", {
              required: "Please select work type",
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
          >
            <option value="">Select work type</option>
            <option value="local">Local / In Person</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>

          {errors.workType && (
            <p className="mt-1 text-xs text-red-500">
              {errors.workType.message}
            </p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Deadline
          </label>

          <input
            type="date"
            {...register("deadline", {
              required: "Deadline is required",
            })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
          />

          {errors.deadline && (
            <p className="mt-1 text-xs text-red-500">
              {errors.deadline.message}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Amount
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              ₹
            </span>

            <input
              type="number"
              min="1"
              placeholder="500"
              {...register("budget", {
                required: "Amount is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Amount must be greater than 0",
                },
              })}
              className="w-full rounded-xl border border-gray-300 py-3 pl-9 pr-4 text-sm outline-none focus:border-black"
            />
          </div>

          {errors.budget && (
            <p className="mt-1 text-xs text-red-500">
              {errors.budget.message}
            </p>
          )}

          <p className="mt-1 text-xs text-gray-400">
            Amount is displayed only. No payment is processed through
            GigLocal.
          </p>
        </div>

        {/* Skills */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Required Skills
          </label>

          <input
            type="text"
            placeholder="Packing, Communication, Delivery"
            {...register("skills")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
          />

          <p className="mt-1 text-xs text-gray-400">
            Separate multiple skills with commas.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Create Work
        </button>
      </form>
    </div>
  );
};

export default CreateWorkForm;