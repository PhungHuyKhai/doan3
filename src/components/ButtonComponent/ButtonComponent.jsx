
import { Button } from "antd";
import React from "react";
const ButtonComponent =({size, styleButton, styleTexButton, textButton,disabled, ...rests}) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.background
            }}
            size={size} 
            {...rests}
            ><span style={styleTexButton}>{textButton}</span>
        </Button>
    )
}
export default ButtonComponent