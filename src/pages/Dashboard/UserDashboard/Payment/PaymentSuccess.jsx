// components/PaymentSuccess.jsx
import { Link, useSearchParams } from "react-router";
import { FiCheckCircle, FiArrowLeft, FiDownload } from "react-icons/fi";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .get(`/payment-histroy?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo(res.data);
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <FiCheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Payment Successful! 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your issue has been boosted and will now
          receive priority attention.
        </p>

        {/* Order Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200 mb-8">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold">100৳</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service</span>
              <span className="font-semibold">Issue Boost</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Completed
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Priority Status</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-2">
            What happens next?
          </h3>
          <p className="text-sm text-gray-600">
            Your issue has been moved to the priority queue and will be resolved
            within 3 working days.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            Go to Dashboard
          </Link>

          <button className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
            <FiDownload className="w-5 h-5" />
            Download Receipt
          </button>

          <Link
            to="/track-issue"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            Track Your Boosted Issue →
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <Link to="/contact" className="text-blue-600 hover:text-blue-800">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
