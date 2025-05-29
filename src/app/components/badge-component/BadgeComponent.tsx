import React, { FC } from 'react';
import { Avatar, Badge } from '@mui/material';
import styles from './BadgeComponent.module.scss';

interface BadgeComponentProps {
    AvatarInitial: string;
    BadgeContent: string | number;
    Title: string;
}

const BadgeComponent: FC<BadgeComponentProps> = ({ AvatarInitial, BadgeContent, Title }) => {
    return (
        <div className={styles.wrapper}>
            <Badge
                badgeContent={BadgeContent}
                sx={{
                    '& .MuiBadge-badge': {
                        backgroundColor: '#f84204',
                        color: 'white',
                        width: '35px',
                        height: '35px',
                        fontSize: '19px',
                        display: 'flex',
                        borderRadius: '50%',
                    },
                }}>
                <Avatar sx={{ background: 'black', width: "80px", height: "80px", fontSize: "40px" }}>{AvatarInitial}</Avatar>
            </Badge>
            <p>{Title}</p>
        </div>
    );
};

export default BadgeComponent;