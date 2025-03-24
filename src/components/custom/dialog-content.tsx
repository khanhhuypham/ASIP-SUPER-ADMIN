import { Button } from "antd";



interface DialogContentProps {

    title?: string;
    content?: string | React.ReactNode;
    icon?: React.ReactNode;
    btnConfirm?: React.ReactNode;
    onConfirm?: (() => void);
}

export const DialogContent = ({ title, content, icon, btnConfirm, onConfirm }: DialogContentProps) => {


    return (
        <div>

            <div className="space-y-4">
                {icon}

                <div>
                    <p className="font-semibold text-lg">
                        {title}
                    </p>

                    <p className="text-gray-600">
                        {content}
                    </p>
                </div>
                
                <div className="flex justify-end">
                    {
                        btnConfirm
                        ? btnConfirm
                        : (
                            <Button type="primary" size="middle" onClick={onConfirm && onConfirm}>
                                <span className="font-bold">XÁC NHẬN</span>
                            </Button>
                        )
                    }
                </div>
            </div>


        </div>
    )

}

