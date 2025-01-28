import React, { useState } from "react";
import contactImg from "../assets/images/contact.jpg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.comment.trim()
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    setSuccess("Message sent successfully!");
    setFormData({
      name: "",
      company: "",
      email: "",
      comment: "",
    });

    try {
      // const response = await fetch("YOUR_API_ENDPOINT", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      // if (response.ok) {
      //   setSuccess("Message sent successfully!");
      //   // Clear form data on successful submission
      //   setFormData({
      //     name: "",
      //     company: "",
      //     email: "",
      //     comment: "",
      //   });
      // } else {
      //   toast.error("Failed to send message");
      // }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[200px] pb-[120px]">
      <div className="container mx-auto md:px-[0px] px-[12px]">
        <div className="flex">
          <div className="col">
            <h1 className="font-semibold text-xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#bcffa4] via-[#f59571] to-[#f59571]">
              Contact Us
            </h1>
            <div className="flex">
              <h2 className="text-white xl:text-[100px] md:text-[80px] text-[65px] font-extrabold">
                Let's Talk{" "}
              </h2>
              <img
                src={contactImg}
                alt=""
                className="rounded-full w-[14rem] h-28 ms-4 mt-3"
              />
            </div>
            <h2 className="text-white xl:text-[100px] md:text-[80px] text-[65px] font-extrabold">
              About Your Project
            </h2>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 md:px-[0px] px-[12px]">
        <div className="flex flex-wrap">
          <div className="md:w-1/2 w-full">
            <h3 className="text-gray-100 text-[20px]">
              Email Me:
              <p className="text-[30px] font-bold">hello@wisumepro.com</p>
            </h3>
          </div>
          <div className="md:w-1/2 w-full">
            <p className="text-gray-100 text-[20px] w-96">
              Interested in working with us? Submit your work inquiry using the
              form below.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="container mx-auto mt-12 md:px-[0px] px-[12px]"
      >
        <div className="flex flex-wrap">
          <div className="w-full md:px-[12px] mb-5">
            <h3 className="text-2xl text-white font-bold">Request A Quote</h3>
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full md:px-[12px] mb-4">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="w-full md:px-[12px] mb-4">
              <p className="text-green-500">{success}</p>
            </div>
          )}

          <div className="md:w-1/2 w-full md:px-[12px] mb-8">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="text-white w-full bg-transparent border border-gray-100 rounded-2xl p-[28px] text-xl"
              required
            />
          </div>
          <div className="md:w-1/2 w-full md:px-[12px] mb-8">
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              className="text-white w-full bg-transparent border border-gray-100 rounded-2xl p-[28px] text-xl"
            />
          </div>
          <div className="w-full md:px-[12px] mb-8">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="text-white w-full bg-transparent border border-gray-100 rounded-2xl p-[28px] text-xl"
              required
            />
          </div>
          <div className="w-full md:px-[12px] mb-8">
            <textarea
              name="comment"
              id="comment"
              rows="4"
              cols="100"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Your Comment"
              className="text-white w-full bg-transparent border border-gray-100 rounded-2xl p-[28px] text-xl"
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer bg-slate-50 py-6 px-14 rounded-full text-xl
            ${loading ? "opacity-50" : "hover:bg-slate-200"}`}
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
