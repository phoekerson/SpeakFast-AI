import getDbConnection from "@/lib/db";
import BgGradient from "@/components/common/bg-gradient";
import { hasCandelledSubscription } from "@/lib/user-helpers";
import { currentUser } from "@clerk/nextjs/server";
import { updateUser } from "@/lib/user-helpers";
import { getPlanType} from "@/lib/user-helpers";
import { doesUserExist } from "@/lib/user-helpers";
import { Badge} from "@/components/ui/badge";
import UpgradeYourPlan from "@/components/upload/upgrade-your-plan";
import UploadForm from "@/components/upload/upload-form";


export default async function Dashboard() {
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0].emailAddress ?? "";

    const sql = await getDbConnection();

    // Update the user id
    let userId = null;
    let planType = "starter";
    let priceId = null;

    const hasUserCancelled = await hasCandelledSubscription(sql, email);
    const user = await doesUserExist(sql, email);

    if(user){
        userId = clerkUser?.id;
        if (userId) {
        await updateUser(sql, userId, email)
        }
    
    const priceId = user[0].price_id;
    }
    const { id: planTypeId = "starter", name: planTypeName } =
    getPlanType(priceId);
    


const isBasicPlan = planType === "basic";
const isProPlan = planType === "pro";

return (
    <BgGradient>
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
            <Badge className="bg-gradient-to-r from-purple-700 to-pink-800 text-white px-4 py-1 text-lg font-semibold capitalize">
                {planTypeName} Plan 
            </Badge>
            <h2 className="capitalize text-3xl font-bold tracking-tight text-gray-900-sm:text-4xl">
            Start creating amazing content </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center"> 
            Upload your audio or video file and let our AI do the magic!
             </p>

             <p className=" mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center sm:text-4xl">
             You get {" "} <span className="font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
             {isBasicPlan ? "3" : "Unlimited" } Blog posts</span> {" "} as part of the {" "} <span className="font-bold capitalize">{planTypeName}</span>
             Plan
             </p>

             {hasUserCancelled ?<UpgradeYourPlan />:
              <BgGradient>
              <UploadForm />
              </BgGradient>
              }
            </div>
        </div>



    </BgGradient>

);
}
