"use client";
import { useState, useEffect } from "react";
import Loading from "../utils/Loading";
import { useRouter } from "next/navigation";

export default function AuthForm() {
    const [institutes, setInstitutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const check = async () => {
		if (localStorage.getItem("travelbuddy")) {
			router.push("/");
			return;
		}
	};

    const getInstitutes = async () => {
        const res = await fetch("/api/institute/getall", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            const json = await res.json();
            setInstitutes(json.institutes);
        } else {
            const json = await res.json();
            alert(json.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        check();
        getInstitutes();
    }, []);

    const [formData, setFormData] = useState({
        selectedInstituteCode: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.selectedInstituteCode) {
            alert("Please select an institute");
            return;
        }
        router.push(`/register?instituteCode=${formData.selectedInstituteCode}`);
        return;
    }

    return loading ? (
        <Loading />
    ) : (
        <div className="flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h1 className="text-xl font-bold mb-4 text-gray-700 text-center">
                    Select Your Institute
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="institute"
                            className="block text-gray-600 font-medium mb-2"
                        >
                            Institutes
                        </label>
                        <select
                            id="institute"
                            name="selectedInstituteCode"
                            value={formData.selectedInstituteCode}
                            onChange={handleChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>
                                Select an institute
                            </option>
                            {institutes.map((institute) => (
                                <option
                                    key={institute.code}
                                    value={institute.code}
                                >
                                    {institute.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
                    >
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    );
}
