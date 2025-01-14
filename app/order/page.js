'use client'

import Footer from "@/components/includes/Footer";
import Navbar from "@/components/includes/Navbar";
import { GlobalContext } from "@/context";
import { useContext } from "react";


function Order() {
    const { userID } = useContext(GlobalContext)

    return (
        <>
            <div className="border flex flex-col justify-between rounded-3xl h-full mx-12 my-4 px-4 py-8">
                <Navbar />
                <div className="flex flex-col items-center gap-4 mt-4">Order</div>
                <Footer />
            </div>
        </>
    );
}

export default Order;