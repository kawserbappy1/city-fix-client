// components/ManagePayment.jsx
import { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiDollarSign,
  FiMail,
  FiFileText,
  FiCopy,
  FiChevronDown,
  FiChevronUp,
  FiRefreshCw,
  FiPrinter,
  FiExternalLink,
  FiCalendar,
} from "react-icons/fi";
import { MdOutlinePayment, MdOutlineAttachMoney } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";

const ManagePayment = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch payments data
  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage-payment");
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // table or card

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format short date
  const formatShortDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border border-red-200";
      case "refunded":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return <FiCheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <FiClock className="w-4 h-4 text-yellow-600" />;
      case "failed":
        return <FiXCircle className="w-4 h-4 text-red-600" />;
      default:
        return <FiClock className="w-4 h-4 text-gray-600" />;
    }
  };

  // Filter payments
  const filteredPayments = payments
    .filter((payment) => {
      const matchesSearch =
        payment.customer_email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.issueName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transitionId
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.issueId?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        payment.PaidStatus?.toLowerCase() === statusFilter.toLowerCase();

      // Date filtering
      const paymentDate = new Date(payment.paidAt);
      const now = new Date();
      const diffTime = now - paymentDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "today" && diffDays < 1) ||
        (dateFilter === "week" && diffDays < 7) ||
        (dateFilter === "month" && diffDays < 30);

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));

  // Calculate statistics
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidCount = payments.filter((p) => p.PaidStatus === "paid").length;
  const pendingCount = payments.filter(
    (p) => p.PaidStatus === "pending"
  ).length;
  const failedCount = payments.filter((p) => p.PaidStatus === "failed").length;

  // Toggle row selection
  const togglePaymentSelection = (id) => {
    if (selectedPayments.includes(id)) {
      setSelectedPayments(selectedPayments.filter((pId) => pId !== id));
    } else {
      setSelectedPayments([...selectedPayments, id]);
    }
  };

  // Select all
  const toggleSelectAll = () => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(filteredPayments.map((p) => p.transitionId));
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Generate receipt for single payment
  const generateReceipt = (payment) => {
    setIsGeneratingPDF(true);
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;

      // Header
      pdf.setFillColor(79, 70, 229);
      pdf.rect(0, 0, pageWidth, 40, "F");

      pdf.setFontSize(24);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.text("PAYMENT RECEIPT", pageWidth / 2, 25, { align: "center" });

      pdf.setFontSize(12);
      pdf.text("CityCare Solutions", pageWidth / 2, 35, { align: "center" });

      // Receipt Details
      let y = 60;

      // Invoice Info
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "bold");
      pdf.text("RECEIPT INFORMATION", margin, y);

      y += 10;
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");

      const details = [
        [`Receipt #:`, payment.transitionId?.slice(-12)],
        [`Date:`, formatDate(payment.paidAt)],
        [`Status:`, payment.PaidStatus?.toUpperCase()],
      ];

      details.forEach(([label, value]) => {
        pdf.text(label, margin, y);
        pdf.setFont("helvetica", "bold");
        pdf.text(value, margin + 40, y);
        pdf.setFont("helvetica", "normal");
        y += 7;
      });

      // Customer Info
      y += 5;
      pdf.setFont("helvetica", "bold");
      pdf.text("CUSTOMER INFORMATION", margin, y);

      y += 10;
      pdf.setFont("helvetica", "normal");

      const customerDetails = [
        [`Email:`, payment.customer_email],
        [`Issue:`, payment.issueName],
        [`Issue ID:`, payment.issueId?.slice(-8)],
      ];

      customerDetails.forEach(([label, value]) => {
        pdf.text(label, margin, y);
        pdf.setFont("helvetica", "bold");
        pdf.text(value, margin + 40, y);
        pdf.setFont("helvetica", "normal");
        y += 7;
      });

      // Payment Summary
      y += 10;
      pdf.setFont("helvetica", "bold");
      pdf.text("PAYMENT SUMMARY", margin, y);

      y += 10;
      pdf.setFont("helvetica", "normal");

      // Table header
      pdf.setFillColor(243, 244, 246);
      pdf.rect(margin, y, pageWidth - 2 * margin, 10, "F");
      pdf.setFont("helvetica", "bold");
      pdf.text("Description", margin + 5, y + 7);
      pdf.text("Amount", pageWidth - margin - 30, y + 7);

      y += 15;
      pdf.setFont("helvetica", "normal");
      pdf.text("Issue Boost Service", margin + 5, y);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${payment.amount}৳`, pageWidth - margin - 30, y);

      y += 10;
      pdf.setDrawColor(229, 231, 235);
      pdf.line(margin, y, pageWidth - margin, y);

      y += 10;
      pdf.setFontSize(14);
      pdf.text("TOTAL:", margin + 5, y);
      pdf.setFontSize(16);
      pdf.text(`${payment.amount}৳`, pageWidth - margin - 30, y);

      // Footer
      y = 250;
      pdf.setFontSize(10);
      pdf.setTextColor(107, 114, 128);
      pdf.text("Thank you for your payment!", pageWidth / 2, y, {
        align: "center",
      });
      pdf.text("This is a computer-generated receipt", pageWidth / 2, y + 5, {
        align: "center",
      });

      pdf.save(
        `receipt_${payment.transitionId?.slice(-8)}_${new Date().getTime()}.pdf`
      );
    } catch (error) {
      console.error("Error generating receipt:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <MdOutlinePayment className="text-blue-600" />
              Payment Management
            </h1>
            <p className="text-gray-600">
              Manage and track all payment transactions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setViewMode(viewMode === "table" ? "card" : "table")
              }
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              {viewMode === "table" ? "Card View" : "Table View"}
            </button>
            <button
              onClick={() => refetch()}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              title="Refresh"
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalAmount}৳
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <MdOutlineAttachMoney className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              {payments.length} total transactions
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Paid</p>
                <p className="text-2xl font-bold text-green-600">{paidCount}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Successful payments
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingCount}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Awaiting confirmation
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Failed</p>
                <p className="text-2xl font-bold text-red-600">{failedCount}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <FiXCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Unsuccessful attempts
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search payments by email, issue name, or transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {/* Selected Actions */}
          {selectedPayments.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiFileText className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium text-blue-800">
                  {selectedPayments.length} payment
                  {selectedPayments.length !== 1 ? "s" : ""} selected
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // Bulk download receipts
                    alert(`Download ${selectedPayments.length} receipts`);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
                >
                  <FiDownload className="w-4 h-4" />
                  Download Selected
                </button>
                <button
                  onClick={() => setSelectedPayments([])}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedPayments.length === filteredPayments.length &&
                      filteredPayments.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    Date
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Customer
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Issue
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Transaction ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <MdOutlinePayment className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        No Payments Found
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        {searchTerm ||
                        statusFilter !== "all" ||
                        dateFilter !== "all"
                          ? "No payments match your search criteria. Try adjusting your filters."
                          : "No payment transactions available yet."}
                      </p>
                      {(searchTerm ||
                        statusFilter !== "all" ||
                        dateFilter !== "all") && (
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("all");
                            setDateFilter("all");
                          }}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.transitionId}
                    className={`hover:bg-gray-50 transition-colors ${
                      expandedRows.includes(payment.transitionId)
                        ? "bg-blue-50"
                        : ""
                    }`}
                  >
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(
                          payment.transitionId
                        )}
                        onChange={() =>
                          togglePaymentSelection(payment.transitionId)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-700">
                        <div className="font-medium">
                          {formatShortDate(payment.paidAt)}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(payment.paidAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiMail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">
                            {payment.customer_email}
                          </div>
                          <div className="text-xs text-gray-500">Customer</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-800 text-sm">
                          {payment.issueName}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {payment.issueId?.slice(-8)}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <FiDollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-gray-800">
                          {payment.amount}৳
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(
                          payment.PaidStatus
                        )}`}
                      >
                        {getStatusIcon(payment.PaidStatus)}
                        {payment.PaidStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded truncate max-w-[120px]">
                          {payment.transitionId?.slice(-12)}
                        </code>
                        <button
                          onClick={() => copyToClipboard(payment.transitionId)}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Copy Transaction ID"
                        >
                          <FiCopy className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => generateReceipt(payment)}
                          disabled={isGeneratingPDF}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 disabled:opacity-50"
                          title="Download Receipt"
                        >
                          {isGeneratingPDF ? (
                            <FiRefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <FiDownload className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() =>
                            toggleRowExpansion(payment.transitionId)
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          title="View Details"
                        >
                          {expandedRows.includes(payment.transitionId) ? (
                            <FiChevronUp className="w-4 h-4" />
                          ) : (
                            <FiChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <div className="relative group">
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <BsThreeDotsVertical className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 hidden group-hover:block">
                            <div className="py-1">
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                <FiEye className="w-4 h-4" />
                                View Details
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                <FiPrinter className="w-4 h-4" />
                                Print Receipt
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                <FiExternalLink className="w-4 h-4" />
                                View Issue
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredPayments.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filteredPayments.length}</span>{" "}
              of <span className="font-semibold">{payments.length}</span>{" "}
              payments
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Total:{" "}
                <span className="font-bold text-blue-600">
                  {filteredPayments.reduce((sum, p) => sum + p.amount, 0)}৳
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <FiPrinter className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={() => {
                    // Export all filtered payments
                    alert(`Export ${filteredPayments.length} payments`);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 flex items-center gap-2"
                >
                  <FiDownload className="w-4 h-4" />
                  Export All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {payments.length === 0 && !isLoading && (
        <div className="mt-12 text-center">
          <div className="w-64 h-64 mx-auto mb-6">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute inset-8 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-70"></div>
              <div className="absolute inset-16 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full flex items-center justify-center">
                <MdOutlinePayment className="w-20 h-20 text-white" />
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No Payments Yet
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            When payments are made, they will appear here for management.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManagePayment;
