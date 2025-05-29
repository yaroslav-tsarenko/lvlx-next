import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    EN: {
        translation: {
            monetize: "Monetize your traffic",
            direct: "With direct advertiser of iGaming products",
            formTitle: "Join",
            formCompanyName: "Company name",
            formNumber: "Phone Number",
            formPassword: "Password",
            formRepeatPassword: "Repeat Password",
            formAgree: "I agree",
            formTerms: "terms and conditions",
            ourManager: "Thank you! Our manager will contact you soon.",
            great: "Great!",
        },
    },
    RU: {
        translation: {
            monetize: "Монетизируй свой трафик",
            direct: "С прямым рекламодателем iGaming продуктов",
            formTitle: "Присоединяйся",
            formCompanyName: "Название компании",
            formNumber: "Номер телефона",
            formPassword: "Пароль",
            formRepeatPassword: "Повторите пароль",
            formAgree: "Я принимаю",
            formTerms: "правила и условия",
            ourManager: "Спасибо! Наш менеджер свяжется с вами в ближайшее время.",
            great: "Отлично!",
        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'RU',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;