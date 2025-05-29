import React, { FC } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./FaqItem.module.scss";

interface FaqItemProps {
    question: string;
    answer: string;
    expanded: boolean;
    onChange: () => void;
}

const FaqItem: FC<FaqItemProps> = ({ question, answer, expanded, onChange }) => {
    return (
        <div
            className={`${styles.accordion} ${expanded ? styles.expanded : ""}`}
            onClick={onChange}>
            <div className={styles.summary}>
                <FaChevronDown
                    className={`${styles.icon} ${expanded ? styles.iconExpanded : ""}`}
                />
                <h3 className={`${styles.question} ${expanded ? styles.questionExpanded : ""}`}>
                    {question}
                </h3>
            </div>
            <div className={`${styles.details} ${expanded ? styles.detailsExpanded : ""}`}>
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default FaqItem;