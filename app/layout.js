import "./globals.css";
import { Suspense } from "react";
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "@/components/includes/theme-provider";
import { useTheme } from "next-themes";
import Loading from "@/components/Loading";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Trendy - Shop Latest Fashion Trends Online",
  description: "Discover the latest fashion trends at Trendy. Shop clothing, accessories, and more with amazing deals. Fast delivery and secure payments.",
  keywords: "fashion, online shopping, trendy clothes, latest trends, best deals, stylish outfits",
  // openGraph: {
  //   title: "Trendy - Shop Latest Fashion Trends Online",
  //   description: "Discover the latest fashion trends at Trendy. Shop clothing, accessories, and more with amazing deals.",
  //   url: "https://yourwebsite.com",
  //   type: "website",
  //   images: [
  //     {
  //       url: "https://yourwebsite.com/default-og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Trendy - Latest Fashion Trends",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Trendy - Shop Latest Fashion Trends Online",
  //   description: "Find the latest fashion trends and shop stylish outfits at Trendy. Best deals available now!",
  //   images: ["https://yourwebsite.com/default-twitter-image.jpg"],
  // },
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
          <NextTopLoader />
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <Toaster
            // theme={theme === "dark" ? "dark" : "light"} // Dynamically set theme
            position="top-right" // Optional: Toast position
            reverseOrder={true}
          />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          {/* </ThemeProvider> */}
        </Providers>
      </body>
    </html>
  );
}
