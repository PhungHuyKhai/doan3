import styled from "styled-components";

export const FooterContainer = styled.footer`

    hr {
        background-color: var(--red-color); /* Màu sắc của đường phân cách */
        height: 5px;
        border: none;
        margin-top: 0;
        width: 100%;
    }
    .grid {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 15px;
    }
    .grid__row-footer {
        display: flex;
        justify-content: space-between;
    }
    .row {
        display: flex;
        flex-wrap: wrap;
    }
    .col-10 {
        flex: 0 0 100%;
        max-width: 100%;
    }
`;

export const FooterSection = styled.div`
    margin: 10px 0;
    width: 25%;
`;

export const FooterTitle = styled.h2`
    font-weight: 600;
    font-size: 20px;
    color: var(--black-color);
    padding-bottom: 10px;
    cursor: pointer;
`;

export const FooterList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const FooterListItem = styled.li`
    margin-bottom: 10px;
    font-size: 12px;
`;

export const FooterLink = styled.a`
    color: var(--black-color);
    text-decoration: none;
    line-height: 2;
    font-weight: 400;
    &:hover {
        text-decoration: underline;
        opacity: 0.7;
    }
`;

export const FooterInfo = styled.div`
    background-color: #f2f2f2;
    color: #6d6d6d;
    font-size: 10px;
    text-align: center;
    padding: 10px 2px;
`;
