import { NextResponse } from 'next/server';
import Stripe from 'stripe'
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY!,{
    typescript:true,
    apiVersion:'2024-11-20.acacia'
})

export async function POST(request:any){
    const data:any=await request.json();
    const amount=data.amount;
    console.log("heelo",amount)
    try {
        const payment=await stripe.paymentIntents.create({
            amount:parseInt(amount)*100,
            currency:"USD"
        })
console.log("heelo",payment)
        return NextResponse.json(payment.client_secret,{status:200})
    } catch (error:any) {
        console.error('Error creating payment intent:', error.message);
        return new NextResponse(error,{
            status:400
        })
    }
}