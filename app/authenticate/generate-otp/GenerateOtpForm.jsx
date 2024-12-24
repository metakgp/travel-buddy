"use client";

import { verifyUserMail } from "@/app/utils/auth";
import Loading from "@/app/utils/Loading";
import { useState } from "react";
import { useRouter } from "next/navigation";

const GenerateOtpForm = ({ instituteCode }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verifiedEmail = await verifyUserMail({ instituteCode, email });

    const data = {
      email: verifiedEmail,
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
      router.push("/authenticate/verify-otp");
    } else {
      const json = await res.json();
      alert(json.message);
    }
  };

  return loading ? (
    <Loading />
  ) : (
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default GenerateOtpForm;
