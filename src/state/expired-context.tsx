// ExpiredContext.tsx
import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
// import { ModalExpired } from "../components/custom/modal-expired";

// Định nghĩa kiểu cho context
interface ExpiredContextType {
    expired: boolean;
    setExpired: (expired: boolean) => void;
}

// Tạo context với giá trị mặc định
const ExpiredContext = createContext<ExpiredContextType>({
    expired: false,
    setExpired: () => { },
});

// Provider cho context
interface ExpiredProviderProps {
    children: ReactNode;
}

export const ExpiredProvider: React.FC<ExpiredProviderProps> = ({ children }) => {
    const [expired, setExpired] = useState(false);
    const value = useMemo(() => ({ expired, setExpired }), [expired]);

    return (
        <ExpiredContext.Provider value={value}>
            {children}
            {/* <ModalExpired isOpen={expired} setIsOpen={setExpired} /> */}
        </ExpiredContext.Provider>
    );
};

// Hook tùy chỉnh để sử dụng context
export const useExpired = () => useContext(ExpiredContext);
