// components/BoostIssue.jsx
import { useState } from "react";
import { jsPDF } from "jspdf";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiZap,
  FiArrowUp,
  FiFileText,
  FiDownload,
} from "react-icons/fi";
import {
  MdOutlineFileDownload,
  MdOutlinePriorityHigh,
  MdOutlineTimer,
} from "react-icons/md";
import { GiRapidshareArrow } from "react-icons/gi";
import { TbBrandSpeedtest } from "react-icons/tb";
import useAuth from "./../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const BoostIssue = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isBoosting, setIsBoosting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch data
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["boost-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/make-boost-issue?email=${user?.email}`
      );
      return res.data;
    },
  });

  // Fetch data to create invoice
  const { data: invoices = [] } = useQuery({
    queryKey: ["invoiceData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/invoice-data");
      return res.data;
    },
  });

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

  // Format date for PDF
  const formatDateForPDF = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status color
  const getStatusColor = (workflow) => {
    switch (workflow?.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "working":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "in-progress":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "waiting":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Get status text
  const getStatusText = (workflow) => {
    switch (workflow?.toLowerCase()) {
      case "resolved":
        return "Resolved";
      case "working":
        return "In Progress";
      case "in-progress":
        return "Assigned";
      case "waiting":
        return "Waiting";
      default:
        return "Pending";
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle boost click
  const handleBoostClick = (issue) => {
    setSelectedIssue(issue);
  };

  // Handle boost confirmation
  const handleBoostConfirm = async () => {
    if (!selectedIssue) return;

    setIsBoosting(true);

    try {
      const paymentInfo = {
        issueId: selectedIssue._id,
        email: selectedIssue.email,
        issueName: selectedIssue.issueName,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      }

      setSelectedIssue(null);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to create payment session. Please try again.");
    } finally {
      setIsBoosting(false);
    }
  };

  // Generate and download PDF invoice
  const generateInvoicePDF = (issueId) => {
    try {
      setIsGeneratingPDF(true);

      // Find the invoice for this issue
      const invoice = invoices.find((inv) => inv.issueId === issueId);

      if (!invoice) {
        alert("No invoice found for this issue");
        return;
      }

      // Create new jsPDF instance
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;

      // Set font
      pdf.setFont("helvetica");

      // Helper function to add text
      const addText = (text, x, y, maxWidth = null) => {
        if (maxWidth) {
          const lines = pdf.splitTextToSize(text, maxWidth);
          pdf.text(lines, x, y);
          return lines.length * 5;
        } else {
          pdf.text(text, x, y);
          return 5;
        }
      };

      // Header Section with gradient effect
      pdf.setFillColor(79, 70, 229); // Blue-600
      pdf.rect(0, 0, pageWidth, 40, "F");

      // Company Name
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(255, 255, 255);
      pdf.text("CITYCARE SOLUTIONS", margin, 25);

      // Invoice Title
      pdf.setFontSize(32);
      pdf.text("INVOICE", pageWidth - margin - 50, 25);

      // White Logo/Text
      pdf.setFontSize(10);
      pdf.text("Issue Resolution Platform", margin, 33);

      // Invoice Details Section
      const detailsY = 55;
      pdf.setFontSize(11);
      pdf.setTextColor(75, 85, 99); // Gray-600
      pdf.setFont("helvetica", "normal");

      // Invoice Number (using transactionId)
      pdf.text("INVOICE #:", margin, detailsY);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(31, 41, 55); // Gray-800
      pdf.text(
        invoice.transitionId?.slice(-12) || "N/A",
        margin + 35,
        detailsY
      );

      // Date
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(75, 85, 99);
      pdf.text("DATE:", margin, detailsY + 7);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(31, 41, 55);
      pdf.text(formatDateForPDF(invoice.paidAt), margin + 35, detailsY + 7);

      // Status
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(75, 85, 99);
      pdf.text("STATUS:", pageWidth - margin - 60, detailsY);
      pdf.setFont("helvetica", "bold");
      const statusColor =
        invoice.PaidStatus === "paid" ? [34, 197, 94] : [245, 158, 11]; // Green or Yellow
      pdf.setTextColor(...statusColor);
      pdf.text(
        invoice.PaidStatus?.toUpperCase() || "PENDING",
        pageWidth - margin - 25,
        detailsY
      );

      // From/To Section
      const fromToY = 75;

      // From (Company)
      pdf.setFontSize(12);
      pdf.setTextColor(31, 41, 55);
      pdf.setFont("helvetica", "bold");
      pdf.text("FROM:", margin, fromToY);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      let textY = fromToY + 7;
      const companyInfo = [
        "CityCare Solutions",
        "Issue Resolution Platform",
        "Dhaka, Bangladesh",
        "contact@citycare.com",
        "Phone: +880 1234 567890",
      ];

      companyInfo.forEach((line) => {
        pdf.text(line, margin, textY);
        textY += 5;
      });

      // To (Customer)
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("TO:", pageWidth - margin - 100, fromToY);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      textY = fromToY + 7;

      // Customer info from your database
      const customerInfo = [
        "Customer Details",
        `Email: ${invoice.customer_email}`,
        `Issue: ${invoice.issueName}`,
        `Issue ID: ${invoice.issueId?.slice(-8) || "N/A"}`,
        `Paid At: ${formatDateForPDF(invoice.paidAt)}`,
      ];

      customerInfo.forEach((line) => {
        addText(line, pageWidth - margin - 100, textY, 80);
        textY += 5;
      });

      // Service Details Table
      const tableY = textY + 10;

      // Table Header
      pdf.setFillColor(243, 244, 246); // Gray-100
      pdf.rect(margin, tableY, pageWidth - 2 * margin, 10, "F");
      pdf.setDrawColor(209, 213, 219); // Gray-300
      pdf.rect(margin, tableY, pageWidth - 2 * margin, 10);

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(55, 65, 81); // Gray-700
      pdf.text("DESCRIPTION", margin + 5, tableY + 7);
      pdf.text("QUANTITY", margin + 120, tableY + 7);
      pdf.text("UNIT PRICE", margin + 160, tableY + 7);
      pdf.text("AMOUNT", pageWidth - margin - 30, tableY + 7);

      // Table Row
      const rowY = tableY + 10;
      pdf.setFillColor(255, 255, 255);
      pdf.rect(margin, rowY, pageWidth - 2 * margin, 20, "F");
      pdf.setDrawColor(229, 231, 235); // Gray-200
      pdf.rect(margin, rowY, pageWidth - 2 * margin, 20);

      // Service Description
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(31, 41, 55); // Gray-800

      // Main service description
      pdf.text("Issue Boost Service", margin + 5, rowY + 7);

      // Additional details
      pdf.setFontSize(9);
      pdf.setTextColor(107, 114, 128); // Gray-600

      // Service details lines
      const serviceDetails = [
        `• Priority: High Priority Support`,
        `• Guarantee: 3-Day Resolution`,
        `• Issue: ${invoice.issueName}`,
        `• ID: ${invoice.issueId?.slice(-8)}`,
      ];

      serviceDetails.forEach((detail, index) => {
        pdf.text(detail, margin + 7, rowY + 12 + index * 4);
      });

      // Quantity
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(31, 41, 55);
      pdf.text("1", margin + 120, rowY + 12);

      // Unit Price
      pdf.text("100৳", margin + 160, rowY + 12);

      // Amount
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(37, 99, 235); // Blue-600
      pdf.text(`${invoice.amount}৳`, pageWidth - margin - 30, rowY + 12);

      // Summary Section
      const summaryY = rowY + 30;

      // Total Box
      const totalBoxWidth = 100;
      const totalBoxX = pageWidth - margin - totalBoxWidth;

      pdf.setFillColor(239, 246, 255); // Blue-50
      pdf.rect(totalBoxX, summaryY, totalBoxWidth, 25, "F");
      pdf.setDrawColor(191, 219, 254); // Blue-200
      pdf.rect(totalBoxX, summaryY, totalBoxWidth, 25);

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(75, 85, 99); // Gray-600
      pdf.text("TOTAL AMOUNT", totalBoxX + 5, summaryY + 10);

      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(31, 41, 55); // Gray-800
      pdf.text(`${invoice.amount}৳`, totalBoxX + 5, summaryY + 22);

      // Payment Details
      const paymentY = summaryY;
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(75, 85, 99); // Gray-600

      // Payment Method
      pdf.text("Payment Method:", margin, paymentY + 5);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(31, 41, 55);
      const paymentMethod = invoice.paymentMethod?.[0] || "card";
      pdf.text(paymentMethod.toUpperCase(), margin + 45, paymentY + 5);

      // Transaction ID
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(75, 85, 99);
      pdf.text("Transaction ID:", margin, paymentY + 12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(31, 41, 55);
      pdf.text(invoice.transitionId || "N/A", margin + 45, paymentY + 12);

      // Footer Section
      const footerY = pageHeight - 60;

      // Terms & Conditions
      pdf.setFillColor(254, 243, 199); // Yellow-50
      pdf.rect(margin, footerY, pageWidth - 2 * margin, 45, "F");
      pdf.setDrawColor(253, 230, 138); // Yellow-300
      pdf.rect(margin, footerY, pageWidth - 2 * margin, 45);

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(146, 64, 14); // Yellow-800
      pdf.text("TERMS & CONDITIONS", margin + 5, footerY + 8);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      const terms = [
        "1. This is a one-time payment for priority issue resolution",
        "2. Issue will be resolved within 3 working days (business days)",
        "3. Payment is non-refundable once issue resolution begins",
        "4. Invoice generated automatically upon payment confirmation",
        "5. For any queries, contact: support@citycare.com",
        "6. This is a computer-generated invoice, no signature required",
      ];

      terms.forEach((term, index) => {
        pdf.text(term, margin + 7, footerY + 15 + index * 4);
      });

      // Thank You Message
      pdf.setFontSize(10);
      pdf.setTextColor(107, 114, 128); // Gray-600
      pdf.text(
        "Thank you for choosing CityCare Solutions!",
        pageWidth / 2,
        pageHeight - 8,
        { align: "center" }
      );

      // Company Info at bottom
      pdf.setFontSize(8);
      pdf.setTextColor(156, 163, 175); // Gray-400
      const companyBottomInfo = [
        "CityCare Solutions • Dhaka, Bangladesh • contact@citycare.com • +880 1234 567890",
        `Invoice Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      ];

      companyBottomInfo.forEach((line, index) => {
        pdf.text(line, pageWidth / 2, pageHeight - 15 + index * 4, {
          align: "center",
        });
      });

      // Save the PDF with proper filename
      const timestamp = new Date().getTime();
      const shortId = invoice.issueId?.slice(-8) || "unknown";
      const fileName = `Invoice_${shortId}_${timestamp}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate invoice PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Handle invoice button click
  const handleInvoiceClick = async (issueId) => {
    // Check if invoices are loaded
    if (invoices.length === 0) {
      alert("Invoice data is still loading. Please try again in a moment.");
      return;
    }

    // Check if invoice exists for this issue
    const invoice = invoices.find((inv) => inv.issueId === issueId);

    if (!invoice) {
      alert(
        "No invoice found for this issue. Please make sure the issue has been boosted and paid."
      );
      return;
    }

    generateInvoicePDF(issueId);
  };

  // Stats calculation
  const boostableIssues = issues.filter(
    (issue) => issue.status === "approved" && !issue.boosted
  ).length;
  const boostedIssues = issues.filter((issue) => issue.boosted).length;

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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <FiZap className="text-yellow-500" />
              Boost Issue
            </h1>
            <p className="text-gray-600">
              Prioritize your issues for faster resolution
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold">
            <TbBrandSpeedtest className="w-5 h-5" />
            <span>Fast Track Service</span>
          </div>
        </div>

        {/* Promo Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <GiRapidshareArrow className="w-6 h-6" />
                Boost Your Issue - Get High Priority!
              </h2>
              <p className="text-blue-100 mb-4">
                Give your issue priority attention and get it solved within 3
                days
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MdOutlinePriorityHigh className="w-5 h-5" />
                  <span className="font-semibold">High Priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineTimer className="w-5 h-5" />
                  <span className="font-semibold">3-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiDollarSign className="w-5 h-5" />
                  <span className="font-semibold">Only 100 Taka</span>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold">100৳</div>
              <div className="text-sm">per boost</div>
              <div className="text-xs mt-2 text-blue-100">One-time payment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Issues</p>
              <p className="text-2xl font-bold text-gray-800">
                {issues.length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Boost Available</p>
              <p className="text-2xl font-bold text-yellow-600">
                {boostableIssues}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FiZap className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Already Boosted</p>
              <p className="text-2xl font-bold text-green-600">
                {boostedIssues}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Resolution</p>
              <p className="text-2xl font-bold text-purple-600">3.2 days</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FiClock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FiArrowUp className="text-green-600" />
          Why Boost Your Issue?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-800">Top Priority</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Your issue moves to the top of the queue and gets immediate
              attention
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-800">3-Day Guarantee</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Get your issue resolved within 3 working days or get your money
              back
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-800">Dedicated Support</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Receive regular updates and priority support from our best
              technicians
            </p>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Your Approved Issues
          </h3>
          <p className="text-gray-600">
            Select an issue to boost for faster resolution
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  S.L
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Issue Image
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Issue Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Approved At
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Upvotes
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {issues.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FiAlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        No Issues Available for Boosting
                      </h3>
                      <p className="text-gray-600">
                        You don't have any approved issues to boost at the
                        moment
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                issues.map((issue, index) => (
                  <tr
                    key={issue._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="text-gray-700 font-medium">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={issue.issueImageURL}
                          alt={issue.issueName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {issue.issueName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                              issue.priority
                            )}`}
                          >
                            {issue.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            {issue.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-700 text-sm">
                        {formatDate(issue.approvedAt)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          issue.workflow
                        )}`}
                      >
                        {getStatusText(issue.workflow)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-gray-700">
                        <FiArrowUp className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">
                          {issue.upvotes || 0}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 flex gap-1">
                      <button
                        onClick={() => handleBoostClick(issue)}
                        disabled={
                          issue.workflow === "resolved" ||
                          issue.boostStatus === "boost"
                        }
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                          !issue.boostStatus && issue.workflow !== "resolved"
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow hover:shadow-md"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <FiZap className="w-4 h-4" />
                        {issue.boostStatus
                          ? "Already Boosted"
                          : issue.workflow === "resolved"
                          ? "Resolved"
                          : "Boost Now"}
                      </button>
                      <button
                        disabled={
                          issue.boostStatus !== "boost" || isGeneratingPDF
                        }
                        onClick={() => handleInvoiceClick(issue._id)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                          issue.boostStatus === "boost" && !isGeneratingPDF
                            ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {isGeneratingPDF ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <FiDownload className="w-4 h-4" />
                            Invoice
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Boost Modal */}
      {selectedIssue && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSelectedIssue(null)}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FiZap className="text-yellow-500" />
                    Boost This Issue
                  </h3>
                  <button
                    onClick={() => setSelectedIssue(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-12 rounded overflow-hidden">
                      <img
                        src={selectedIssue.issueImageURL}
                        alt={selectedIssue.issueName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {selectedIssue.issueName}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedIssue.category} • {selectedIssue.district}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    What you'll get:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span>High priority in the queue</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span>Guaranteed resolution within 3 days</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span>Dedicated support team</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-3 h-3 text-green-600" />
                      </div>
                      <span>Regular progress updates</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Boost Fee</p>
                      <p className="text-2xl font-bold text-gray-800">
                        100৳{" "}
                        <span className="text-sm font-normal text-gray-500">
                          (One-time)
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Savings</p>
                      <p className="text-lg font-bold text-green-600">
                        50% off regular priority
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedIssue(null)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                    disabled={isBoosting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBoostConfirm}
                    disabled={isBoosting}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isBoosting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiDollarSign className="w-5 h-5" />
                        Pay 100 ৳ & Boost
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  By boosting, you agree to our terms of service
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* How It Works */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          How Boosting Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Select Issue</h4>
            <p className="text-gray-600 text-sm">
              Choose an approved issue from your list that needs priority
              attention
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold text-xl">2</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Make Payment</h4>
            <p className="text-gray-600 text-sm">
              Pay 100 Taka through our secure payment gateway
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold text-xl">3</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Get Priority</h4>
            <p className="text-gray-600 text-sm">
              Your issue gets prioritized and will be resolved within 3 working
              days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostIssue;
