import { ArrowRight, CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";

export default function Pricing() {
  
    const plansMap = [
        {
            id:'basic',
            name: 'Basic',
            description:'Get started with SpeakEasy!',
            price:'10',
            items: [
                '3 Blog Posts','3 Transcription'
            ],
            paymentLink:'https://buy.stripe.com/test_7sIg208hL0t6dcA7st',
            priceId : process.env.NODE_env === 'development'?'price_1Q2J0OA16yCA8JrWLNpYdOEu':'',
        },

        {
            id:'pro',
            name: 'Pro',
            description:'Get started with SpeakEasy!',
            price:'19.99',
            items: [
                'Unlimited Blog Posts','Unlimited Transcription'
            ],
            paymentLink:'https://buy.stripe.com/test_fZeg20gOh0t65K84gi',
            priceId : process.env.NODE_ENV ==='development'?'price_1Q2J1bA16yCA8JrWS1ttavDU':'',
        },
    ];
    return (
        <section className="relative overflow-hidden" id="pricing">

                <div className="py-12 lg:py-24 max-w-5xl mx-auto px-12 lg:px-0">
                    <div className="flex items-center justify-center w-full pb-12">
                        <h2 className="font-bold text-xl uppercase mb-8 text-purple-600">
                                        Pricing
                                        
                        </h2>
                        
                    </div>
                    <div className="relative flex justify-center flex-col lg:flex-row 
                    items-center lg:items-stretch gap-8">
                      {plansMap.map(({name, price,description,items,id,paymentLink},idx) => <div className="relative w-full max-w-lg"
                      key={idx}>
                            <div className={cn(
                                "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded border-[1px] border-gray-500/20 rounded-2xl border-[1px] border-gray-500/20 rounded-2xl", id === "pro" && "border-violet-500 gap-5 border-2"
                            )}
                            >
                                <div className="flex justify-between items-center gap-4">
                                    <p className="text-lg lg:text-xl font-bold capitalize">
                                        {name}
                                    </p>
                                    <p className="text-base-content/80 mt-2">{description}</p>
                                </div>
                            <div className="flex gap-2">
                                <p className="text-5xl tracking-tight font-extrabold">${price}</p>
                            <div className="flex flex-col justify-end mb-[4px]">
                                <p className="text-xs text-base-content/60 uppercase font-semibold">
                                USD
                                </p>
                                <p className="text-xs text-base-content/60">
                                /month</p>
                            </div>
                            </div>
                            <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                                {items.map((item,idx) => (
                                    <li className="flex items-center gap-2" key={idx}>
                                        <CheckIcon size={18}> 

                                        </CheckIcon>
                                            <span>{item}</span>
                                        
                                    </li>
                                ))}
                            </ul>

                            <div className="space-y-2">
                                    <Button variant={"link"}
                                    className={cn("border-2 rounded-full flex gap-2 bg-black text-gray-100",
                                        id === 'pro' && 'border-amber-300'
                                    )}
                                    >
                                        <Link href={paymentLink}
                                        className="flex gap-1 items-center">
                                            Get SpeakEasy 
                                            <ArrowRight size={18}/>

                                            
                                        </Link>
                                    </Button>
                                </div>
                                </div>
                                
                                

                        </div>)}
                    </div>
                </div>
                
        </section>
        
    );
}