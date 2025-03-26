'use client'

import { useEffect, useState } from "react";
import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/includes/Footer";
import Image from "next/image";

function TypeNamePage({ getBrand, getProduct, type, typeName }) {
    const [typeNameData, setTypeNameData] = useState([])
    const [selectSubCategory, setSelectSubCategory] = useState("");
    const [selectBrand, setSelectBrand] = useState("");
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (!Array.isArray(getProduct)) {
            setFiltered([]);
            setTypeNameData([]);
            return;
        }

        let filteredByTypeName;

        if (type === "Shop") {
            // Filter products by `category` only if type is "Shop"
            filteredByTypeName = getProduct.filter(
                (item) => item.category === typeName
            );
        } else {
            // Filter products by `subCategory` and `category` for other types
            filteredByTypeName = getProduct.filter(
                (item) => item.subCategory === type && item.category === typeName
            );
        }

        setTypeNameData(filteredByTypeName);
    }, [getProduct, type, typeName]);


    useEffect(() => {

        const filterItems = () => {
            let filtered = typeNameData;
    
            // Filter by Sub Category
            if (selectSubCategory) {
                filtered = filtered.filter(item => item.subCategory.toLowerCase() === selectSubCategory.toLowerCase());
            }
    
            // Filter by Brand
            if (selectBrand) {
                filtered = filtered.filter(item => item.brand.toLowerCase() === selectBrand.toLowerCase());
            }
    
            setFiltered(filtered);
        };

        filterItems();
    }, [selectBrand, selectSubCategory, typeNameData]);


    return (
        <>
            <div className="mx-4 mt-10">
                <Navbar type={type} />

                <div className="my-8 flex flex-col items-center justify-center">
                    <div className="flex w-5/6 items-center justify-between">
                        <h2 className="font-bold text-xl">Filter</h2>
                        <Menubar>
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
                                                <Link href={`/${type}/${typeName}/${product._id}`} className="flex justify-center items-center rounded h-[300px] overflow-hidden">
                                                    <Image width={300} height={300} src={product.filename[0].name} alt={product.filename[0].name} className="object-cover rounded" />
                                                </Link>
                                            </div>
                                            <div>
                                                <Link href={`/${type}/${typeName}/${product._id}`}><h3 className="font-semibold text-lg">{product.productName}</h3></Link>
                                                <p className="text-gray-500 text-sm mt-2">Type: {product.subCategory}</p>
                                                <p className="flex text-lg font-semibold items-center gap-3">
                                                    ₹{product.mrp} <span className="text-gray-600 font-normal text-sm line-through">₹{product.price}</span><span className="text-green-600 text-sm">{product.discount}% off</span>
                                                </p>
                                                <Link href={`/${type}/${typeName}/${product._id}`}><Button className=" w-full mt-4">See Item</Button></Link>
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

export default TypeNamePage;