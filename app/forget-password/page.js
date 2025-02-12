import { ForgotPasswordForm } from "@/components/includes/forget";
import Navbar from "@/components/includes/Navbar";

export const metadata = {
    title: "Trendy - Reset Your Password Securely",
    description: "Forgot your password? Reset it securely and regain access to your Trendy account. Quick and easy password recovery process.",
    keywords: "forgot password, reset password, account recovery, secure login, password assistance, regain access",
    robots: "noindex, nofollow",
    // openGraph: {
    //     title: "Trendy - Reset Your Password Securely",
    //     description: "Easily reset your Trendy account password and continue shopping with confidence.",
    //     url: "https://yourwebsite.com/forgot-password",
    //     type: "website",
    //     images: [
    //         {
    //             url: "https://yourwebsite.com/images/forgot-password-og.jpg",
    //             width: 1200,
    //             height: 630,
    //             alt: "Trendy Forgot Password",
    //         },
    //     ],
    // },
    // twitter: {
    //     card: "summary_large_image",
    //     title: "Trendy - Forgot Your Password?",
    //     description: "Recover your Trendy account with our secure password reset process.",
    //     images: ["https://yourwebsite.com/images/forgot-password-twitter.jpg"],
    // },
};


function ForgetPassword() {

    return (
        <>
            <div className="mt-10">
                <Navbar />
                <div className="flex flex-col h-[880px] items-center justify-center bg-muted p-6 md:p-10">
                    <div className="w-full max-w-sm md:max-w-6xl">
                        <ForgotPasswordForm />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;