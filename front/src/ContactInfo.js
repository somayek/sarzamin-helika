import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactInfo = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and proceed to payment via Stripe
    navigate("/payment");
  };

  return (
    <div>
      <h2>ورود اطلاعات تماس</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ایمیل:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>شماره تلفن:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">ادامه به پرداخت</button>
      </form>
    </div>
  );
};

export default ContactInfo;