// components/PaymentCancel.jsx
import { Link } from "react-router";
import { FiXCircle, FiArrowLeft, FiRefreshCw } from "react-icons/fi";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Cancel Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <FiXCircle className="w-16 h-16 text-red-600" />
          </div>
        </div>

        {/* Cancel Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>

        {/* Reason Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-red-200 mb-8">
          <h3 className="font-semibold text-gray-800 mb-3">
            Common reasons for cancellation:
          </h3>
          <ul className="text-left space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              Changed your mind about the purchase
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              Payment method declined
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              Browser or tab was closed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              Network connectivity issues
            </li>
          </ul>
        </div>

        {/* Try Again Message */}
        <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-gray-700">
            You can try the payment again if you wish to boost your issue.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/boost-issue"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            <FiRefreshCw className="w-5 h-5" />
            Try Payment Again
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>

          <Link
            to="/issues"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            View Your Issues →
          </Link>
        </div>

        {/* Need Help */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Having trouble with payments?{" "}
            <Link to="/contact" className="text-blue-600 hover:text-blue-800">
              Get Help
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
