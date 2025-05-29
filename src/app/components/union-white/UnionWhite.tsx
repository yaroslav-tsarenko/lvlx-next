import React, {FC} from 'react';
import styles from "./UnionWhite.module.scss";

interface UnionsWhiteProps {
    title: string;
}

const UnionWhite: FC<UnionsWhiteProps> = ({title}) => {
    return (
        <div className={styles.wrapper}>
            <h4>
                {title}
            </h4>
        </div>
    );
};

export default UnionWhite;