import { useState } from "react"
import { LABELS } from "../utils/labels"
import { Link, NavLink } from "react-router"
import { Images } from "../utils/images"
import { Eye, EyeOff } from "lucide-react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"

export const Login = () => {

    // Show password state
    const [showPassword, setShowPassword] = useState(false)


    // login funtion
    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: ""
    })

    // input value assign
    let handleInputChange = (e) => {
        let { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    // const [userEmail, setUserEmail] = useState("")
    // const [userPassword, setUserPassword] = useState("")
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        // User login
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.userEmail,
                formData.userPassword
            );
            const user = userCredential.user;

            // Email Verification user login condition
            if (!user.emailVerified) {
                alert("Please verify your email before logging in.");
                return;
            }
            alert("Login successful!");

        } catch (error) {
            console.error("Login failed:", error.message);
            if (error.code !== "auth/user-not-found") {
                alert("Email not found. Please sign up.");
            } else if (error.code === "auth/wrong-password") {
                alert("Incorrect password.");
            } else {
                alert("Login failed. Please try again.");
            }
        }


    console.log(formData);


    // const loginData = {
    //     userEmail,
    //     userPassword
    // }
    // console.log(loginData);

}



return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
        <form className="bg-white w-full max-w-md rounded-2xl p-6 sm:p-10 shadow-lg"
            onSubmit={handleFormSubmit}>

            {/* Graph image  */}
            <div className="flex justify-center mb-6">
                <img src={Images.graph} alt="Graph" className="h-12 sm:h-16" />
            </div>

            {/* top heading  */}
            <h1 className="text-2xl text-center font-semibold mb-2">{LABELS.welcomText}</h1>
            <p className="text-center text-sm text-gray-500 mb-8">{LABELS.logInText}</p>

            {/* Email Input  */}
            <div className="relative mb-5 " data-twe-input-wrapper-init>
                <input
                    type="email"
                    name="userEmail"
                    className="peer w-full rounded bg-gray-100 px-3 pt-4 pb-2 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="userEmail"
                    placeholder="Enter Email"
                    value={formData.userEmail}
                    required
                    onChange={handleInputChange}
                    autoComplete="off"
                // onChange={(e) => setFormData((prev) => ({
                //     ...prev,
                //     userEmail: e.target.value
                // }))}
                />
                <label
                    htmlFor="userEmail"
                    className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-500"
                >Enter Email
                </label>
            </div>

            {/* Password input  */}
            <div className="relative mb-2" data-twe-input-wrapper-init>
                <input
                    type={showPassword ? "text" : "password"}
                    name="userPassword"
                    className="peer w-full rounded bg-gray-100 px-3 pt-4 pb-2 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="userPassword"
                    placeholder="Password"
                    value={formData.userPassword}
                    required
                    // onChange={(e) => setUserPassword(e.target.value)}
                    onChange={handleInputChange}
                    autoComplete="off"
                    />
                <label
                    htmlFor="userPassword"
                    className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-500"
                >Password
                </label>

                {/* Show password funtion */}
                <button
                    type="button"
                    className="absolute right-3 top-4 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>

            </div>

            {/* Recover Password */}
            <p className="mb-7 text-xs text-right text-blue-600 hover:underline">{LABELS.recover}</p>

            {/* Sign Up Linking  */}
            <p className="text-center text-sm text-gray-500 mb-6">
                {LABELS.dontAcc} <Link to="/CreateAcc" className="text-blue-600 hover:underline">Sign Up</Link>
            </p>

            {/* Login button  */}
            <div className="flex justify-center">
                <button type='submit' className="w-30 inline-block rounded bg-indigo-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lightindigo-800 active:shadow-lg motion-reduce:transition-none dark:active:shadow-black" >
                    Login
                </button>
            </div>



        </form>
    </div>
)
}