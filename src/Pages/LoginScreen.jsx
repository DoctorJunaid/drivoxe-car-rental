
import Navbar from "@/Components/Navbar.jsx";
import AuthForm from "@/components/login-form.js";



export default function LoginScreen() {
    return (
        <>
            <Navbar />
            <div className="bg-[#F5F5F5] dark:bg-gray-950 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-4xl">
                    <AuthForm />
                </div>
            </div>
        </>
    )
}