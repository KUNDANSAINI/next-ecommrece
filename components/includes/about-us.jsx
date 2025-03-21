'use client'

import Footer from "@/components/includes/Footer";
import Navbar from "@/components/includes/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
    return (
        <>
            <div className="mx-4 mt-10 flex flex-col justify-between h-full">
                <Navbar />
                <div className="flex flex-col items-center gap-20 my-8">

                    {/* Top Header Banner */}
                    <motion.div
                        className="w-full h-[300px]"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px 0px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            width={300}
                            height={300}
                            src={"/about-us/offer2.webp"}
                            alt="Banner Image"
                            className="w-full h-full rounded-xl"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px 0px" }}
                            transition={{ duration: 0.8 }}
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        className="grid grid-cols-2 gap-6 w-full"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px 0px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-full flex justify-center">
                            <Image
                                width={600}
                                height={600}
                                src={"/about-us/fashion-men-s-individuality-black-and-white-157675.webp"}
                                alt="Men Image"
                                className="rounded-xl"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-100px 0px" }}
                                transition={{ duration: 0.8 }}
                            />
                        </div>

                        <motion.div
                            className="flex flex-col justify-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px 0px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="space-y-4 w-[600px]">
                                <h2 className="text-[#F4D4A6]">Who We Are</h2>
                                <p>We started with a simple idea: to make premium products accessible to everyone, everywhere. Today, we’re proud to serve thousands of happy customers across the globe. Our journey is fueled by innovation, customer satisfaction, and a desire to build lasting relationships.</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Images Content */}
                    <motion.div
                        className="w-4/5 space-y-20"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px 0px" }} // Trigger both ways
                        transition={{ duration: 0.8 }}
                    >

                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px 0px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="w-1/2 mt-20 space-y-2">
                                <h1 className="text-2xl text-center font-semibold">Welcome to Zone!</h1>
                                <p className="text-lg leading-relaxed">
                                    At Zone, we’re passionate about delivering quality, convenience, and a shopping experience you’ll love. Since our inception in 2025, we’ve been dedicated to providing our customers with the finest products, cutting-edge trends, and unmatched value.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-2 gap-6"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-100px 0px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="w-full flex justify-center">
                                <div className="w-2/3 h-full">
                                    <Image
                                        width={400}
                                        height={500}
                                        src={"/about-us/pexels-photo-2043590.jpeg"}
                                        alt="Women Image"
                                        className="w-full h-full rounded-xl"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, margin: "-100px 0px" }}
                                        transition={{ duration: 0.8 }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="h-[50px]">
                                        <Image
                                            width={400}
                                            height={400}
                                            src="/about-us/pexels-photo-2853909.webp"
                                            alt="Women Image"
                                            className="rounded-xl"
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: false, margin: "-100px 0px" }}
                                            transition={{ duration: 0.8 }}
                                        />
                                    </div>
                                </div>
                                <div></div>
                                <div></div>
                                <div className="rounded-xl">
                                    <div className="h-[200px]">
                                        <Image
                                            width={400}
                                            height={200}
                                            src="/about-us/pexels-photo-1926769.webp"
                                            alt="Women Image"
                                            className="rounded-xl"
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: false, margin: "-100px 0px" }}
                                            transition={{ duration: 0.8 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>

                    {/* What We Offer */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px 0px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-1/2 mt-20 space-y-2 ">
                            <h1 className="text-2xl text-center font-semibold">What We Offer</h1>
                            <p className="text-lg leading-relaxed">Whether you’re looking for the latest fashion trends, home essentials, or cutting-edge gadgets, we’ve got you covered. Every product in our store is selected with care to ensure quality, style, and functionality.</p>
                        </div>
                    </motion.div>

                    {/* Our Promise */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px 0px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-1/2 mt-20 space-y-2 ">
                            <h1 className="text-2xl text-center font-semibold">Our Promise</h1>
                            <p className="text-lg leading-relaxed">At Zone, we don’t just sell products; we sell experiences. Every item you purchase is a step toward a better, more connected, and stylish you. We’re here to inspire, empower, and make your life a little more extraordinary.</p>
                        </div>
                    </motion.div>

                    {/* Join Our Journey */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px 0px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-1/2 mt-20 space-y-2 ">
                            <h1 className="text-2xl text-center font-semibold">Join Our Journey</h1>
                            <p className="text-lg leading-relaxed">We believe that every customer is a part of our growing family. Together, let’s celebrate life’s moments, big and small, with products that inspire joy and convenience.</p>
                        </div>
                    </motion.div>

                    {/* Thank you */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px 0px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mt-20 space-y-2">
                            <h1 className="text-lg text-center">Thank you for choosing Zone. We’re excited to be a part of your story.</h1>
                        </div>
                    </motion.div>

                </div>
                <Footer />
            </div>
        </>
    );
};

export default AboutPage;
