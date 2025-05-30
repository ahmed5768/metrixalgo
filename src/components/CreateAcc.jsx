import { useState } from "react";
import { Link } from "react-router";
import { Images } from "../utils/images";
import { Eye, EyeOff } from "lucide-react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";
import { LABELS } from "../utils/labels";


export const CreateAcc = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
    });

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Create Account
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.userEmail,
                formData.userPassword
            );

            // Email Verification
            const user = userCredential.user
            await sendEmailVerification(user)
            console.log("User created:", user);
            alert("Account created! Please check your email to verify your address before logging in.");



        } catch (error) {
            console.error("Error creating account:", error.message);

            if (error.code === "auth/email-already-in-use") {
                alert("This email is already registered. Try logging in.");
            } else {
                alert("Failed to create account. Please try again.");
            }
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
            <form
                className="bg-white w-full max-w-md rounded-2xl p-6 sm:p-10 shadow-lg"
                onSubmit={handleFormSubmit}
            >
                {/* Logo or Graph */}
                <div className="flex justify-center mb-6">
                    <img src={Images.graph} alt="Graph" className="h-12 sm:h-16" />
                </div>

                {/* Heading */}
                <h1 className="text-2xl text-center font-semibold mb-2">
                    {LABELS.startText} <span className="text-indigo-500">{LABELS.metText}</span>
                </h1>
                <p className="text-center text-sm text-gray-500 mb-8">{LABELS.createText}</p>

                {/* Name */}
                <div className="relative mb-5">
                    <input
                        type="text"
                        name="userName"
                        className="peer w-full rounded bg-gray-100 px-3 pt-4 pb-2 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        id="userName"
                        placeholder="Your Full Name"
                        value={formData.userName}
                        required
                        onChange={handleInputChange}
                    />
                    <label
                        htmlFor="userName"
                        className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-500"
                    >
                        Your Full Name
                    </label>
                </div>

                {/* Email */}
                <div className="relative mb-5">
                    <input
                        type="email"
                        name="userEmail"
                        className="peer w-full rounded bg-gray-100 px-3 pt-4 pb-2 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        id="email"
                        placeholder="Enter Email"
                        value={formData.userEmail}
                        required
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-500"
                    >
                        Enter Email
                    </label>
                </div>

                {/* Password */}
                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="userPassword"
                        className="peer w-full rounded bg-gray-100 px-3 pt-4 pb-2 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        id="password"
                        placeholder="Password"
                        value={formData.userPassword}
                        required
                        onChange={handleInputChange}
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-500"
                    >
                        Password
                    </label>
                    <button
                        type="button"
                        className="absolute right-3 top-4 text-gray-600 hover:text-gray-800"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>

                {/* Already have account */}
                <p className="text-center text-sm text-gray-500 mb-6">
                    Already have an account?{" "}
                    <Link to={-1} className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>

                {/* Submit button*/}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-30 inline-block rounded bg-indigo-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lightindigo-800 active:shadow-lg motion-reduce:transition-none dark:active:shadow-black"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};
