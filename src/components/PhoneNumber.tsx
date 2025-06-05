import { useState, useEffect } from "react";

interface PhoneNumberProps {
    phoneNumber: string;
    showText?: string;
    label: string; // Add label prop
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ phoneNumber, showText = "Show phone number", label }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent));
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div>
                <span className="mr-2">{label}</span>
                <a
                    href={`tel:${phoneNumber.replace(/-/g, "")}`}
                    className="text-[#324681] underline"
                >
                    {phoneNumber}
                </a>
            </div>
        );
    }

    return (
        <div>
            <span className="mr-2">{label}</span>
            {showPhone ? (
                <span className="text-blue-600">{phoneNumber}</span>
            ) : (
                <button
                    type="button"
                    className="text-blue-600 underline"
                    onClick={() => setShowPhone(true)}
                >
                    {showText}
                </button>
            )}
        </div>
    );
};

export default PhoneNumber;