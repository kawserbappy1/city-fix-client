import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCamera,
  FiSave,
  FiEdit2,
  FiX,
} from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { imageUpload } from "../../../Utilities/Utilities";

const EditProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid File",
          text: "Please upload a valid image file (JPEG, PNG, GIF, WebP)",
        });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "File size must be less than 2MB",
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleEditUserProfile = async (data) => {
    setIsUpdating(true);
    try {
      let photoURL = user.photoURL;
      if (imageFile) {
        try {
          const uploadedImageURL = await imageUpload(imageFile);
          photoURL = uploadedImageURL;
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
          Swal.fire({
            icon: "warning",
            title: "Image Upload Failed",
            text: "Profile will be updated without changing the image",
          });
        }
      }
      const profileUpdates = {
        displayName: data.name,
        photoURL: photoURL,
      };

      await updateUserProfile(profileUpdates);
      try {
        const userData = {
          displayName: data.name,
          photoURL: photoURL,
        };
        await axiosSecure.patch(`/users/${user.email}`, userData);
      } catch (dbError) {
        console.error("Database update failed:", dbError);
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been successfully updated!",
        showConfirmButton: false,
        timer: 2000,
      });

      // Reset form
      reset();
      setIsEditing(false);
      setImagePreview(null);
      setImageFile(null);

      // Page will automatically update because auth context state changed
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    reset({
      name: user?.displayName || "",
      email: user?.email || "",
      password: "",
      confirmPassword: "",
    });
    setImagePreview(null);
    setImageFile(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* View Mode */}
          {!isEditing ? (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={user?.photoURL || "https://via.placeholder.com/150"}
                      alt={user?.displayName || "User"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user?.displayName || "No Name"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {user?.email || "No Email"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {user?.metadata?.creationTime
                      ? `Member since ${new Date(
                          user.metadata.creationTime
                        ).toLocaleDateString()}`
                      : "Member"}
                  </p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500">
                      <FiUser className="w-5 h-5" />
                      <span className="text-sm font-medium">Full Name</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {user?.displayName || "Not set"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500">
                      <FiMail className="w-5 h-5" />
                      <span className="text-sm font-medium">Email Address</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {user?.email || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FiLock className="w-5 h-5" />
                    <span className="text-sm font-medium">Password</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    ••••••••
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <FiEdit2 className="w-5 h-5" />
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <form
              onSubmit={handleSubmit(handleEditUserProfile)}
              className="space-y-8"
            >
              {/* Form Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  Edit Profile
                </h2>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiX className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Profile Image Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={
                          imagePreview ||
                          user?.photoURL ||
                          "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2 absolute bottom-0 right-0">
                      {imagePreview ? (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          title="Remove image"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      ) : (
                        <label className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 cursor-pointer transition-colors">
                          <FiCamera className="w-5 h-5" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {imagePreview
                        ? "New image selected. Click X to remove."
                        : "Click the camera icon to upload a new photo"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Optional: Square image recommended, max 2MB
                    </p>
                    {imagePreview && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ New image ready to upload
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "Name must be less than 50 characters",
                        },
                      })}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      {...register("email")}
                      defaultValue={user?.email}
                      readOnly
                      disabled
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      {...register("password", {
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter new password"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Leave blank to keep current password
                  </p>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                {password && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        {...register("confirmPassword", {
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Confirm new password"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    isUpdating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
