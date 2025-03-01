import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const ContactInfo = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [dateterms, setToday] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("لطفا شرایط و ضوابط را بپذیرید.");
      return;
    }
    // Handle form submission and proceed to video recording
    navigate("/video-recording");
  };

  return (
    <div className="contact-info">
      <h2>ورود اطلاعات تماس</h2>
      <p>لطفا اطلاعات تماس خود را وارد کنید</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="phone"
            value={phone}
            placeholder="موبایل"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
          <div className="terms-text">
            <h3>شرایط و ضوابط</h3>
            <h4>آخرین به‌روزرسانی:  ۱ مارچ ۲۰۲۵</h4>
            <ol>
            <li>
            سرزمین یک بستر دیجیتال برای ثبت و مدیریت درخواست‌های کنسولی است. پردازش این درخواست‌ها توسط دفتر خدمات مهاجرتی هلیکا انجام می‌شود.
            </li>
            <li>
            سرزمین خدمات حقوقی و کنسولی را راسا ارائه نمی‌دهد و مسئول تصمیم‌گیری در مورد نتایج درخواست‌ها نیست.
            </li>
            <li>
            کاربران متعهد می‌شوند که اطلاعات صحیح و کامل ارائه دهند. در صورت ارسال اطلاعات نادرست، مسئولیت عواقب آن بر عهده کاربر خواهد بود.
            </li>
            <li>
            اطلاعات شخصی کاربران فقط برای پردازش درخواست‌ها استفاده شده و مطابق قوانین حریم خصوصی کانادا (PIPEDA) محافظت می‌شود.
            </li>
            <li>
            اطلاعات کاربران در سرورهای امن و با رمزگذاری مناسب ذخیره می‌شود و به هیچ‌وجه برای تبلیغات یا اهداف تجاری فروخته نخواهد شد.
            </li>
            <li>
            کاربران می‌توانند در هر زمان درخواست حذف یا اصلاح اطلاعات شخصی خود را به ایمیل privacy@sarzamin.ca ارسال کنند.
            </li>
            <li>
            سرزمین هیچ تضمینی در مورد موفقیت درخواست‌های کنسولی و مهاجرتی ارائه نمی‌دهد و مسئول تأخیرها یا رد درخواست‌ها توسط مراجع رسمی نخواهد بود.
            </li>
            <li>
            سرزمین ممکن است این شرایط را در هر زمان تغییر دهد. ادامه استفاده از خدمات پس از تغییرات، به معنای پذیرش شرایط جدید است.
            </li>
            </ol>
          <input
            type="text"
            placeholder="نام و نام خانوادگی "
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="تاریخ امروز "
            value={dateterms}
            onChange={(e) => setToday(e.target.value)}
            required
          />
            <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label htmlFor="terms">
             شرایط و ضوابط را خوانده و قبول دارم.
          </label>
          </div>
          <div className="terms">

        </div>
        <button type="submit">ادامه و ارسال مدارک</button>
      </form>
    </div>
  );
};

export default ContactInfo;