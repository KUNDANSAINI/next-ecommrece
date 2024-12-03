'use client'

import Footer from "../component/Footer";
import Navbar from "../component/Navbar";


function Men() {

    return (
        <>
            <div className="border rounded-3xl mx-12 my-4 bg-[#F0F1F0] px-4 py-8">
                <Navbar />
                
                <div className="flex flex-wrap lg:flex-nowrap mt-4">

                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/5 px-4 py-6 rounded-lg bg-gray-50">
                        <h2 className="font-semibold text-lg mb-4">Filter By</h2>
                        <ul className="space-y-2">
                            <li>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox cursor-pointer" />
                                    <span className="ml-2">Shirt</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox cursor-pointer" />
                                    <span className="ml-2">Jackets</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox cursor-pointer" />
                                    <span className="ml-2">Sweaters</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox cursor-pointer" />
                                    <span className="ml-2">Jeans</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox cursor-pointer" />
                                    <span className="ml-2">T-Shirt</span>
                                </label>
                            </li>
                        </ul>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4 px-4 py-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { name: "Autumn Dress", price: "$85", sale: "$124", colors: 2 },
                                { name: "Casual Shirt", price: "$29", sale: "$35", colors: 7 },
                                { name: "Leather Coat", price: "$35", colors: 7 },
                                { name: "VNeck Shirt", price: "$230", colors: 3 },
                                { name: "Long Coat Outer", price: "$12", colors: 7 },
                                { name: "Denim Jacket", price: "$32", colors: 5 },
                            ].map((product, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="relative">
                                        {product.sale && (
                                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                SALE
                                            </span>
                                        )}
                                        <div className="w-full h-48 bg-gray-200 mb-4"></div>
                                    </div>
                                    <h3 className="font-semibold text-lg">{product.name}</h3>
                                    <p className="text-gray-500 text-sm">{product.colors} Colors</p>
                                    <p className="font-bold text-xl mt-2">
                                        {product.price}{" "}
                                        {product.sale && (
                                            <span className="line-through text-gray-400 text-sm">{product.sale}</span>
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Men;