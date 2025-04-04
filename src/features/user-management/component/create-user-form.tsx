import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { HorizontalLineTour, Tour } from "../../../components/custom/tour-custom";
import { Hotel } from "../../../model/hotel/hotel";
import { Branch } from "../../../model/branch/branch";
import { LoginForm } from "../../../model/user/login-form";
import { hotelService } from "../../../service/hotel-service/hotel-service";
import { encodePassword } from "../../../utils/helpers";
import { toast } from "react-toastify";
import { CreateAccount } from "./create/create-account";
import { CreateUserInfo } from "./create/create-user-info";
import { User } from "../../../model/user/user";




export const CreateUserForm = ({ data, onComplete, onCancel }: { data: User, onComplete?: (() => void), onCancel?: (() => void) }) => {

    const [tours, setTours] = useState<Tour[]>([
        { id: 1, label: "Tạo thông tin nhân viên", active: false, completed: false },
        { id: 2, label: "Tạo tài khoản", active: false, completed: false }
    ])


    const [user, setUser] = useState<User>(new User())

    const [loginForm, setLoginForm] = useState<LoginForm>(new LoginForm())

    useEffect(() => {
        updateTourStep(1)
  
        // setLoginForm(new LoginForm())

    }, [data])



    const create = (data: LoginForm) => {
       
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
                return <CreateUserInfo data={data}
                    onComplete={(value: User) => {
                        updateTourStep(lastActiveTour.id + 1)
                        // setHotel(value)
                    }}
                    onCancel={onCancel} />;

            case 2:
                return <CreateAccount data={loginForm}
                    onComplete={(value: LoginForm) => create(value)}
                    onRollBack={() => updateTourStep(lastActiveTour.id - 1)}
                />;

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


