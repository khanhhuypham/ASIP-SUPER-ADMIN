
import { FC } from 'react';
import { IconProps } from '../../constants/interface';

const IconPlay: FC<IconProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.394 13.0455L7.8495 18.5835C7.0395 19.053 6 18.4845 6 17.538V6.46197C6 5.51697 7.038 4.94697 7.8495 5.41797L17.394 10.956C17.5783 11.0612 17.7314 11.2132 17.8379 11.3967C17.9445 11.5802 18.0006 11.7886 18.0006 12.0007C18.0006 12.2129 17.9445 12.4213 17.8379 12.6048C17.7314 12.7882 17.5783 12.9403 17.394 13.0455Z" fill="#0866FF" />
            </svg>


        </div>

    );
};

export default IconPlay;
