'use client'

import "./globals.css";
import GlobalState from "@/context";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import NextTopLoader from 'nextjs-toploader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/includes/theme-provider";
import { useTheme } from "next-themes";
import Loading from "@/components/Loading";

export default function RootLayout({ children }) {
  const [userEmail, setUserEmail] = useState('')
  const [userID, setUserID] = useState('')
  const [role, setRole] = useState('')
  const router = useRouter()
  const token = Cookies.get("token")
  const { theme } = useTheme();

  const API_URL = process.env.NEXT_PUBLIC_CLIENT_URL

  useEffect(() => {

    async function fetchTokenData() {
      if (typeof window !== 'undefined') {

        if (token) {
          try {
            const response = await axios.post(`${API_URL}/api/login`, { token })
            setUserEmail(response.data.decryptedPayload.email);
            setUserID(response.data.decryptedPayload.id);
            setRole(response.data.decryptedPayload.isAdmin);
          } catch (error) {
            console.error('Error decoding token:', error)
          }
        } else {
          // Handle the case where no token is present
          console.warn('No token found in cookies.')
        }
      }
    }

    fetchTokenData()
  }, [router])

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <GlobalState>
          <NextTopLoader />
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
          {/* </ThemeProvider> */}
          <ToastContainer
           // theme={theme === "dark" ? "dark" : "light"} // Dynamically set theme
            position="top-right" // Optional: Toast position
            autoClose={5000} // Auto-close in 5 seconds
          />
        </GlobalState>
      </body>
    </html>
  );
}
