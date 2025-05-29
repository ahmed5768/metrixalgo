import { useState } from "react"
import { Link, } from "react-router"
import { Images } from "../utils/images"
import { Eye, EyeOff } from "lucide-react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { LABELS } from "../utils/labels"

export const CreateAcc = () => {

    const [showPassword, setShowPassword] = useState(false)

    // login funtion
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPassword: ""
    })
    let handleInputChange = (e) => {
        let { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    // const [userEmail, setUserEmail] = useState("")
    // const [userPassword, setUserPassword] = useState("")
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.userEmail,
                formData.userPassword
            );
            console.log("User created:", userCredential.user);
            alert("Account created successfully!");
            // You can navigate to login here if needed
        } catch (error) {
            console.error("Error creating account:", error.message);
            alert("This account already exist");
        }

        console.log(formData);


        // const loginData = {
        //     userEmail,
        //     userPassword
        // }
        // console.log(loginData);

    }



    return (
        <>
            <form className="flex items-center justify-center content-center gap-2 bg-gray-200 h-screen w-full" onSubmit={handleFormSubmit}>
                <div className=" bg-white pl-5 pr-5 pt-10 pb-10 w-full m-115 rounded-2xl" >

                    {/* Graph image  */}
                    <div className="flex item-center justify-center pb-5">
                        <img src={Images.graph} alt="Graph" />
                    </div>

                    {/* top heading  */}
                    <h1 className="mb-3 text-center justify-center text-2xl gap-2 flex">{LABELS.startText} <p className="text-indigo-500"> {LABELS.metText}</p></h1>
                    <p className="mb-12 text-center text-gray-400">{LABELS.createText}</p>

                    {/* username input  */}
                    <div className="relative mb-5" data-twe-input-wrapper-init>
                        <input
                            type="text"
                            name="userName"
                            className="peer w-full rounded bg-gray-200 px-3  pt-4 pb-2 text-black placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500"

                            id="userName"
                            placeholder="Your Full Name"
                            value={formData.userName}
                            required
                            // onChange={(e) => setUserPassword(e.target.value)}
                            onChange={handleInputChange} />
                        <label
                            htmlFor="userName"
                            className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-500"
                        >Your Full Name
                        </label>
                    </div>

                    {/* Email Input  */}
                    <div className="relative mb-5 " data-twe-input-wrapper-init>
                        <input
                            type="email"
                            name="userEmail"
                            className="peer w-full rounded bg-gray-200 px-3 pt-4 pb-2 text-black placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500"
                            id="email"
                            placeholder="Enter Email"
                            value={formData.userEmail}
                            required
                            onChange={handleInputChange}
                        // onChange={(e) => setFormData((prev) => ({
                        //     ...prev,
                        //     userEmail: e.target.value
                        // }))}
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-500"
                        >Enter Email
                        </label>
                    </div>

                    {/* Password input  */}
                    <div className="relative mb-7" data-twe-input-wrapper-init>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="userPassword"
                            className="peer w-full rounded bg-gray-200 px-3 pt-4 pb-2 text-black placeholder-transparent focus:outline-none focus:ring-1 focus:ring-gray-500"

                            id="password"
                            placeholder="Password"
                            value={formData.userPassword}
                            required
                            // onChange={(e) => setUserPassword(e.target.value)}
                            onChange={handleInputChange} />
                        <label
                            htmlFor="password"
                            className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-500"
                        >Password
                        </label>
                        <button
                            type="button"
                            className="absolute right-3 top-4 text-gray-600 hover:text-gray-800"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>

                    {/* Sign Up Linking  */}
                    <p className="mb-7 text-center text-gray-400">
                        Already have an account? <Link to={-1} className="text-blue-600 hover:underline">Login</Link>
                    </p>

                    {/* Login button  */}
                    <div className="flex justify-center">
                        <button type='submit' className="w-30 inline-block rounded bg-indigo-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lightindigo-800 active:shadow-lg motion-reduce:transition-none dark:active:shadow-black" >
                            Sign Up
                        </button>
                    </div>

                </div>

            </form>
        </>
    )
}