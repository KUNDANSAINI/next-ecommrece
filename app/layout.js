'use client'

import "./globals.css";
import GlobalState from "@/context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/env";
import Cookies from "js-cookie";
import axios from "axios";
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({ children }) {
  const [userEmail, setUserEmail] = useState('')
  const [userID, setUserID] = useState('')
  const [role, setRole] = useState('')
  const router = useRouter()
  const token = Cookies.get("token")

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
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ zIndex: 9999 }}
          />
        </GlobalState>
      </body>
    </html>
  );
}
