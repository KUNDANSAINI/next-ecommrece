import { LoginForm } from "@/components/includes/login";
import Navbar from "@/components/includes/Navbar";

export const metadata = {
    title: "Trendy - Secure Login",
    description: "Login to Trendy and explore the latest fashion trends. Secure and fast authentication for a seamless shopping experience.",
    keywords: "login, secure login, trendy account, fashion shopping, sign in, user authentication",
    robots: "noindex, nofollow",
    // openGraph: {
    //   title: "Trendy - Secure Login",
    //   description: "Access your Trendy account to shop the latest fashion trends securely and effortlessly.",
    //   url: "https://yourwebsite.com/login",
    //   type: "website",
    //   images: [
    //     {
    //       url: "https://yourwebsite.com/login-og-image.jpg",
    //       width: 1200,
    //       height: 630,
    //       alt: "Trendy Login Page",
    //     },
    //   ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: "Trendy - Secure Login",
    //   description: "Login securely to your Trendy account and shop the latest fashion trends with confidence.",
    //   images: ["https://yourwebsite.com/login-twitter-image.jpg"],
    // },
  };
  

function Login() {

    return (
        <>
            <div className="mt-10">
                <Navbar />
                <div className="flex flex-col h-[880px] items-center justify-center bg-muted p-6 md:p-10">
                    <div className="w-full max-w-sm md:max-w-6xl">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;