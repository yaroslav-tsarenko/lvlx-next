import React, {FC} from 'react';
import Image from "next/image";
import bigPlus from "@/assets/icons/big-plus.svg"
import styles from "./BigText.module.scss"

interface BigTextProps {
    title?: string;
    description?: string;
}

const BigText:FC<BigTextProps> = ({title, description}) => {
    return (
        <div className={styles.wrapper}>
            <h1>{title}</h1>
            {description === "inhouse games" || description === "инхаус игр" ? null :
                <Image src={bigPlus} width={100} height={100} alt="Plus Icon" loading="lazy" />}
            <p>{description}</p>
        </div>
    );
};

export default BigText;