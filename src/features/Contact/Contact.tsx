import { useState } from "react";
import axios from "axios";
import { useLanguage } from "../../i18n/LanguagesContext";
import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextAreaField";
import Modal from "../../components/Modal";
// import PhoneNumber from "../../components/PhoneNumber";

const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex =
    /^(?:\+972|972|0)([23489]|5[0123456789])\d{7}$/; // Israeli or international

type ModalState = {
    open: boolean;
    type: "success" | "error" | null;
    message: string;
};

const Contact = () => {
    const { t, lang } = useLanguage();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        details: "",
    });

    const [modal, setModal] = useState<ModalState>({
        open: false,
        type: null,
        message: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.name) newErrors.name = t.contact.required;
        if (!form.email) newErrors.email = t.contact.required;
        else if (!emailRegex.test(form.email))
            newErrors.email = t.contact.invalidEmail;
        if (!form.phone) newErrors.phone = t.contact.required;
        else if (!phoneRegex.test(form.phone.replace(/[\s-]/g, "")))
            newErrors.phone = t.contact.invalidPhone;
        if (!form.company) newErrors.company = t.contact.required;
        if (!form.role) newErrors.role = t.contact.required;
        if (!form.details) newErrors.details = t.contact.required;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const sendFormData = async (data: any) => {
        try {
            await axios.post('https://formspree.io/f/xpwrzere', data);
            setModal({
                open: true,
                type: "success",
                message: "Thank you for your message. I will be in touch soon.",
            });
        } catch (error: any) {
            setModal({
                open: true,
                type: "error",
                message:
                    error?.response?.data?.error ||
                    error?.message ||
                    "An error occurred. Please try again.",
            });
        }
    };

    // Clear form after success modal is closed
    const handleModalClose = () => {
        if (modal.type === "success") {
            setForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                role: "",
                details: "",
            });
        }
        setModal({ ...modal, open: false });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            sendFormData(form);
        }
    };

    // Determine label alignment based on language direction
    const isRtl = lang === "he";
    const labelAlignClass = isRtl ? "text-right" : "text-left";
    const formDir = isRtl ? "rtl" : "ltr";

    return (
        <div className="flex flex-col items-start justify-start bg-white text-[#324681]">
            <p className="text-lg mb-2">{t.contact.description}</p>
            {/* <div className="mb-4">
                <PhoneNumber
                    phoneNumber={lang === 'en' ? '+972-54-123-4567' : '972-54-123-4567+' }
                    showText={t.contact.showPhone}
                    label={t.contact.phoneLabel}
                />
            </div> */}
            <form
                className="w-[60%] max-w-md mx-auto"
                style={{ direction: formDir }}
                onSubmit={handleSubmit}
                noValidate
            >
                {/* ... form fields ... */}
                <div className="mb-4">
                    <InputField
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border"
                        placeholder={t.contact.namePlaceholder}
                        value={form.name}
                        onChange={handleChange}
                        label={t.contact.name}
                        labelAlign={labelAlignClass}
                    />
                    {errors.name && <p className={`text-red-500 text-xs ${labelAlignClass}`}>{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <InputField
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border"
                        placeholder={t.contact.emailPlaceholder}
                        value={form.email}
                        onChange={handleChange}
                        label={t.contact.email}
                        labelAlign={labelAlignClass}
                    />
                    {errors.email && <p className={`text-red-500 text-xs ${labelAlignClass}`}>{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <InputField
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-3 py-2 border"
                        placeholder={t.contact.phonePlaceholder}
                        value={form.phone}
                        onChange={handleChange}
                        label={t.contact.phone}
                        labelAlign={labelAlignClass}
                    />
                    {errors.phone && <p className={`text-red-500 text-xs ${labelAlignClass}`}>{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <InputField
                        type="text"
                        id="company"
                        name="company"
                        className="w-full px-3 py-2 border"
                        placeholder={t.contact.companyPlaceholder}
                        value={form.company}
                        onChange={handleChange}
                        label={t.contact.company}
                        labelAlign={labelAlignClass}
                    />
                    {errors.company && <p className={`text-red-500 text-xs ${labelAlignClass}`}>{errors.company}</p>}
                </div>
                <div className="mb-4">
                    <InputField
                        type="text"
                        id="role"
                        name="role"
                        className="w"
                        placeholder={t.contact.rolePlaceholder}                        
                        value={form.role}
                        onChange={handleChange}
                        label={t.contact.role}
                        labelAlign={labelAlignClass}
                    />
                    {errors.role && <p className={`text-red-500 text-xs ${labelAlignClass}`}>{errors.role}</p>}
                </div>
                <div className="mb-4">
                    <TextAreaField
                        label={t.contact.details}
                        id="details"
                        name="details"
                        className="w-full px-3 py-2 border"
                        placeholder={t.contact.detailsPlaceholder}
                        value={form.details}
                        onChange={handleChange}
                        rows={4}
                        labelAlign={labelAlignClass}
                    />
                    {errors.details && <p className={`text-red-500 text-xs ${labelAlignClass}`}>{errors.details}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#d70d0e] text-white hover:bg-[#b80b0b] text-white px-4 transition-colors"
                    style={{ height: "25px", fontSize: "90%" }}
                >
                    {t.contact.submit}
                </button>
            </form>

            {/* Single Modal for Success/Error */}
            <Modal isOpen={modal.open} onClose={() => handleModalClose()}>
                <div className="p-4 text-center">
                    <p>{modal.message}</p>
                </div>
            </Modal>
        </div>
    );
};

export default Contact;