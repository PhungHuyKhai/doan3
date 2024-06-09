import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText, WrapperSaleText, WrapperStyleTextSell } from "./style";
import {
    StarFilled
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const CardComponent = (props) => {
    const { counInStock, description, image, name, price, rating, type, selled, discount, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (

        <WrapperCardStyle

            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: 200 }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src={image} style={{ width: '196px', marginLeft: '1px' }} />}
            onClick={() => handleDetailsProduct(id)}>



            <WrapperSaleText style={{ position: 'absolute', top: -4, left: -4 }}> {/* Đặt vị trí tuyệt đối */}
                <span>Giảm 14%</span>
            </WrapperSaleText>
            <StyleNameProduct>
                {name}
            </StyleNameProduct>
            <WrapperReporText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <WrapperStyleTextSell> | Đã bán {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReporText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{price}</span>
                <WrapperDiscountText>
                    {discount || 5}%
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}
export default CardComponent