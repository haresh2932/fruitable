import styled from "styled-components";

const BaseButton = styled.button`

    transition: 0.5s;
    cursor: pointer;
    font-weight: 600;
    transition: .5s;
    border-radius: 50rem !important;   
    text-transform: uppercase !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
    margin-left: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    border-color: #ffb524 !important;
    display: inline-block;    
    line-height: 1.5;    
    text-align: center;
    vertical-align: middle;
    -moz-user-select: none;
    user-select: none;    
    font-size: 1rem; 
   
    
}
`

export const SecondaryButton = styled(BaseButton)`
    color:#fff !important;
    background-color: #81c408;
    border: 1px solid rgb(255, 181, 36) !important;
    position: absolute;
    top: 0px;
    right:0px; 
    &:hover{
        background: var(--bs-secondary) !important;
        color: var(--bs-white) !important;
    }      
`

export const PrimaryButton = styled(BaseButton)`
    color: #81c408 !important;
    background-color:${(props)=>props.disabled?'grey':'rgba(0, 0, 0, 0)'}; ;
    border: 1px solid #ffb524 !important;
   
    &:hover{
        background: ${(props)=>props.disabled? 'grey':'var(--bs-secondary)'} 
        color: ${(props)=>props.disabled? 'grey':' var(--bs-white) !important'};
    }      

`


