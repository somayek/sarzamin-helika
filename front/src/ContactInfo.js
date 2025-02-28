import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

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
    <div className="input-row">
      <h2>ورود اطلاعات تماس</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            value={phone}
            placeholder="موبایل"
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