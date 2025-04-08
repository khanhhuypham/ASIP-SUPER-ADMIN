import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Hotel } from "../../../../model/hotel/hotel";
import { ExternalLabelTextField } from "../../../../components/custom/field/external-label-textfield";
import { emailRegex, phoneRegExp } from "../../../../constants/regex";
import { ExternalLabelTextArea } from "../../../../components/custom/field/external-label-textarea";
import { HorizontalLineTour, Tour } from "../../../../components/custom/tour-custom";
import { CreateHotel } from "./create-hotel";

import { Branch } from "../../../../model/branch/branch";
import { CreateAccount } from "../../../user-management/component/create/create-account";
import { CreateAccountSuccess } from "./create-account-success";
import { LoginForm } from "../../../../model/user/login-form";
import { encodePassword } from "../../../../utils/helpers";
import { hotelService } from "../../../../service/hotel-service/hotel-service";
import { message } from "antd";
import { CreateBranch } from "../../../branch-management/component/create-branch";



export const CreateForm = ({ data, onComplete,onCancel }: { data: Hotel, onComplete?: (() => void),onCancel?: (() => void)}) => {

    const [tours, setTours] = useState<Tour[]>([
        { id: 1, label: "Tạo khách sạn", active: false, completed: false },
        { id: 2, label: "Tạo chi nhánh", active: false, completed: false },
        { id: 3, label: "Tạo tài khoản", active: false, completed: false },
        { id: 4, label: "Thành công", active: false, completed: false }
    ])

    const [hotel, setHotel] = useState<Hotel>(new Hotel())

    const [branch, setBranch] = useState<Branch>(new Branch())

    const [loginForm, setLoginForm] = useState<LoginForm>(new LoginForm())

    useEffect(() => {
        updateTourStep(1)
        setHotel(new Hotel())
        setBranch(new Branch())
        setLoginForm(new LoginForm())

    }, [data])



    const create = (data: LoginForm) => {
        const login = {...data, password: encodePassword(data.password) }

        hotelService.create(hotel, branch, login).then((res) => {
          
            if (res.status == 200) {
                const lastActiveTour = [...tours].reverse().find(tour => tour.active);
                if (!lastActiveTour) return null;
         
                setLoginForm(data)
                updateTourStep(lastActiveTour.id + 1)
                message.success("Tao khách sạn thành công");
            } else {
        
                message.error(res.message);
            }
        })

    }


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

        switch (lastActiveTour.id) {
            case 1:
                return <CreateHotel data={hotel}
                    onComplete={(value: Hotel) => {
                        updateTourStep(lastActiveTour.id + 1)
                        setHotel(value)
                    }}
                    onCancel={onCancel}
                />;
            case 2:
                return <CreateBranch data={branch}
                    onComplete={(value: Branch) => {
                        updateTourStep(lastActiveTour.id + 1)
                        setBranch(value)
                    }}
                    onRollBack={() => updateTourStep(lastActiveTour.id - 1)}
                />;
            case 3:
                return <CreateAccount data={loginForm}
                    onComplete={(value: LoginForm) =>  create(value)}
                    onRollBack={() => updateTourStep(lastActiveTour.id - 1)}
                />;
            case 4:
                return <CreateAccountSuccess hotel={hotel} loginForm={loginForm} onComplete={onComplete} />;

            default:
                return null;
        }
    }


    return (
        <div className="space-y-6 w-full">

            <div className="w-full">
                <HorizontalLineTour tours={tours} />
            </div>

            {renderContent()}
        </div>
    )
};


