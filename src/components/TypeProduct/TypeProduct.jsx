import React from "react";
import styled from "styled-components";

const ProductWrapper = styled.div`
    color: #fff; /* Màu chữ mặc định */
    transition: color 0.3s ease; /* Hiệu ứng transition */
    &:hover {
        color: #ff0; /* Màu chữ khi hover */
    }
`;

const TypeProduct = ({ name }) => {
    return (
        <ProductWrapper>{name}</ProductWrapper>
    );
}

export default TypeProduct;
