import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 0;
    background-color: #cd1818;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
`
export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* X, Y, blur radius, color */
    
`
export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    font-size: 12px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;

`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        background: red;
        color: #fff;
    }
`
