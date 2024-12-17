"use client";

import React from "react";
import Link from "next/link";

export default function Error({ error }) {
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
                Something Went Wrong
            </h1>
            <p className="text-lg text-gray-600 mb-6">
                {error.message || "An unexpected error occurred."}
            </p>
            <Link
                href="/authenticate"
                className="btn btn-lg text-white bg-gradient-to-br from-[#D2691E] to-[#8e5337] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-full text-sm px-3 py-2 text-center transition-all duration-500"
            >
                Try Again
            </Link>
        </div>
    );
}
