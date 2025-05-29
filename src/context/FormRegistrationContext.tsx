"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Dialog } from "@mui/material";
import Form from "@/app/components/form/Form";

interface FormRegistrationContextProps {
    openDialog: () => void;
    closeDialog: () => void;
}

const FormRegistrationContext = createContext<FormRegistrationContextProps | undefined>(undefined);

export const FormRegistrationProvider = ({ children }: { children: ReactNode }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    return (
        <FormRegistrationContext.Provider value={{ openDialog, closeDialog }}>
            {children}
            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        width: "fit-content",
                        margin: "auto",
                    },
                }}
            >
                <Form />
            </Dialog>
        </FormRegistrationContext.Provider>
    );
};

export const useFormRegistration = () => {
    const context = useContext(FormRegistrationContext);
    if (!context) {
        throw new Error("useFormRegistration must be used within a FormRegistrationProvider");
    }
    return context;
};