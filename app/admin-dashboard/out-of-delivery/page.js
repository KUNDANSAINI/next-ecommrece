import { verifyUserToken } from "@/action";
import OutOfDeliveryPage from "@/components/admin/out-of-delivery";
import { redirect } from "next/navigation";

async function OutOfDelivery() {
  const { user, success, error } = await verifyUserToken();

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <OutOfDeliveryPage />
    </>
  );
}

export default OutOfDelivery;