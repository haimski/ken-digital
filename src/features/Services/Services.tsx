import { useLanguage } from "../../i18n/LanguagesContext";
import React, { useState } from "react";
import Modal from "../../components/Modal";

interface ServicesProps {
    onContact?: () => void;
}

const Services: React.FC<ServicesProps> = ({ onContact }) => {
    const { t, lang } = useLanguage();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleOpen = (index: number) => setSelectedIndex(index);
    const handleClose = () => setSelectedIndex(null);

    // Handler for the modal action button
    const handleContact = () => {
        handleClose();
        if (onContact) onContact();
    };

    return (
        <div className="flex flex-col items-center justify-start bg-white text-[#324681]">
            <ul className="list-none p-0 m-0 w-full max-w-md text-lg">
            {t.services.list.map((service: { text: string; description: string }, index: number) => (
                <li
                key={index}
                className="mb-2 cursor-pointer hover:underline px-4 py-2 rounded transition-colors"
                onClick={() => handleOpen(index)}
                tabIndex={0}
                role="button"
                aria-label={service.text}
                >
                {service.text}
                </li>
            ))}
            </ul>
            {/* Modal */}
            <Modal
                isOpen={selectedIndex !== null}
                onClose={handleClose}
                closeLabel={t.close}
                lang={lang}
                action={onContact ? {
                    label: t.contact.title,
                    onClick: handleContact,
                } : undefined}
            >
                {selectedIndex !== null && (
                <>
                    <h2 className="text-xl font-semibold mb-2">{t.services.list[selectedIndex].text}</h2>
                    <p>{t.services.list[selectedIndex].description}</p>
                </>
                )}
            </Modal>
        </div>
    );
};

export default Services;