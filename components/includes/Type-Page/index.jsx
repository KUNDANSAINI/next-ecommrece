'use client';

import { useEffect, useState } from "react";
import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/includes/Footer";

function Page({ getCategory, getBrand, getProduct, type }) {
    const [typeData, setTypeData] = useState([]);
    const [selectSubCategory, setSelectSubCategory] = useState("");
    const [selectBrand, setSelectBrand] = useState("");
    const [selectCategory, setSelectCategory] = useState("");
    const [filtered, setFiltered] = useState([]);

    // Filter data by type when `getProduct` or `type` changes
    useEffect(() => {
        if (!Array.isArray(getProduct)) {
            setFiltered([]);
            setTypeData([]);
            return;
        }

        let filteredByType = [...getProduct];

        if (type !== "Shop" && type) {
            filteredByType = filteredByType.filter(
                (item) => item.subCategory === type
            );
        }

        setTypeData(filteredByType);
    }, [getProduct, type]);

    // Apply further filters when `typeData` or filter criteria change
    useEffect(() => {
        if (!Array.isArray(typeData)) {
            setFiltered([]);
            return;
        }

        let filteredItems = [...typeData];

        // Filter by Sub Category
        if (selectSubCategory) {
            filteredItems = filteredItems.filter(
                (item) =>
                    item.subCategory.toLowerCase() ===
                    selectSubCategory.toLowerCase()
            );
        }

        // Filter by Brand
        if (selectBrand) {
            filteredItems = filteredItems.filter(
                (item) =>
                    item.brand.toLowerCase() === selectBrand.toLowerCase()
            );
        }

        // Filter by Category
        if (selectCategory) {
            filteredItems = filteredItems.filter(
                (item) =>
                    item.category.toLowerCase() ===
                    selectCategory.toLowerCase()
            );
        }

        setFiltered(filteredItems);
    }, [selectBrand, selectSubCategory, selectCategory, typeData]);


    return (
        <>
            <div className="mx-4 mt-10">
                <Navbar type={type} />

                <div className="my-8 flex flex-col items-center justify-center">
                    <div className="flex w-5/6 items-center justify-between">
                        <h2 className="font-bold text-xl">Filter</h2>
                        <Menubar>
                            {
                                type === "Shop" && (
                                    <MenubarMenu>
                                        <MenubarTrigger>Type</MenubarTrigger>
                                        <MenubarContent>
                                            <MenubarRadioGroup
                                                value={selectSubCategory}
                                                onValueChange={(value) => { setSelectSubCategory(value) }}
                                            >
                                                <MenubarRadioItem value="">All</MenubarRadioItem>
                                                <MenubarRadioItem value="Men">Men</MenubarRadioItem>
                                                <MenubarRadioItem value="Women">Women</MenubarRadioItem>
                                                <MenubarRadioItem value="Kids">Kids</MenubarRadioItem>
                                            </MenubarRadioGroup>
                                        </MenubarContent>
                                    </MenubarMenu>
                                )
                            }
                            <MenubarMenu>
                                <MenubarTrigger>Category</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarRadioGroup
                                        value={selectCategory}
                                        onValueChange={(value) => { setSelectCategory(value) }}
                                    >
                                        <MenubarRadioItem value="">All</MenubarRadioItem>
                                        {
                                            getCategory && getCategory.length > 0 ? (
                                                getCategory.map((item, index) => (
                                                    <MenubarRadioItem value={item.category} key={index}>{item.category}</MenubarRadioItem>
                                                ))
                                            ) : null
                                        }
                                    </MenubarRadioGroup>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Brand</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarRadioGroup
                                        value={selectBrand}
                                        onValueChange={(value) => { setSelectBrand(value) }}
                                    >
                                        <MenubarRadioItem value="">All</MenubarRadioItem>
                                        {
                                            getBrand && getBrand.length > 0 ? (
                                                getBrand.map((item, index) => (
                                                    <MenubarRadioItem value={item.brand} key={index}>{item.brand}</MenubarRadioItem>
                                                ))
                                            ) : null
                                        }
                                    </MenubarRadioGroup>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>


                    {/* Main Content */}
                    <main className="w-5/6 py-4 md:py-0 mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {
                                filtered && filtered.length > 0 ? (
                                    filtered.map((product, index) => (
                                        <Card key={index} className="flex flex-col gap-2 p-4">
                                            <div className="flex justify-center items-center">
                                                <Link href={`/${type}/${product.category}/${product._id}`} className="flex justify-center items-center rounded h-[300px] overflow-hidden">
                                                    <img src={product.filename[0].name} alt={product.filename[0].name} className="object-cover rounded" />
                                                </Link>
                                            </div>
                                            <div>
                                                <Link href={`/${type}/${product.category}/${product._id}`}><h3 className="font-semibold text-lg">{product.productName}</h3></Link>
                                                <p className="text-gray-500 text-sm mt-2">Type: {product.subCategory}</p>
                                                <p className="flex text-lg font-semibold items-center gap-3">
                                                    ₹{product.mrp} <span className="text-gray-600 font-normal text-sm line-through">₹{product.price}</span><span className="text-green-600 text-sm">{product.discount}% off</span>
                                                </p>
                                                <Link href={`/${type}/${product.category}/${product._id}`}><Button className=" w-full mt-4">See Item</Button></Link>
                                            </div>
                                        </Card>
                                    ))
                                ) : <h2>No Record Found</h2>
                            }
                        </div>
                    </main>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Page;