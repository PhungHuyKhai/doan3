import { Button } from "antd";
import React from "react";
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton, backgroundColorInput ='#fff', backgroundColorButton ='#333', colorButton='#fff' } = props;
    return (
        <div style={{ display: 'flex' }}>
            <InputComponent 
                size={size} 
                placeholder={placeholder} 
                style={{ backgroundColor: backgroundColorInput, borderRadius: "0", border: "none" }} 
            />
            <ButtonComponent
                size={size} 
                styleButton={{ borderRadius:"0", background: backgroundColorButton, border: "none" }} 
                icon={<SearchOutlined color= {colorButton} style={{ color : '#fff'}}  />}
                textButton={textButton}
                styleTexButton={{color: colorButton}}
            />
        </div>
    );
}

export default ButtonInputSearch;
