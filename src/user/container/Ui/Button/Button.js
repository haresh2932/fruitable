import { RestartAlt } from '@mui/icons-material';
import React from 'react';
import { PrimaryButton, SecondaryButton } from './button.style';

function Button({ children, btnType = 'Primary', disableBtn = false, ...rest }) {
    console.log(btnType);

    const checkBtnType = () => {
        switch (btnType) {
            case 'Primary':
                return PrimaryButton
            case 'Secondary':
                return SecondaryButton
            default:
                return PrimaryButton
        }
    }

    const CustomButton = checkBtnType()
    
    return (

        <CustomButton disabled={disableBtn} {...rest}>
            {children}
        </CustomButton>

    );
}

export default Button;