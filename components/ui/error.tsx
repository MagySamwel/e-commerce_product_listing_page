'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ErrorPage({error}:{ error: Error}) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center max-w-md flex flex-col items-center justify-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-red-100 rounded-full">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t load the products. This might be a temporary issue.
          Please try again.
        </p>

        {/* Retry Button */}
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-xs font-mono text-gray-600">
              {error.message}
            </p>
          </div>
      </div>
    </div>
  );
}

