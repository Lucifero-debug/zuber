'use client'
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from '../../components/Home/CheckoutForm'

const Payment = () => {
    const searchParams=useSearchParams();
    const amount=searchParams.get('amount')
    const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    const options={
        mode:'payment',
        amount:Math.round(amount*100+50),
        currency:"usd"
}
  return (
    <Elements stripe={stripePromise} options={options}>
<CheckoutForm amount={amount}/>
    </Elements>
  )
}

export default Payment