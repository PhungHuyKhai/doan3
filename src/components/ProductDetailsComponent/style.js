import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const WrapperStyleNameProduct = styled.h1`
    color: rgb(39, 39, 42);
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    word-break: break-word;
    white-space: break-spaces;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 8px;
`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 24px;
    font-weight: 600;
    line-height: 150%;
    padding: 10px;
    margin-top: 10px;
`

export const WrapperAddressProduct = styled.div`
    span.address{
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl;
        text-decoration: none
    };
    span.change-address{
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-wight: 500;
        flex-shrink: 0;
        
    }
`

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 100px;
    border: 1px solid #ccc;
    border-radius: 4px;

`

export const WrapperSellText = styled.span`
    
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    padding: 0px 4px;
    background: #fff;
    border-radius: 8px;
    color: rgb(39, 39, 42);
`



export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm{
        width: 60px;
        border-top: none;
        border-bottom: none;
        $.ant-input-number-handler-wrap{
            display: none;
    }
};
`

export const WrapperShipper = styled.h4`
    font-size: 14px;
    line-height: 150%;
    color: rgb(39, 39, 42);
    margin-left: 8px;
`





