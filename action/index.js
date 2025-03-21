'use server'

import Razorpay from "razorpay";
import connectToDB from "@/db/db";
import User from "@/models/user";
import bcrypt from 'bcrypt';
import { revalidatePath } from "next/cache";
import Product from "@/models/product";
import Brand from "@/models/brand";
import Category from "@/models/category";
import fs from 'fs';
import path from 'path';
import nodemailer from "nodemailer";
import crypto from "crypto";
import Profile from "@/models/profile";
import { generateToken, verifyToken } from "@/app/utils/auth";
import { cookies } from "next/headers";
import Order from "@/models/order";
import Cart from "@/models/cart";


// All Authcation Functions

// User Login Function
export async function login(formData, pathToRevalidate) {
    await connectToDB();
    try {
        const { email, password } = formData;

        if (!email || !password) {
            return ({ success: false, message: "All Fields Are Required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return ({ success: false, message: "Invalid Email ID!" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return ({ success: false, message: "Wrong Password!" });
        }
        const payload = {
            id: user._id,
            email: user.email,
            role: user.isAdmin,
        };

        const token = generateToken(payload)

        cookies().set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });

        revalidatePath(pathToRevalidate);
        return ({
            success: true,
            id: JSON.parse(JSON.stringify(user._id)),
            role: JSON.parse(JSON.stringify(user.isAdmin)),
            message: "Login Successfully!"
        });
    } catch (error) {
        console.error("Login Error:", error);
        return ({ success: false, message: "Bad Request" });
    }
}

export async function verifyUserToken() {
    const token = cookies().get("authToken")?.value;

    if (!token) {
        return { success: false, user: null, error: "Unauthorized: No token provided" };
    }

    try {
        const decoded = await verifyToken(token);

        return { success: true, user: decoded };
    } catch (error) {
        return { success: false, user: null, error: "Unauthorized: Invalid token" };
    }
}

// Logout Action
export async function logoutUser() {
    cookies().delete('authToken');
    cookies().delete("userData")
    return { success: true, message: "successfully logout" };
}

