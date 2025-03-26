import { verifyUserToken } from "@/action";
import CustomerReviewPage from "@/components/admin/CustomerReviewPage";
import { redirect } from "next/navigation";

async function CustomerReview() {

    const { user, success, error } = await verifyUserToken();
    
      if (!user) {
        redirect('/login')
      }

    return ( 
        <>
          <CustomerReviewPage />
        </>
     );
}

export default CustomerReview;