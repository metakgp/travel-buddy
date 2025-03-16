"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VerifyOtpForm = ({ email, hashData, instituteCode, redirect_url }) => {

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const check = () => {
    if (!hashData || !instituteCode || !email) {
      alert("Invalid access. Redirecting to authentication page.");
      router.push("/authenticate");
    }
  }

  useEffect(() => {
    check();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      email: email,
      hashData: hashData,
      instituteCode: instituteCode,
      otp: otp
    }

    const res = await fetch("/api/authenticate/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      const json = await res.json();
      alert(json.message);
      router.push("/register?instituteCode=" + instituteCode + "&redirect_url=" + redirect_url);
    } else {
      const json = await res.json();
      alert(json.message);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">
          OTP Verification
        </h2>
        <div className="mb-4">
          <label htmlFor="otp" className="block text-gray-700 font-medium">
            Enter OTP
          </label>
          <input
            id="otp"
            placeholder="Enter your OTP"
            value={otp}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded-md transition ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default VerifyOtpForm;