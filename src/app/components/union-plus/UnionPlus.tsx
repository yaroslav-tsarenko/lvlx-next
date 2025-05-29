import React, {FC} from 'react';
import styles from "./UnionPlus.module.scss";
import Image from 'next/image';
import plus from "@/assets/icons/union-plus.svg"

interface UnionPlusProps {
    title: string;
}

const UnionPlus:FC<UnionPlusProps> = ({title}) => {
    return (
        <div className={styles.wrapper}>
            <p>{title}</p>
            <Image
                loading="lazy"
                src={plus}
                alt="Union Plus"
                width={20}
                height={20}/>
        </div>
    );
};

export default UnionPlus;