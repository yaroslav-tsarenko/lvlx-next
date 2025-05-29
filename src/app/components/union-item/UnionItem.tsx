import React, {FC} from 'react';
import styles from "./UnionItem.module.scss"

interface UnionItemProps{
    title: string,
}

const UnionItem:FC<UnionItemProps> = ({title}) => {
    return (
        <div className={styles.wrapper}>
            {title}
        </div>
    );
};

export default UnionItem;