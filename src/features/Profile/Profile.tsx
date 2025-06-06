import { useLanguage } from "../../i18n/LanguagesContext";

const Profile = () => {
    const { t, lang } = useLanguage();

    const isHebrew = lang === "he";

    return (
        <div
            className={`flex flex-col items-start justify-start bg-white text-[#324681] ${
                isHebrew ? "items-end text-right" : "items-start text-left"
            }`}
        >
            <p className="text-lg mb-2">{t.profile.description}</p>
        </div>
    );
}

export default Profile;
