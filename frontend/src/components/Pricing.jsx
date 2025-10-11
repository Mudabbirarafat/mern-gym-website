import { Check } from "lucide-react";

const Pricing = () => {
  const pricingPlans = [
    {
      imgUrl: "/pricing.jpg",
      title: "QUARTERLY",
      price: 18000,
      duration: 3,
    },
    {
      imgUrl: "/pricing.jpg",
      title: "HALF_YEARLY",
      price: 34000,
      duration: 6,
    },
    {
      imgUrl: "/pricing.jpg",
      title: "YEARLY",
      price: 67000,
      duration: 12,
    },
  ];

  const handlePayment = (amount, planName) => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // 🔁 Replace with your Razorpay key
      amount: amount * 100, // Amount in paise (Rs * 100)
      currency: "INR",
      name: "Elite Edge Fitness",
      description: `${planName} Membership Plan`,
      image: "/logo.png", // Optional logo
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Your Name",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section className="pricing" id="pricing">
      <h1>ELITE EDGE FITNESS PLANS</h1>
      <div className="wrapper">
        {pricingPlans.map((plan, index) => (
          <div className="card" key={index}>
            <img src={plan.imgUrl} alt={`${plan.title} plan`} />

            <div className="title">
              <h1>{plan.title}</h1>
              <h1>PACKAGE</h1>
              <h3>Rs {plan.price}</h3>
              <p>
                For {plan.duration} {plan.duration > 1 ? "Months" : "Month"}
              </p>
            </div>

            <div className="description">
              <p><Check /> Modern Equipment</p>
              <p><Check /> All-Day Free Training</p>
              <p><Check /> Free Restroom Access</p>
              <p><Check /> 24/7 Expert Support</p>
              <p><Check /> 20-Day Freezing Option</p>

              <button
                className="join-button"
                onClick={() => handlePayment(plan.price, plan.title)}
              >
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
