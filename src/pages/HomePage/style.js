import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 90px;
    justify-content: flex-start;
    font-size: 15px;
    color: #fff;
    background-color: #333;
    height: 45px;
    padding-left: 125px;
    font-weight: bold;
    &:hover{
        color: #ff0; /* Màu chữ thay đổi khi hover */
    }
`
 
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover{
        color: #fff;
        background: rgb(13, 92, 182) !important;;
        span{
            color: #fff;
        }
    }
    width: 100%;
    text-align: center:
`

export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;
`

