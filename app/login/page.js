'use client'

import { Input } from "@/components/ui/input";
import Navbar from "../component/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";

function Login() {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    })
    const router = useRouter()
    const { isLogin, setIsLogin, user, setUser } = useContext(GlobalContext)

    async function handleLoginForm() {
        try {
            const response = await axios.post('/api/login', loginFormData)
            if (response.data.success === true) {
                setIsLogin(true)
                setUser(response.data.user.role)
                Cookies.set("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                if(response.data.user.role === true){
                    router.push('/admin-dashboard')
                }else{
                    router.push("/")
                }
            } else {
                setIsLogin(false)
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    useEffect(() => {
        if (isLogin && !user) {
            router.push('/')
        } else if (isLogin && user) {
            router.push('/admin-dashboard')
        }
    }, [isLogin, user])

    return (
        <>
            <div className="border rounded-3xl mx-12 my-4 bg-[#F0F1F0] p-4 h-screen">
                <div className="flex h-full justify-center items-center">
                    <div className="flex w-11/12 sm:w-4/5 lg:w-1/2 justify-center items-center">
                        <div className="hidden lg:block lg:w-1/2">
                            <h2 className="text-center font-semibold text-4xl">E-Commerce</h2>
                            <p className="text-center">This Is A E-Commerce Website.</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="auto" height={"auto"} fill="none" viewBox="0 0 800 600">
                                <path d="M148 250.498C148 289.726 189.492 318.176 207.823 349.857C226.738 382.518 231.277 432.49 263.966 451.382C295.657 469.706 340.76 449.216 380 449.216C419.24 449.216 464.343 469.706 496.034 451.382C528.706 432.473 533.262 382.535 552.177 349.857C570.508 318.176 612 289.691 612 250.498C612 211.305 570.508 182.821 552.177 151.139C533.262 118.478 528.723 68.5235 496.034 49.6144C464.343 31.2898 419.24 51.7976 380 51.7976C340.76 51.7976 295.657 31.2898 263.966 49.6144C231.294 68.5235 226.738 118.478 207.823 151.139C189.492 182.821 148 211.305 148 250.498Z" fill="black" opacity="0.07" />
                                <path d="M416.324 311.42L435.288 373.475L436.532 458.67L449.289 461.016C456.468 429.199 463.643 397.378 470.813 365.552C466.484 343.241 462.146 320.935 457.799 298.634L395.586 296.875L368.642 351.222C371.941 376.011 375.249 400.768 378.567 425.49L389.908 423.531C392.34 402.822 394.761 382.109 397.174 361.39C435.311 320.859 452.903 298.615 449.947 294.658C448.002 291.979 436.794 297.566 416.324 311.42Z" fill="#066FD1" />
                                <path d="M454.666 485.958L433.757 475.818C433.757 475.818 434.729 469.354 438.748 468.353C442.767 467.352 452.778 478.936 454.666 485.958ZM380.783 456.497L394.198 436.117C394.198 436.117 390.394 431.068 386.475 432.441C382.557 433.814 379.196 449.374 380.783 456.497Z" fill="#454C5E" />
                                <path d="M389.909 423.502L397.174 361.362L422.917 333.173C420.524 325.135 418.14 317.088 415.766 309.032L390.995 305.957C383.53 321.031 376.069 336.109 368.613 351.193L378.539 425.462L389.909 423.502Z" fill="black" opacity="0.15" />
                                <path d="M381.184 70.8794C380.393 67.7942 378.6 65.059 376.087 63.1023C373.574 61.1456 370.482 60.0782 367.297 60.0673H241.299C237.48 60.0673 233.817 61.5846 231.116 64.2855C228.415 66.9863 226.897 70.6495 226.897 74.4691V157.319C226.901 160.659 228.063 163.894 230.187 166.472L294.745 244.702C296.101 246.346 297.805 247.668 299.734 248.573C301.663 249.478 303.768 249.943 305.899 249.935C308.03 249.926 310.132 249.445 312.054 248.525C313.976 247.606 315.669 246.271 317.013 244.617L354.311 198.765L354.526 197.807L378.124 166.586C379.342 164.502 380.266 162.259 380.87 159.922C381.461 157.634 381.735 155.276 381.685 152.914V70.7793L381.184 70.8794Z" fill="#232B41" />
                                <path d="M305.8 253.798C303.096 253.803 300.425 253.207 297.979 252.055C295.533 250.902 293.373 249.222 291.655 247.134L227.14 168.918C224.43 165.632 222.943 161.507 222.936 157.247V74.4977C222.943 69.6335 224.879 64.9707 228.318 61.5312C231.758 58.0918 236.42 56.1561 241.285 56.1486H367.297C372.155 56.1637 376.809 58.1031 380.24 61.5422C383.671 64.9813 385.6 69.6398 385.603 74.4977H377.723C377.719 71.731 376.621 69.0784 374.667 67.1194C372.713 65.1605 370.064 64.0544 367.297 64.0431H241.299C238.527 64.0469 235.87 65.1496 233.911 67.1094C231.951 69.0692 230.848 71.7261 230.844 74.4977V157.319C230.846 159.745 231.69 162.096 233.233 163.969L297.791 242.185C298.763 243.37 299.986 244.325 301.37 244.983C302.754 245.64 304.267 245.984 305.8 245.99C307.349 245.987 308.878 245.639 310.276 244.971C311.673 244.303 312.905 243.332 313.88 242.128L351.165 196.277L357.286 201.254L320.101 247.034C318.393 249.143 316.236 250.845 313.786 252.015C311.337 253.186 308.657 253.795 305.943 253.798H305.8Z" fill="#454C5E" />
                                <path d="M328.469 115.329C328.472 110.829 327.222 106.417 324.858 102.588C322.494 98.7589 319.109 95.6645 315.085 93.6519C311.06 91.6394 306.553 90.7883 302.072 91.1942C297.59 91.6001 293.31 93.2469 289.712 95.9499C286.114 98.6528 283.341 102.305 281.703 106.496C280.066 110.688 279.628 115.253 280.441 119.679C281.253 124.105 283.283 128.217 286.302 131.554C289.321 134.891 293.211 137.32 297.534 138.569L284.019 170.805H324.393L310.935 138.584C315.984 137.134 320.426 134.082 323.589 129.887C326.752 125.692 328.465 120.583 328.469 115.329Z" fill="#066FD1" />
                                <path d="M419.428 98.8106V207.375C419.428 209.271 418.674 211.09 417.333 212.431C415.992 213.772 414.173 214.526 412.277 214.526H403.181C401.436 213.711 400.135 213.096 399.305 212.781C396.259 204.658 395.572 184.678 395.572 160.666C395.572 153.701 395.572 146.364 395.701 138.956C395.801 128.63 395.944 118.004 395.987 107.62V98.7677C395.987 96.8712 396.74 95.0523 398.081 93.7113C399.423 92.3702 401.241 91.6168 403.138 91.6168H412.234C413.18 91.6111 414.118 91.7933 414.993 92.1528C415.869 92.5123 416.664 93.042 417.333 93.7111C418.002 94.3803 418.532 95.1756 418.892 96.0509C419.251 96.9263 419.433 97.8643 419.428 98.8106Z" fill="#FFCB9D" />
                                <path d="M419.427 107.663V130.675C416.293 132.052 413.037 133.134 409.702 133.907C405.104 134.974 400.39 135.454 395.672 135.337C395.729 130.751 395.782 126.151 395.829 121.536C395.829 116.902 395.929 112.268 395.958 107.692L419.427 107.663Z" fill="black" opacity="0.1" />
                                <path d="M370.415 130.207L333.881 130.954L333.606 117.499L370.14 116.752L370.415 130.207ZM410.717 129.388L384.137 129.931L383.861 116.476L410.444 115.933L410.717 129.388ZM588.23 98.2957C585.488 87.5699 578.926 78.2136 569.775 71.9829C560.625 65.7522 549.514 63.0755 538.53 64.4554C527.546 65.8352 517.443 71.1766 510.117 79.4771C502.792 87.7775 498.748 98.4662 498.744 109.537V110.466C498.801 112.923 499.05 115.371 499.488 117.789C500.609 123.772 502.92 129.47 506.285 134.543C509.649 139.616 513.999 143.961 519.075 147.321C524.151 150.681 529.851 152.987 535.835 154.102C541.82 155.217 547.967 155.119 553.913 153.813C559.859 152.507 565.481 150.02 570.448 146.499C575.414 142.979 579.622 138.496 582.823 133.318C586.023 128.14 588.151 122.372 589.08 116.356C590.009 110.339 589.72 104.198 588.23 98.2957ZM567.778 132.191C563.736 136.402 558.641 139.454 553.021 141.031C547.401 142.608 541.461 142.653 535.818 141.16C530.175 139.667 525.035 136.691 520.93 132.542C516.825 128.392 513.905 123.219 512.474 117.56C511.872 115.169 511.546 112.717 511.501 110.252C511.404 105.955 512.157 101.682 513.717 97.6765C515.276 93.6715 517.611 90.0139 520.588 86.9136C523.564 83.8134 527.124 81.3317 531.062 79.6108C535.001 77.89 539.24 76.964 543.537 76.886C550.008 76.7447 556.376 78.5265 561.833 82.0059C567.291 85.4852 571.594 90.5056 574.197 96.4316C576.8 102.358 577.587 108.923 576.457 115.296C575.327 121.669 572.332 127.564 567.85 132.234L567.778 132.191Z" fill="#A7AAB3" />
                                <path d="M544.11 105.833C544.1 105.358 543.997 104.889 543.807 104.453C543.617 104.018 543.342 103.624 542.999 103.295C542.657 102.966 542.253 102.707 541.81 102.534C541.367 102.361 540.895 102.276 540.42 102.286L512.16 102.858L499.202 103.13L460.731 103.916L448.56 104.174L412.434 104.903L394.07 105.275L307.573 107.048C305.686 107.132 303.903 107.94 302.596 109.306C301.29 110.671 300.561 112.488 300.561 114.378C300.561 116.268 301.29 118.085 302.596 119.45C303.903 120.816 305.686 121.624 307.573 121.708H307.874L328.039 121.307L370.158 120.42L383.902 120.134L397.26 119.863L409.874 119.62H410.489L448.231 118.862L461.102 118.604L499.46 117.818L512.431 117.546L540.677 116.974C541.639 116.951 542.554 116.549 543.221 115.855C543.888 115.161 544.254 114.232 544.238 113.27L544.11 105.833Z" fill="#DADBE0" />
                                <path d="M399.276 212.824C399.367 213.091 399.472 213.354 399.591 213.61C399.065 213.263 398.564 212.88 398.089 212.466C398.132 212.395 398.518 212.509 399.276 212.824Z" fill="#FFCB9D" />
                                <path d="M265.755 537.015C265.755 539.704 317.627 541.863 381.599 541.863C445.57 541.863 497.443 539.704 497.443 537.015C497.443 534.326 445.57 532.181 381.599 532.181C317.627 532.181 265.755 534.341 265.755 537.015Z" fill="#1D2535" opacity="0.5" />
                                <path d="M466.465 240.741C464.348 252.854 462.389 264.138 463.905 278.64C464.989 288.834 467.577 298.81 471.585 308.245C460.015 312.189 448.009 314.715 435.831 315.768C417.595 317.326 399.228 315.607 381.599 310.691C387.915 299.066 392.355 286.516 394.756 273.506C397.903 256.487 396.372 242.5 395.142 230.258C394.956 228.513 394.771 226.84 394.57 225.209C393.526 216.843 392.139 209.892 390.995 204.786C392.799 201.774 395.24 199.192 398.146 197.221C402.662 194.274 408.009 192.864 413.391 193.202C413.205 194.632 413.048 195.948 412.862 197.321C413.883 196.851 414.929 196.436 415.994 196.077C417.033 195.7 418.093 195.385 419.169 195.133C420.902 194.68 422.666 194.355 424.447 194.16C422.587 201.769 425.877 209.02 431.597 211.479C431.886 211.608 432.182 211.718 432.484 211.808C435.887 212.779 439.532 212.422 442.681 210.807C441.251 214.883 442.267 216.07 442.567 216.356C444.154 217.872 448.774 216.356 454.18 212.28C454.51 211.954 454.812 211.6 455.081 211.222C456.514 209.164 457.291 206.722 457.312 204.214C457.655 204 457.998 203.799 458.342 203.628C463.447 197.55 471.099 197.564 473.959 200.768C476.061 203.17 475.947 207.775 473.602 211.851C470.53 221.297 468.145 230.952 466.465 240.741Z" fill="#DADBE0" />
                                <path d="M414.737 111.139C414.719 112.718 414.327 114.272 413.594 115.671C412.86 117.07 411.806 118.277 410.518 119.191C410.326 119.345 410.125 119.488 409.917 119.62L397.303 119.863C395.783 118.99 394.502 117.757 393.57 116.273C392.52 114.606 392.004 112.657 392.094 110.688C392.183 108.72 392.873 106.826 394.071 105.261L412.434 104.889C413.913 106.636 414.729 108.849 414.737 111.139Z" fill="black" opacity="0.1" />
                                <path d="M407.628 116.159C414.057 116.159 419.27 110.671 419.27 103.902C419.27 97.1328 414.057 91.6454 407.628 91.6454C401.198 91.6454 395.986 97.1328 395.986 103.902C395.986 110.671 401.198 116.159 407.628 116.159Z" fill="#FFCB9D" />
                                <path d="M456.969 112.125C456.98 114.289 456.784 116.449 456.383 118.576L443.511 118.833C443.074 116.624 442.859 114.377 442.868 112.125C442.855 109.442 443.167 106.768 443.797 104.159L455.968 103.902C456.647 106.59 456.983 109.353 456.969 112.125Z" fill="black" opacity="0.1" />
                                <path d="M460.902 91.6454H456.082C450.94 91.6454 446.771 95.8138 446.771 100.956V205.273C446.771 210.415 450.94 214.583 456.082 214.583H460.902C466.044 214.583 470.212 210.415 470.212 205.273V100.956C470.212 95.8138 466.044 91.6454 460.902 91.6454Z" fill="#FFCB9D" />
                                <path d="M439.092 136.324C438.368 135.873 437.526 135.649 436.673 135.679C435.821 135.709 434.997 135.993 434.306 136.494C433.616 136.995 433.09 137.69 432.797 138.491C432.504 139.292 432.456 140.162 432.659 140.991C432.863 141.819 433.308 142.568 433.94 143.142C434.571 143.716 435.359 144.088 436.203 144.212C437.047 144.336 437.908 144.205 438.678 143.837C439.447 143.469 440.089 142.88 440.522 142.145C441.091 141.18 441.26 140.031 440.992 138.943C440.725 137.856 440.043 136.916 439.092 136.324ZM452.822 104.689C448.484 113.27 444.155 121.808 439.836 130.303L444.412 133.163L459.615 109.98L452.822 104.689ZM455.082 149.095C455.701 148.788 456.368 148.589 457.055 148.509C457.648 148.43 458.25 148.43 458.843 148.509C459.396 148.581 459.941 148.701 460.473 148.867L461.903 149.31C462.341 149.44 462.792 149.517 463.248 149.539C463.67 149.564 464.093 149.486 464.478 149.31C464.765 149.173 465.019 148.974 465.219 148.726C465.42 148.479 465.562 148.19 465.636 147.88C465.786 147.217 465.695 146.522 465.379 145.92C465.052 145.219 464.518 144.635 463.849 144.247C463.136 143.849 462.334 143.637 461.517 143.632L462.118 138.426C463.837 138.462 465.516 138.956 466.981 139.857C468.59 140.898 469.859 142.39 470.628 144.147C471.252 145.385 471.612 146.739 471.686 148.123C471.759 149.332 471.476 150.535 470.871 151.584C470.193 152.682 469.195 153.546 468.01 154.058C467.28 154.417 466.498 154.658 465.693 154.773C465.026 154.881 464.345 154.881 463.677 154.773C463.048 154.645 462.461 154.487 461.889 154.316L460.259 153.786C459.773 153.623 459.268 153.522 458.757 153.486C458.262 153.471 457.77 153.579 457.327 153.801L455.082 149.095ZM447.845 155.474C447.644 155.062 447.539 154.61 447.539 154.151C447.539 153.693 447.644 153.24 447.845 152.828C448.221 151.948 448.916 151.243 449.79 150.855C450.633 150.419 451.612 150.327 452.522 150.597C452.962 150.722 453.369 150.943 453.713 151.245C454.057 151.547 454.329 151.921 454.509 152.342C454.721 152.75 454.841 153.2 454.86 153.659C454.88 154.119 454.799 154.577 454.624 155.002C454.253 155.877 453.563 156.578 452.693 156.961C451.841 157.382 450.865 157.478 449.947 157.233C449.485 157.121 449.055 156.905 448.69 156.6C448.326 156.294 448.036 155.909 447.845 155.474Z" fill="#066FD1" />
                                <path d="M432.528 211.823L393.913 277.954C395.601 269.386 396.52 260.685 396.659 251.953C396.81 243 396.13 234.051 394.628 225.223C393.584 216.857 392.197 209.906 391.053 204.801C392.857 201.788 395.298 199.206 398.204 197.235C402.72 194.288 408.067 192.878 413.449 193.216C413.263 194.646 413.106 195.962 412.92 197.335C413.941 196.865 414.987 196.45 416.052 196.091C417.091 195.715 418.151 195.399 419.227 195.147C420.96 194.694 422.724 194.369 424.504 194.174C427.184 200.057 429.858 205.94 432.528 211.823Z" fill="black" opacity="0.1" />
                                <path d="M471.858 202.884C471.028 206.474 466.423 207.275 460.802 208.533C456.747 209.287 452.831 210.656 449.189 212.595C447.25 213.706 445.494 215.11 443.984 216.757C440.251 220.847 440.051 224.38 435.217 226.611C431.812 228.083 428.005 228.341 424.433 227.34C415.037 224.666 409.087 213.038 410.003 202.87C410.116 201.554 410.35 200.252 410.704 198.98L419.542 193.559C419.928 201.454 424.204 208.262 430.569 211.05C434.82 212.85 439.568 213.098 443.984 211.751C446.448 211.017 448.613 209.513 450.162 207.461C451.605 205.402 452.388 202.953 452.407 200.439L464.964 199.852L471.514 199.552C471.978 200.599 472.098 201.765 471.858 202.884Z" fill="#FFCB9D" />
                                <path d="M430.554 211.065C429.758 210.72 428.992 210.309 428.266 209.835H410.389C411.948 217.801 417.139 225.281 424.419 227.354C427.99 228.355 431.798 228.097 435.202 226.625C439.178 224.794 440.022 222.063 442.353 218.874V212.223C438.394 213.046 434.278 212.642 430.554 211.065Z" fill="black" opacity="0.1" />
                                <path d="M433.715 158.52C435.145 161.381 437.347 165.442 439.821 170.591C440.351 171.735 440.823 172.722 440.994 173.065C443.527 178.804 445.324 184.839 446.343 191.028C446.529 192.258 446.672 193.445 446.758 194.632C447.058 199.037 436.747 210.621 424.991 215.884C413.235 221.147 402.952 212.752 404.968 205.344C405.55 202.519 405.613 199.611 405.154 196.763C404.679 192.9 403.924 189.076 402.894 185.322C402.365 183.162 401.922 181.789 401.922 181.789L406.212 169.175L427.064 156.918C428.881 160.58 431.226 162.468 432.456 162.038C433.686 161.609 433.715 159.078 433.715 158.52Z" fill="#FFCB9D" />
                                <path d="M433.714 158.52C435.144 161.381 437.347 165.442 439.821 170.591C440.35 171.735 440.822 172.722 440.994 173.065C443.526 178.804 445.323 184.839 446.342 191.028C444.743 191.396 443.087 191.454 441.466 191.2C439.688 190.893 437.988 190.242 436.46 189.283C434.865 188.23 433.446 186.932 432.255 185.436C431.428 184.532 430.659 183.577 429.953 182.576C423.52 189.934 414.811 194.928 405.211 196.763C404.736 192.9 403.98 189.076 402.951 185.322C402.422 183.162 401.979 181.789 401.979 181.789L406.269 169.175L427.121 156.918C428.937 160.58 431.283 162.468 432.513 162.038C433.743 161.609 433.714 159.078 433.714 158.52Z" fill="black" opacity="0.1" />
                                <path d="M388.121 186.852C389.605 187.888 391.191 188.769 392.855 189.484C394.975 190.437 397.218 191.087 399.519 191.414C409.888 192.844 421.058 186.723 427.722 175.682C428.831 173.803 429.788 171.837 430.583 169.804C430.583 169.804 430.583 169.804 430.668 169.804C431.398 170.903 432.044 172.055 432.599 173.251C432.828 173.809 432.928 173.966 433.071 174.309L433.214 174.696C434.051 177.413 435.127 180.05 436.432 182.576C437.44 184.066 438.891 185.202 440.58 185.822C439.705 183.282 439.479 180.563 439.922 177.913C440.142 176.943 440.424 175.988 440.765 175.053C442.021 170.097 441.421 164.852 439.078 160.308C438.094 158.457 436.83 156.768 435.331 155.302C434.358 154.33 430.826 150.812 426.864 150.068C418.712 148.523 407.228 158.649 402.122 164.498C401.045 166.021 399.557 167.207 397.832 167.917C397.464 168.017 397.08 168.046 396.702 168.002C394.256 167.773 392.411 164.942 391.839 162.825C390.667 158.72 393.055 153.801 397.789 150.211C385.303 154.087 378.281 165.485 380.183 175.325C381.202 180.065 384.056 184.209 388.121 186.852Z" fill="#454C5E" />
                                <path d="M388.121 186.852C389.606 187.888 391.192 188.77 392.855 189.484C394.975 190.437 397.218 191.087 399.52 191.414C409.888 192.844 421.058 186.723 427.723 175.682C429.153 172.722 430.426 170.19 430.583 169.804L432.156 164.956C428.369 170.672 423.577 175.653 418.012 179.658C413.078 183.191 406.241 188.125 396.716 188.239C393.799 188.199 390.903 187.732 388.121 186.852Z" fill="black" opacity="0.5" />
                                <path d="M474.875 207.375C476.027 202.631 476.821 197.807 477.249 192.944C474.102 193.07 470.955 192.699 467.924 191.843C462.99 190.413 460.959 188.439 456.411 186.537C452.341 184.874 448.006 183.949 443.611 183.806C443.311 187.839 442.739 193.645 441.609 200.61C440.479 207.575 439.907 211.022 438.32 214.697C435.765 220.409 431.774 225.361 426.735 229.071L469.483 223.45C471.738 218.256 473.541 212.878 474.875 207.375Z" fill="#DADBE0" />
                            </svg>
                        </div>
                        <div className="w-full sm:w-4/5 lg:w-1/2 lg:border-l-2 lg:pl-5">
                            <h1 className="text-3xl font-semibold text-gray-800 text-center">Login</h1>
                            <form action={handleLoginForm}>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={loginFormData.email}
                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginFormData,
                                            email: e.target.value
                                        })
                                    }}
                                    className="h-12 bg-transparent"
                                    placeholder="Email"
                                />
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    value={loginFormData.password}
                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginFormData,
                                            password: e.target.value
                                        })
                                    }}
                                    className="h-12 bg-transparent"
                                    placeholder="Password"
                                />
                                <div className="text-end my-2">
                                    <Link className="text-blue-500 hover:underline" href={"/"}>Forgot Password</Link>
                                </div>
                                <hr className="my-4" />
                                <Button type="submit" className="w-full bg-[#8B8DF6] hover:bg-[#8B8DF6] text-black font-bold rounded-full" disabled={!loginFormData.email || loginFormData.password < 6}>Login</Button>
                            </form>
                            <Link href={"/register"}><Button variant="outline" className="w-full rounded-full bg-transparent font-bold mt-2">Create a new account ?</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;