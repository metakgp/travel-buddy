"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { instituteDetails } from "@/app/utils/institute";

const GenerateOtpForm = ({ instituteCode, redirect_url }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [institute, setInstitute] = useState("");
  const router = useRouter();

  const checkInstituteCode = async () => {
    if (!instituteCode) {
      alert('Institute not found.');
      router.push("/");
    }
    try {
      const selectInstitute = await instituteDetails({ instituteCode });
      setInstitute(selectInstitute.name);
    } catch (error) {
      router.push("/");
    }
  }

  useEffect(() => {
    checkInstituteCode();
  }, [])

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      instituteCode: instituteCode
    }

    setLoading(true);

    const res = await fetch("/api/authenticate/generate", {
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
      router.push("/authenticate/verify-otp?redirect_url=" + redirect_url);
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
          College Email Authentication
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
            className="border rounded-md p-2 w-full focus:ring focus:ring-blue-300"
          />
        </div>
        {institute && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Institute</label>
            <input
              type="text"
              name="institute"
              value={institute}
              disabled
              className="border rounded-md p-2 w-full"
            />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded-md transition ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}

export default GenerateOtpForm;
