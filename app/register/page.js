import Navbar from "@/components/includes/Navbar";
import { SignupForm } from "@/components/includes/signup";

export const metadata = {
    title: "Trendy - Create Your Account & Start Shopping",
    description: "Sign up for Trendy and explore the latest fashion trends. Create your account securely and enjoy personalized shopping.",
    keywords: "sign up, create account, register, join Trendy, new user registration, fashion shopping, secure signup",
    robots: "noindex, nofollow",
    // openGraph: {
    //   title: "Trendy - Create Your Account",
    //   description: "Join Trendy today and shop the latest fashion trends with exclusive deals and a personalized experience.",
    //   url: "https://yourwebsite.com/signup",
    //   type: "website",
    //   images: [
    //     {
    //       url: "https://yourwebsite.com/images/signup-og.jpg",
    //       width: 1200,
    //       height: 630,
    //       alt: "Trendy Signup Page",
    //     },
    //   ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: "Trendy - Sign Up & Start Shopping",
    //   description: "Register for a Trendy account and discover the latest fashion trends with great deals.",
    //   images: ["https://yourwebsite.com/images/signup-twitter.jpg"],
    // },
};


function Register() {

    return (
        <>
            <div className="mt-10">
                <Navbar />
                <div className="flex h-[880px] flex-col items-center justify-center bg-muted p-6 md:p-10">
                    <div className="w-full max-w-sm md:max-w-6xl">
                        <SignupForm />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;