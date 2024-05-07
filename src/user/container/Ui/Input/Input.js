import React from 'react';
import { SpanError } from './input.style';

function Input({errorText, ...rest}) {
    return (
        <>
    
            <SpanError >
                {errorText}
            </SpanError>
        </>
    );
}

export default Input;