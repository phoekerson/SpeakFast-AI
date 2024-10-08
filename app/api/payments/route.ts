import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { handleCheckoutSessionCompleted } from "@/lib/payment-helpers";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest){

    //webhook functionality
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature');
    let event;
    try{
        event = stripe.webhooks.constructEvent
        (payload, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    
    //Handle the event
    switch (event.type){
        
            // ...handle other event types
            case 'checkout.session.completed':{
                const session = await stripe.checkout.sessions.retrieve(
                    event.data.object.id,
                    {
                        expand: ['line_items'],
                    }
                )
                console.log({ session });

                //connect to the db create or update user 
                await handleCheckoutSessionCompleted({ session, stripe});
                break;
            }
            case 'customer.subscription.deleted' : {
                //connect to db
                const subscriptionId = event.data.object.id;
                const subscription = await stripe.subscriptions.retrieve(
                    subscriptionId
                );
                console.log({ subscription });

                //connect to db
                // update users status to cancelled /
                // Revoke access


                break;
            }

            default: 
            console.log(`Unhandled event type ${event.type}`);
        }
    }
     catch (err) {
            return NextResponse.json({
                status: "Failed", err
            })
        
    return NextResponse.json({
        status: "success",
    });
}
}