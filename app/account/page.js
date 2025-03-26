import { fetchProfile, SingleUser, verifyUserToken } from "@/action";
import Account from "@/components/includes/Account";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Account - Create & Manage Your Profile | Trendy",
  description: "Create a new Trendy account, set up your profile, update personal details, save addresses, and manage payment options securely.",
  keywords: "create account, sign up, new user, register, update profile, personal details, address, payment settings, manage account",
  // openGraph: {
  //     title: "My Account - Create & Manage Your Profile | Trendy",
  //     description: "Sign up for a Trendy account, set up your profile, and securely update your personal details, address, and payment information.",
  //     url: "https://yourwebsite.com/account",
  //     type: "profile",
  //     images: [
  //         {
  //             url: "https://yourwebsite.com/account-setup-og.jpg",
  //             width: 1200,
  //             height: 630,
  //             alt: "Create & Manage Your Profile - Trendy",
  //         },
  //     ],
  // },
  // twitter: {
  //     card: "summary_large_image",
  //     title: "My Account - Create & Manage Your Profile | Trendy",
  //     description: "Sign up and set up your Trendy account to securely manage personal details, addresses, and payment options.",
  //     images: ["https://yourwebsite.com/account-setup-twitter.jpg"],
  // },
};


async function AccountPage() {

  const { user, success, error } = await verifyUserToken();

  if (!user) {
    redirect('/login')
  }

  const [getProfile, getUser] = await Promise.all([
    fetchProfile(user?.id),
    SingleUser(user?.id)
  ]);


  return (
    <>
      <Account getProfile={getProfile?.data} getUser={getUser?.data} />
    </>
  );
}

export default AccountPage;