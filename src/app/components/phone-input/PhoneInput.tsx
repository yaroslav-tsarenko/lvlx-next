"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PhoneInput.module.scss";
import Image from "next/image";
import {useTranslation} from "react-i18next";

interface Country {
    name: string;
    flag: string;
    code: string;
}

interface RestCountry {
    name: { common: string };
    flags: { svg: string };
    idd: { root?: string; suffixes?: string[] };
}

interface PhoneInputProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    touched?: boolean;
    placeholder?: string;
}

const PhoneInput = ({ id, name, value, onChange, onBlur, error, touched}: PhoneInputProps) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useTranslation();

    const [selectedCountry, setSelectedCountry] = useState<Country>({
        name: "Poland",
        flag: "https://flagcdn.com/w320/pl.png",
        code: "+48",
    });
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const fetchCountries = async () => {
        try {
            const response = await axios.get<RestCountry[]>("https://restcountries.com/v3.1/all");
            const mapped = response.data
                .map((country) => ({
                    name: country.name.common,
                    flag: country.flags.svg,
                    code: country.idd.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}` : "",
                }))
                .filter((c: Country) => c.code);
            setCountries(mapped);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    const selectCountry = (country: Country) => {
        setSelectedCountry(country);
        setDropdownOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
        const fakeEvent = {
            ...e,
            target: {
                ...e.target,
                name: name,
                value: `${selectedCountry.code}${onlyDigits}`,
            },
        };
        onChange(fakeEvent as React.ChangeEvent<HTMLInputElement>);
    };

    const getOnlyPhonePart = (full: string) => {
        if (full.startsWith(selectedCountry.code)) {
            return full.slice(selectedCountry.code.length);
        }
        return full;
    };

    return (
        <div className={styles.phoneOuter}>
            <div className={`${styles.phoneWrapper} ${error && touched ? styles.errorBorder : ""}`}>
                <button type="button" onClick={toggleDropdown}>
                    <Image src={selectedCountry.flag} alt="Flag" width={22} height={22} className={styles.countryFlag} />
                    {selectedCountry.code}
                </button>
                <hr />
                <input
                    id={id}
                    name={name}
                    type="text"
                    placeholder={t("formNumber")}
                    value={getOnlyPhonePart(value)}
                    onChange={handleInputChange}
                    onBlur={onBlur}
                />
            </div>
            {isDropdownOpen && (
                <div className={styles.dropdown}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search country..."
                        className={styles.searchBar}
                    />
                    <ul className={styles.countryList}>
                        {filteredCountries.map((country) => (
                            <li
                                key={country.name}
                                onClick={() => selectCountry(country)}
                                className={styles.countryItem}
                            >
                                <span>
                                    <Image src={country.flag} alt="Flag" width={20} height={15} className={styles.countryFlag} />
                                    {country.name}
                                </span>
                                <span>{country.code}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {error && touched && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default PhoneInput;