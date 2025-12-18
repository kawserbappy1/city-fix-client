import React, { useState } from "react";
import { FaDownload, FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import jsPDF from "jspdf";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const StaffProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    data: staff = {},
    isLoading,
    isError,
    error,
    reset,
  } = useQuery({
    queryKey: ["staff", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/staff/${user.email}`);
      return res.data;
    },
  });

  // Open edit modal and populate form with current data
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const updateMutationStafProfile = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/staff/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "staff" });
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: "Staff has been approved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upadate staff info.",
      });
      console.error(err);
    },
  });
  // Handle form submission
  const handleupdateStaff = (data) => {
    console.log("Form data:", data);
    if (!staff?._id) {
      Swal.fire("Error", "Staff ID not found", "error");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this staff member?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve",
    }).then((result) => {
      if (result.isConfirmed) {
        updateMutationStafProfile.mutate({
          id: staff._id,
          data,
        });
      }
    });
    reset();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading staff information...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Yor are not Staff
          </h3>
          <p className="text-red-600">
            {error?.message || "Failed to load staff profile"}
          </p>
          <p className="text-sm text-red-500 mt-2">
            Please apply for staff in your menubar.
          </p>
        </div>
      </div>
    );
  }

  if (!staff?._id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Staff Not Found
          </h3>
          <p className="text-yellow-600">No staff profile found</p>
          <p className="text-sm text-yellow-500 mt-2">
            Please contact support or check your login details.
          </p>
        </div>
      </div>
    );
  }

  // Demo stats (you can fetch these from your API too)
  const stats = {
    completedProjects: 10,
    inProgress: 5,
    underReview: 3,
    totalProjects: 18,
  };

  // Download PDF function with better error handling
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();

      // Header
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("TECH SOLUTIONS LTD.", 20, 20);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("www.cityfix.com | info@cityfix.com | +880 1234-567890", 20, 28);

      doc.line(20, 35, 190, 35); // Horizontal line

      // Title
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`STAFF PROFILE: ${staff.name || "N/A"}`, 20, 45);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 55);

      let yPosition = 70;

      // Create sections with boxes
      const drawSection = (title, data, y) => {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(title, 20, y);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        // Make sure all values are strings
        data.forEach(([label, value], index) => {
          const stringValue = String(value || "N/A"); // Convert to string
          doc.text(`${label}:`, 25, y + 10 + index * 7);
          doc.text(stringValue, 80, y + 10 + index * 7);
        });

        // Draw box
        doc.setDrawColor(200, 200, 200);
        doc.rect(15, y - 5, 180, data.length * 7 + 15);

        return y + data.length * 7 + 25;
      };

      // Personal Info
      yPosition = drawSection(
        "Personal Information",
        [
          ["Full Name", staff.name],
          ["Email", staff.email],
          ["Phone", staff.phone],
          ["NID", staff.nid],
          ["Education", staff.education],
          ["Status", staff.status],
        ],
        yPosition
      );

      // Professional Info
      yPosition = drawSection(
        "Professional Information",
        [
          ["Expert Area", staff.category],
          ["Experience", staff.experience],
          ["Certificate", staff.certificate],
        ],
        yPosition
      );

      // Location Info
      yPosition = drawSection(
        "Location Information",
        [
          ["Division", staff.division],
          ["District", staff.district],
          ["Upazila", staff.upazila],
        ],
        yPosition
      );

      // Performance Stats - Convert numbers to strings
      yPosition = drawSection(
        "Performance Statistics",
        [
          ["Completed Projects", String(stats.completedProjects)], // Convert to string
          ["In Progress", String(stats.inProgress)], // Convert to string
          ["Under Review", String(stats.underReview)], // Convert to string
          ["Total Projects", String(stats.totalProjects)], // Convert to string
        ],
        yPosition
      );

      // Footer
      doc.setFontSize(8);
      doc.text("Official Document - Tech Solutions Ltd.", 105, yPosition + 20, {
        align: "center",
      });

      const fileName = `${(staff.name || "Staff").replace(
        /\s+/g,
        "_"
      )}_Profile_${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Download Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Staff Profile</h1>
        <div className="flex gap-3">
          <button
            onClick={handleEditClick}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaEdit />
            Edit Profile
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FaDownload />
            Download Profile
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 relative">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="md:w-1/3">
            <img
              src={staff.staffPhoto || "https://via.placeholder.com/300"}
              alt={staff.name}
              className="w-full h-auto rounded-lg shadow-md"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300";
              }}
            />
          </div>

          {/* Staff Information */}
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {staff.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{staff.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{staff.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">NID</p>
                  <p className="text-gray-900">{staff.nid || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Education</p>
                  <p className="text-gray-900">{staff.education || "N/A"}</p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Expert Area
                  </p>
                  <p className="text-gray-900">{staff.category || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Experience
                  </p>
                  <p className="text-gray-900">{staff.experience || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Certificate
                  </p>
                  <p className="text-gray-900">{staff.certificate || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      staff.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {staff.status || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Division</p>
                  <p className="text-gray-900">{staff.division || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">District</p>
                  <p className="text-gray-900">{staff.district || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Upazila</p>
                  <p className="text-gray-900">{staff.upazila || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Performance Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Completed Projects */}
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
              <span className="text-2xl font-bold text-green-600">
                {stats.completedProjects}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Projects successfully delivered
            </p>
          </div>

          {/* In Progress */}
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">In Work</h3>
              <span className="text-2xl font-bold text-blue-600">
                {stats.inProgress}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Projects currently working on
            </p>
          </div>

          {/* Under Review */}
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Review</h3>
              <span className="text-2xl font-bold text-yellow-600">
                {stats.underReview}
              </span>
            </div>
            <p className="text-sm text-gray-600">Projects under review</p>
          </div>

          {/* Total Projects */}
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Total</h3>
              <span className="text-2xl font-bold text-purple-600">
                {stats.totalProjects}
              </span>
            </div>
            <p className="text-sm text-gray-600">All assigned projects</p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Edit Staff Profile
                </h2>
                <button
                  onClick={closeEditModal}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <IoMdClose />
                </button>
              </div>

              {/* Edit Form */}
              <form
                onSubmit={handleSubmit(handleupdateStaff)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Personal Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={staff?.name}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        title="Named can not changed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={staff?.email}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        title="Email can not changed"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...register("phone", { required: true })}
                        defaultValue={staff?.phone}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="min-h-[10px">
                        {errors.phone?.type === "required" && (
                          <p className="text-red-500">
                            Phone number is required
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        NID Number
                      </label>
                      <input
                        type="text"
                        defaultValue={staff.nid}
                        {...register("nid", { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="min-h-[10px">
                        {errors.nid?.type === "required" && (
                          <p className="text-red-500">nid number is required</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Professional Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Education
                      </label>
                      <input
                        type="text"
                        defaultValue={staff.education}
                        {...register("education")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expert Area
                      </label>
                      <input
                        type="text"
                        defaultValue={staff.category}
                        {...register("category", { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="min-h-[10px">
                        {errors.nid?.type === "required" && (
                          <p className="text-red-500">nid number is required</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Experience
                      </label>
                      <input
                        type="text"
                        defaultValue={staff.experience}
                        {...register("experience")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Certificate
                      </label>
                      <input
                        type="text"
                        defaultValue={staff.certificate}
                        {...register("certificate")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Location Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Division
                      </label>
                      <input
                        type="text"
                        defaultValue={staff.division}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        District
                      </label>
                      <input
                        type="text"
                        defaultValue={staff.district}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upazila
                      </label>
                      <input
                        type="text"
                        defaultValue={staff.upazila}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select
                    name="availability"
                    defaultValue={staff.availability}
                    {...register("availability", { required: true })}
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option defaultValue={staff.availability}>
                      {staff.availability}
                    </option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contactual">Contactual</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <div className="min-h-[10px">
                    {errors.availability?.type === "required" && (
                      <p className="text-red-500">availability is required</p>
                    )}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffProfile;