// User Signup Function
export async function Signup(formData, pathToRevalidate) {
    await connectToDB();
    try {
        const { fullName, email, password, confirm_password } = formData;
        if (!fullName || !email || !password || !confirm_password) {
            return ({ success: false, message: "All fields are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return ({ success: false, message: "Email not verify. please try again!" });
        }

        if (password !== confirm_password) {
            return ({ success: false, message: "Passwords do not match!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(existingUser._id, { fullName, email, password: hashedPassword, isVerified: true });
        revalidatePath(pathToRevalidate);
        return ({
            success: true,
            message: "Your account has been successfully created.",
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return ({
            success: false,
            message: "An error occurred during signup. Please try again later.",
        });
    }
}

// Email with send otp Function
export async function sendEmail(formData) {
    try {
        await connectToDB()
        const { email } = formData;

        if (!email) {
            return ({ success: false, message: "Email is required." })
        }

        const validateEmail = (email) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        };

        if (!validateEmail(email)) {
            return ({ success: false, message: "Enter a valid email." })

        }
        let user = await User.findOne({ email })

        if (user && user.isVerified) {
            return ({ success: false, message: "This email is already registered." });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const salt = await bcrypt.genSalt(10);
        const hashOTP = await bcrypt.hash(otp, salt)
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        if (!user) {
            user = new User({ email, otp: hashOTP, otpExpiry })
        } else {
            user.otp = hashOTP;
            user.otpExpiry = otpExpiry;
        }

        await user.save()

        await sendOTP(email, otp)
        return { success: true, message: "OTP sent successfully." };
    } catch (error) {
        console.log(error);
        return { success: false, error: error.message };
    }
}

// Email with send otp for forget password Function
export async function sendEmailForForgetPassword(formData) {
    try {
        await connectToDB()
        const { email } = formData;

        if (!email) {
            return ({ success: false, message: "Email is required." })
        }

        const validateEmail = (email) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        };

        if (!validateEmail(email)) {
            return ({ success: false, message: "Enter a valid email." })

        }
        let user = await User.findOne({ email })

        const otp = crypto.randomInt(100000, 999999).toString();
        const salt = await bcrypt.genSalt(10);
        const hashOTP = await bcrypt.hash(otp, salt)
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        if (user && user.isVerified) {
            await User.findByIdAndUpdate(user._id, { otp: hashOTP, otpExpiry: otpExpiry })
        }

        await sendOTP(email, otp)
        return { success: true, message: "OTP sent successfully." };
    } catch (error) {
        console.log(error);
        return { success: false, error: error.message };
    }
}

// Send Otp Function
export async function sendOTP(email, otp) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: `"Trendy" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Account Verification OTP",
            text: `Your OTP for account verification is ${otp} and is valid for 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        return { success: false, error: error.message };
    }
}

// verify Otp Function
export async function verifyOtp(formData) {
    await connectToDB()
    try {
        const { otp, email } = formData
        const user = await User.findOne({ email })
        if (!user) {
            return ({
                success: false,
                message: "User Not Found"
            })
        }

        if (new Date() > new Date(user.otpExpiry)) {
            return ({
                success: false,
                message: "OTP has expired."
            })
        }

        const isOtpValid = await bcrypt.compare(otp, user.otp);

        if (!isOtpValid) {
            return ({
                success: false,
                message: "Invalid OTP"
            })
        }

        return ({
            success: true,
            message: "OTP Successfully Verify."
        })
    } catch (error) {
        console.log(error);
        return ({
            success: true,
            message: error.message
        })
    }
}

// Changed Password Function
export async function changePassword(formData) {
    await connectToDB()
    try {
        const { email, password } = formData
        if (!email) {
            return ({ success: false, message: "Email is required." })
        }

        const validateEmail = (email) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        };

        if (!validateEmail(email)) {
            return ({ success: false, message: "Enter a valid email." })

        }
        const user = await User.findOne({ email })
        if (!user) {
            return ({
                success: false,
                message: "User Not Found."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(user._id, { password: hashedPassword })
        return ({
            success: true,
            message: "Password Successfully Changed ?"
        })

    } catch (error) {
        console.log("Change Password Error:", error);
        return ({
            success: false,
            message: error.message
        })
    }
}

// Fetch All Users
export async function GetAllUsers() {
    await connectToDB()
    try {
        const getAllUser = await User.find({ isAdmin: false })
        if (!getAllUser) {
            return ({ success: false, message: "Data Not Found!" })
        }
        return ({
            success: true,
            data: JSON.parse(JSON.stringify(getAllUser))
        })
    } catch (error) {
        console.log("Fetch Users Error:", error);
        return ({
            success: false,
            message: "An error occurred while fetching Users. Please try again later.",
        });
    }
}

// Delete User
export async function DeleteUser(id, pathToRevalidate) {
    await connectToDB();
    try {
        if (!id) {
            return ({
                success: false,
                message: "User ID is required to delete a user.",
            });
        }

        const deleteUser = await User.findByIdAndDelete(id);
        revalidatePath(pathToRevalidate);

        if (!deleteUser) {
            return ({
                success: false,
                message: "User not found or could not be deleted.",
            });
        }

        return ({
            success: true,
            message: "User deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return ({
            success: false,
            message: "An error occurred while deleting the user. Please try again later.",
        });
    }
}

// Fetch One User
export async function SingleUser(id) {
    await connectToDB();
    try {
        if (!id) {
            return ({
                success: false,
                message: "User ID is required to Fetch a user.",
            });
        }
        const getUser = await User.findOne({ _id: id });
        if (!getUser) {
            return ({
                success: false,
                message: "User not found.",
            });
        }
        return ({
            success: true,
            data: JSON.parse(JSON.stringify(getUser))
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return ({
            success: false,
            message: "An error occurred while fetching the user. Please try again later.",
        });
    }
}

// Products All Functions

// Create Product Function
export async function AddProduct(formData, pathToRevalidate) {
    await connectToDB();
    try {
        if (!formData) {
            return ({ success: false, message: "All fields are required!" });
        }

        const newRecord = await Product.create(formData)
        revalidatePath(pathToRevalidate);
        if (!newRecord) {
            return ({
                success: true,
                message: "Something Went Wrong. Please Try Again ?",
            });
        }

        return ({
            success: true,
            message: "New Product Successfully Added.",
        });
    } catch (error) {
        console.error("Product Adding Error:", error);
        return ({
            success: false,
            message: "An error occurred during Product. Please try again later.",
        });
    }
}

// Get All Product
export async function GetAllProduct() {
    await connectToDB()
    try {
        const getAllProduct = await Product.find()
        if (!getAllProduct) {
            return ({ success: false, message: "Data Not Found!" })
        }
        return ({
            data: JSON.parse(JSON.stringify(getAllProduct))
        })
    } catch (error) {
        console.log("Fetch Product Error:", error);
        return ({
            success: false,
            message: "An error occurred while fetching products. Please try again later.",
        });
    }
}

// Fetch Single Product
export async function SingleProduct(id) {
    await connectToDB();
    try {
        if (!id) {
            return ({
                success: false,
                message: "Product ID is required to Fetch a Product.",
            });
        }
        const fetchSingleRecord = await Product.findOne({ _id: id })
        if (!fetchSingleRecord) {
            return ({
                success: false,
                message: "Product not found.",
            });
        }
        return ({
            success: true,
            data: JSON.parse(JSON.stringify(fetchSingleRecord))
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return ({
            success: false,
            message: "An error occurred while fetching the product. Please try again later.",
        });
    }
}

// Product Updated Function
export async function EditProduct(id, formData, pathToRevalidate) {
    await connectToDB();
    try {
        if (!formData) {
            return ({ success: false, message: "All fields are required!" });
        }

        const updateRecord = await Product.findByIdAndUpdate(id, formData)
        revalidatePath(pathToRevalidate);
        if (!updateRecord) {
            return ({
                success: true,
                message: "Something Went Wrong. Please Try Again ?",
            });
        }

        return ({
            success: true,
            message: "Product Successfully Updated.",
        });
    } catch (error) {
        console.error("Product Adding Error:", error);
        return ({
            success: false,
            message: "An error occurred during Product. Please try again later.",
        });
    }
}

// Product Delete Function
export async function DeleteProduct(id, pathToRevalidate) {
    await connectToDB();
    try {
        if (!id) {
            return ({
                success: false,
                message: "Product ID is required to delete a product.",
            });
        }

        const deleteRecord = await Product.findByIdAndDelete(id);
        if (!deleteRecord) {
            return ({
                success: false,
                message: "Product not found or could not be deleted.",
            });
        }
        const deleteImages = deleteRecord.filename
        for (const imageName of deleteImages) {
            const filePath = path.join(process.cwd(), './public', imageName.name);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        revalidatePath(pathToRevalidate);

        return ({
            success: true,
            message: "Product deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return ({
            success: false,
            message: "An error occurred while deleting the product. Please try again later.",
        });
    }
}

// BrandS All Functions

// Create Brand Function
export async function AddBrand(formData, pathToRevalidate) {
    await connectToDB();
    try {
        const { brand, filename } = formData
        if (!brand || !filename) {
            return ({ success: false, message: "Brand Name & Filename are required!" });
        }

        const newRecord = await Brand.create(formData)
        revalidatePath(pathToRevalidate);
        if (!newRecord) {
            return ({
                success: true,
                message: "Something Went Wrong. Please Try Again ?",
            });
        }

        return ({
            success: true,
            message: "New Brand Successfully Added.",
        });
    } catch (error) {
        console.error("Brand Adding Error:", error);
        return ({
            success: false,
            message: "An error occurred during brand. Please try again later.",
        });
    }
}

// Get All Brand
export async function GetAllBrand() {
    await connectToDB()
    try {
        const getAllBrand = await Brand.find()
        if (!getAllBrand) {
            return ({ success: false, message: "Data Not Found!" })
        }
        return ({
            success: true,
            data: JSON.parse(JSON.stringify(getAllBrand))
        })
    } catch (error) {
        console.log("Fetch Brand Error:", error);
        return ({
            success: false,
            message: "An error occurred while fetching Brands. Please try again later.",
        });
    }
}

// Brand Update Functions
export async function UpdateBrand(id, formData, pathToRevalidate) {
    await connectToDB();
    try {
        const { brand, filename } = formData
        if (!brand || !filename) {
            return ({ success: false, message: "Brand Name & Filename are required!" });
        }

        const checkData = await Brand.find({ _id: id })

        if (!checkData) {
            return ({ success: false, message: "Data Not Found!" });
        }

        const updateRecord = await Brand.findByIdAndUpdate(id, formData)
        revalidatePath(pathToRevalidate);
        if (!updateRecord) {
            return ({
                success: true,
                message: "Something Went Wrong. Please Try Again ?",
            });
        }

        return ({
            success: true,
            message: "Brand Successfully Updated.",
        });
    } catch (error) {
        console.error("Brand Adding Error:", error);
        return ({
            success: false,
            message: "An error occurred during brand. Please try again later.",
        });
    }
}

// Brand Delete Function
export async function DeleteBrand(id, pathToRevalidate) {
    await connectToDB();
    try {
        if (!id) {
            return ({
                success: false,
                message: "Brand ID is required to delete a brand.",
            });
        }

        const deleteRecord = await Brand.findByIdAndDelete(id);
        if (!deleteRecord) {
            return ({
                success: false,
                message: "Brand not found or could not be deleted.",
            });
        }
        const filename = deleteRecord.filename
        if (filename) {
            const filePath = path.join(process.cwd(), './public', filename);
            fs.unlinkSync(filePath);
        }
        revalidatePath(pathToRevalidate);

        return ({
            success: true,
            message: "Brand deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting brand:", error);
        return ({
            success: false,
            message: "An error occurred while deleting the brand. Please try again later.",
        });
    }
}

// Category All Functions

// Create Category Function
export async function AddCategory(formData, pathToRevalidate) {
    await connectToDB();
    try {
        const { category, filename } = formData
        if (!category || !filename) {
            return ({ success: false, message: "Category Name & Filename are required!" });
        }

        const newRecord = await Category.create(formData)
        revalidatePath(pathToRevalidate);
        if (!newRecord) {
            return ({
                success: true,
                message: "Something Went Wrong. Please Try Again ?",
            });
        }

        return ({
            success: true,
            message: "New Category Successfully Added.",
        });
    } catch (error) {
        console.error("Category Adding Error:", error);
        return ({
            success: false,
            message: "An error occurred during category. Please try again later.",
        });
    }
}

// Get All Category
export async function GetAllCategory() {
    await connectToDB()
    try {
        const getAllCategory = await Category.find()
        if (!getAllCategory) {
            return ({ success: false, message: "Data Not Found!" })
        }
        return ({
            success: true,
            data: JSON.parse(JSON.stringify(getAllCategory))
        })
    } catch (error) {
        console.log("Fetch Category Error:", error);
        return ({
            success: false,
            message: "An error occurred while fetching Categorys. Please try again later.",
        });
    }
}

// Category Delete Function
export async function DeleteCategory(id, pathToRevalidate) {
    await connectToDB();
    try {
        if (!id) {
            return ({
                success: false,
                message: "Category ID is required to delete a category.",
            });
        }

        const deleteRecord = await Category.findByIdAndDelete(id);
        if (!deleteRecord) {
            return ({
                success: false,
                message: "Category not found or could not be deleted.",
            });
        }
        const filename = deleteRecord.filename
        if (filename) {
            const filePath = path.join(process.cwd(), './public', filename);
            fs.unlinkSync(filePath);
        }
        revalidatePath(pathToRevalidate);

        return ({
            success: true,
            message: "Category deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        return ({
            success: false,
            message: "An error occurred while deleting the category. Please try again later.",
        });
    }
}

// Category Update Functions
export async function UpdateCategory(id, formData, pathToRevalidate) {
    await connectToDB();
    try {
        const { category, filename } = formData
        if (!category || !filename) {
            return ({ success: false, message: "Category Name & Filename are required!" });
        }

        const checkData = await Category.find({ _id: id })

        if (!checkData) {
            return ({ success: false, message: "Data Not Found!" });
        }

        const updateRecord = await Category.findByIdAndUpdate(id, formData)
        revalidatePath(pathToRevalidate);
        if (!updateRecord) {
            return ({
                success: true,
                message: "Something Went Wrong. Please Try Again ?",
            });
        }

        return ({
            success: true,
            message: "Category Successfully Updated.",
        });
    } catch (error) {
        console.error("Category Updateing Error:", error);
        return ({
            success: false,
            message: "An error occurred during category. Please try again later.",
        });
    }
}

// Profile Create function
export async function CreateProfile(formData, pathToRevalidate) {
    await connectToDB()
    try {
        const { userID } = formData

        if (!userID) {
            return ({
                success: false,
                message: "Invalid ID"
            })
        }

        const checkUser = await User.findOne({ _id: userID })
        if (!checkUser) {
            return ({
                success: false,
                message: "User Not Found"
            })
        }
        const newRecored = await Profile.create(formData)
        if (!newRecored) {
            return ({
                success: false,
                message: "Something went wrong. please try again ?"
            })
        }
        revalidatePath(pathToRevalidate)

        return ({
            success: true,
            message: "Your profile is successfully created."
        })

    } catch (error) {
        console.log("profile create error:", error);
        return ({
            success: false,
            message: "An error occurred during profile. Please try again later."
        })
    }
}

// Fetch Profile Data By Id Function
export async function fetchProfile(userID) {
    await connectToDB()
    try {
        if (!userID) {
            return ({
                success: false,
                message: "Invalid ID"
            })
        }

        const getProfile = await Profile.findOne({ userID: userID })

        if (!getProfile) {
            return ({
                success: false,
                message: "User Not Found."
            })
        }

        return ({
            success: true,
            data: JSON.parse(JSON.stringify(getProfile))
        })
    } catch (error) {
        console.log("profile fetcing error:", error);
        return ({
            success: false,
            message: "An error occurred during profile. Please try again later."
        })
    }
}

// Profile Update function
export async function UpdateProfile(formData, id, pathToRevalidate) {
    await connectToDB()
    try {
        if (!id) {
            return ({
                success: false,
                message: "Invalid ID"
            })
        }

        const checkUser = await Profile.findOne({ _id: id })

        if (!checkUser) {
            return ({
                success: false,
                message: "User Not Found"
            })
        }
        const updated = await Profile.findByIdAndUpdate(id, formData, { new: true })
        if (!updated) {
            return ({
                success: false,
                message: "Something went wrong. please try again ?"
            })
        }
        revalidatePath(pathToRevalidate)

        return ({
            success: true,
            message: "Your profile is successfully Updated."
        })

    } catch (error) {
        console.log("Profile updated Error:", error);
        return ({
            success: false,
            message: "An error occurred during profile. Please try again later."
        })
    }
}

// Rozorpay function
export async function Rozorpay(formData) {
    await connectToDB()
    try {
        const { amount, customer, product, userId } = formData;

        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Math.random() * 1000}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        const newOrder = new Order({
            order_id: order.id,
            customer,
            product,
            amount,
            isProcessing: Date.now(),
            payment: "Pending"
        });

        await newOrder.save();

        if (newOrder) {
            await Cart.deleteMany({ userID: userId })
            return ({ success: true, order: JSON.parse(JSON.stringify(order)) });
        } else {
            return ({
                success: false,
                message: "Failed To Create To Order ! Please Try Again."
            })
        }
    } catch (error) {
        console.error(error);
        return ({ success: false, error: error.message });
    }
}

// WebHook Function
export async function handleWebhook(req) {
    try {
        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature");

        const secret = process.env.NEXT_PUBLIC_RAZORPAY_WEBHOOK_SECRET;

        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body)
            .digest("hex");

        if (expectedSignature !== signature) {
            return { success: false, message: "Invalid Signature" };
        }

        const webhookData = JSON.parse(body);
        await connectToDB();

        if (webhookData.event === "payment.captured") {
            await Order.findOneAndUpdate(
                { order_id: webhookData.payload.payment.entity.order_id },
                {
                    $set: { status: "Paid", payment_id: webhookData.payload.payment.entity.id },
                }
            );

            return { success: true, message: "Payment Verified & Order Updated" };
        }

        return { success: false, message: "No Action Taken" };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Cart Product get Function 
export async function FetchCart(userID) {
    connectToDB()
    try {
        if (!userID) {
            return ({ success: false, message: "Invalid ID!" })
        }
        const getCartProduct = await Cart.find({ userID }).populate("productID")
        if (getCartProduct) {
            return ({ success: true, getCartProduct: JSON.parse(JSON.stringify(getCartProduct)) })
        } else {
            return ({ success: false, message: "Something Went Wrong. Please Try Again!" })
        }
    } catch (error) {
        console.log(error);
        return ({ success: false, message: "Bad Request" })
    }
}

// Order Fetch Function
export async function FetchOrder() {
    connectToDB()
    try {
        const getOrders = await Order.find().populate("product")

        if (!getOrders) {
            return ({
                success: false,
                message: "Error Fetching To Ordered Products"
            })
        }

        return ({
            success: true,
            getOrders: JSON.parse(JSON.stringify(getOrders))
        })

    } catch (error) {
        console.log(error);
        return ({
            success: false,
            message: "Something Went Wrong, Please Try Again."
        })
    }
}

// Order Fetch by userID function
export async function GetOrderByID(userID) {
    try {
        if (!userID) {
            return ({
                success: false,
                message: "Invalid ID"
            })
        }

        const getAllOrder = await Order.find({ userId: userID }).populate("product")

        if (!getAllOrder) {
            return ({
                success: false,
                message: "Error Fetching To Ordered Products"
            })
        }

        return ({
            success: true,
            getAllOrder: JSON.parse(JSON.stringify(getAllOrder))
        })

    } catch (error) {
        console.log(error);
        return ({
            success: false,
            message: "Something Went Wrong, Please Try Again."
        })
    }
}