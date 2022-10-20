// import {loadStripe} from '@stripe/stripe-js';
// import {Elements, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe("pk_test_51LuYySENh83eEOMxsOJElcbfIQSL6sfTCqkS0u3eXZQSTsqqI7TO6PWtaycR7ns9oGeBx6KcoVsNFY5Ph1yyqv8n008cyVOB8u");

// const CheckoutForm = () => {
  
//     const stripe = useStripe();
//     const elements = useElements();
  
//     const handleSubmit = async (event) => {
//       // We don't want to let default form submission happen here,
//       // which would refresh the page.
//       event.preventDefault();
  
//       if (!stripe || !elements) {
//         // Stripe.js has not yet loaded.
//         // Make sure to disable form submission until Stripe.js has loaded.
//         return;
//       }
  
//       const result = await stripe.confirmPayment({
//         //`Elements` instance that was used to create the Payment Element
//         elements,
//         confirmParams: {
//           return_url: "https://example.com/order/123/complete",
//         },
//       });
  
//       if (result.error) {
//         // Show error to your customer (for example, payment details incomplete)
//         console.log(result.error.message);
//       } else {
//         // Your customer will be redirected to your `return_url`. For some payment
//         // methods like iDEAL, your customer will be redirected to an intermediate
//         // site first to authorize the payment, then redirected to the `return_url`.
//       }
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <PaymentElement />
//         <button disabled={!stripe}>Submit</button>
//       </form>
//     )
//   };

// function Stripe() {
//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret: 'sk_test_51LuYySENh83eEOMx5enUoWjSPYj9f3QjUrgRJofmW1Tb7PJ1wwCHXmpis6OIY9afaEkGeLvQ2zQj4pBu3XaJhkk700vcWkxuuv',
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// export default Stripe;