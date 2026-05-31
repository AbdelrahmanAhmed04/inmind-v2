import "./contact-section.css";
import ContactBg from "../../assets/contact-image.jpeg";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react"; // 1. Added Formspree hooks

function ContactSection() {
  const [formOpen, setFormOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // 2. Formspree API hook integration using your ID 'xvzynbbd'
  const [state, handleSubmit] = useForm("xvzynbbd");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // 3. Automatically triggers your 1.5s close transition when a submission succeeds
  useEffect(() => {
    if (state.succeeded) {
      // Reset the local text input values
      setFormData({ name: "", email: "", subject: "", message: "" });
      handleFormClose();
    }
  }, [state.succeeded]);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setFormOpen(false);
      setIsClosing(false);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div
        className="contact-section-container section-container section"
        id="contact"
      >
        <div className="contact-content section-content">
          <h3 className="contact-title section-title">
            contact@domainname.com
          </h3>
          <div className="horizontal-break"></div>
          <p className="contact-text section-text">
            652 Central Ave. <br /> Glendale, California, 91020
          </p>
          <button className="contact-btn" onClick={handleFormOpen}>
            <div className="arrow-wrapper">
              <p className="btn-text">
                use this form
                <br />
              </p>
            </div>
          </button>
          <div className="social-icons-wrapper">
            <a href="#facebook" className="social-icon">
              <FaFacebook />
            </a>
            <a href="#instagram" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#tiktok" className="social-icon">
              <FaTiktok />
            </a>
            <a href="#email" className="social-icon">
              <MdEmail />
            </a>
          </div>
        </div>
        <img className="contact-image section-image" src={ContactBg} alt="" />

        <div id="contact-section-tag">
          contact <div className="vertical-tag-break"></div>
        </div>
      </div>

      {formOpen && (
        <div className={`contact-form-overlay ${isClosing ? "closing" : ""}`}>
          <div className="contact-form-container">
            <button className="close-btn" onClick={handleFormClose}>
              ✕
            </button>
            <div className="form-content">
              <h2 className="form-title">Get in touch</h2>
              <p
                className={`form-subtitle ${state.succeeded ? "success-msg" : ""}`}
              >
                {state.succeeded
                  ? "✓ Your message was sent successfully!"
                  : "Promise, we won't stay silent"}
              </p>
              {/* 4. Swapped console log submission for Formspree endpoint handler */}
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />

                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                  <ValidationError
                    prefix="Subject"
                    field="subject"
                    errors={state.errors}
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />

                {/* 5. Disable button during processing to prevent network spamming */}
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={state.submitting || state.succeeded}
                >
                  {state.submitting
                    ? "Sending..."
                    : state.succeeded
                      ? "Sent ✓"
                      : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactSection;
