import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Hotel } from "../../../../model/hotel/hotel";
import { ExternalLabelTextField } from "../../../../components/custom/field/external-label-textfield";
import { emailRegex, phoneRegExp } from "../../../../constants/regex";
import { ExternalLabelTextArea } from "../../../../components/custom/field/external-label-textarea";
import { HorizontalLineTour, Tour } from "../../../../components/custom/tour-custom";
import { CreateHotel } from "./create-hotel";
import { CreateBranch } from "./create-branch";
import { Branch } from "../../../../model/branch/branch";
import { CreateAccount } from "./create-account";
import { CreateAccountSuccess } from "./create-account-success";
import { LoginForm } from "../../../../model/user/login-form";



export const CreateForm = ({ data, onComplete }: { data: Hotel, onComplete?: (() => void) }) => {

    const [tours, setTours] = useState<Tour[]>([
        { id: 1, label: "Tạo khách hàng", active: false, completed: false },
        { id: 2, label: "Tạo chi nhánh", active: false, completed: false },
        { id: 3, label: "Tạo tài khoản", active: false, completed: false },
        { id: 4, label: "Thành công", active: false, completed: false }
    ])


    useEffect(() => {
        updateTourStep(1)
    }, [data])

    const updateTourStep = (newActiveId: number) => {

  
        setTours((prevTours) =>
            prevTours.map((tour) =>
                tour.id === newActiveId
                    ? { ...tour, active: true, completed: true }
                    : { ...tour, active: tour.id < newActiveId ? true : false, completed: tour.id < newActiveId }
            )
        );


    };



    const renderContent = () => {
        const lastActiveTour = [...tours].reverse().find(tour => tour.active);

        if (!lastActiveTour) return null;

        const commonProps = {
            onComplete: () => updateTourStep(lastActiveTour.id + 1),
            onRollBack: () => updateTourStep(lastActiveTour.id - 1),
        };

        switch (lastActiveTour.id) {
            case 1:
                return <CreateHotel data={data} {...commonProps} />;
            case 2:
                return <CreateBranch data={new Branch()} {...commonProps} />;
            case 3:
                return <CreateAccount data={new Branch()} {...commonProps} />;
            case 4:
                return <CreateAccountSuccess data={new LoginForm()} onComplete={onComplete} />;
            default:
                return null;
        }
    }

    return (
        <div className="space-y-6 w-full">
            
            <div className="w-[750px]">
                <HorizontalLineTour tours={tours} />
            </div>
           

            {renderContent()}


        </div>
    )
};


