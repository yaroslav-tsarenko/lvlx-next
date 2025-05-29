"use client";

import {useFormik} from "formik";
import * as Yup from "yup";
import styles from "./Form.module.scss";
import Image from "next/image";
import {Checkbox, Button, IconButton} from "@mui/material";
import tgIcon from "@/assets/icons/telegram-icon.svg";
import axios from "axios";
import PhoneInput from "@/app/components/phone-input/PhoneInput";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";

const Form = () => {

    const [showRepeatPassword, setShowRepeatPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            companyName: "",
            email: "",
            phone: "",
            telegram: "",
            password: "",
            repeatPassword: "",
            terms: false,
        },
        validationSchema: Yup.object({
            companyName: Yup.string().required("Обязательное поле"),
            email: Yup.string().email("Неверный email").required("Обязательное поле"),
            phone: Yup.string().required("Обязательное поле"),
            telegram: Yup.string().required("Обязательное поле"),
            password: Yup.string().required("Обязательное поле"),
            repeatPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Пароли не совпадают")
                .required("Обязательное поле"),
            terms: Yup.boolean().oneOf([true], "Вы должны согласиться с условиями"),
        }),
        onSubmit: async (values, {resetForm}) => {
            const payload = {
                partner_user: {
                    company_name: values.companyName,
                    email: values.email,
                    phone: values.phone,
                    telegram: values.telegram,
                    password: values.password,
                    password_confirmation: values.repeatPassword,
                    terms_accepted: values.terms,
                },
            };

            try {
                setLoading(true);
                const response = await axios.post(
                    "https://getcb.pw/api/affiliate/register",
                    payload,
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log("Success:", response.data);
                resetForm();
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                alert("Ошибка при отправке формы");
                setLoading(false);
            }
        },
    });

    return (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <h1>Присоединяйся</h1>

            <div className={styles.formGroup}>
                <input
                    id="companyName"
                    type="text"
                    className={styles.inputField}
                    placeholder="Название компании"
                    {...formik.getFieldProps("companyName")}
                />
                {formik.touched.companyName && formik.errors.companyName && (
                    <p className={styles.error}>{formik.errors.companyName}</p>
                )}
            </div>

            <div className={styles.formGroup}>
                <input
                    id="email"
                    type="email"
                    className={styles.inputField}
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                    <p className={styles.error}>{formik.errors.email}</p>
                )}
            </div>

            <div className={styles.formGroup}>
                <PhoneInput
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.phone}
                    touched={formik.touched.phone}
                    placeholder="Номер телефона"
                />
            </div>

            <div className={styles.formGroup}>
                <div className={styles.customInput}>
                    <Image src={tgIcon} alt="Telegram Icon" width={22} height={22}/>
                    <hr className={styles.vLine}/>
                    <input
                        id="telegram"
                        type="text"
                        placeholder="@username"
                        {...formik.getFieldProps("telegram")}
                    />
                </div>
                {formik.touched.telegram && formik.errors.telegram && (
                    <p className={styles.error}>{formik.errors.telegram}</p>
                )}
            </div>

            <div className={styles.flexContainer}>
                <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Пароль"
                            {...formik.getFieldProps("password")}
                        />
                        <IconButton
                            sx={{position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)"}}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="toggle password visibility"
                        >
                            {showPassword ? <Visibility/> : <VisibilityOff/> }
                        </IconButton>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <p className={styles.error}>{formik.errors.password}</p>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                        <input
                            id="repeatPassword"
                            type={showRepeatPassword ? "text" : "password"}
                            placeholder="Еще раз"
                                {...formik.getFieldProps("repeatPassword")}
                            />
                            <IconButton
                                sx={{position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)"}}
                                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                aria-label="toggle repeat password visibility">
                                {showRepeatPassword ? <Visibility/> : <VisibilityOff/> }
                            </IconButton>
                        </div>
                        {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                            <p className={styles.error}>{formik.errors.repeatPassword}</p>
                        )}
                    </div>
                </div>

                <div className={styles.checkboxField}>
                <Checkbox
                    id="terms"
                    name="terms"
                    checked={formik.values.terms}
                    onChange={formik.handleChange}
                    sx={{
                        color: '#f84204',
                        '&.Mui-checked': {
                            color: '#f84204',
                        },
                    }}
                />
                <p>
                    Я принимаю
                    <a href="#"> правила и условия</a>
                </p>
            </div>

            {formik.touched.terms && formik.errors.terms && (
                <p className={styles.error}>{formik.errors.terms}</p>
            )}

            <Button
                type="submit"
                variant="contained"
                loading={loading}
                sx={{
                    padding: "18px 0",
                    borderRadius: "16px",
                    boxShadow: "none",
                    maxHeight: "60px",
                    textTransform: "none",
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: 400,
                    backgroundColor: "#f84204",
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#f95c04"
                    }
                }}
                fullWidth
            >
                Зарегистрироваться
            </Button>
        </form>
    );
};

export default Form;
