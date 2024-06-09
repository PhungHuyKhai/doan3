import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import {UserOutlined, AppstoreOutlined, PieChartOutlined, ContactsOutlined,BankOutlined, AppleOutlined} from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';

import AdminKH from '../../components/AdminKH/AdminKH';
import AdminLSP from '../../components/AdminLSP/AdminLSP';
import AdminNCC from '../../components/AdminNCC/AdminNCC';

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppleOutlined />),
        getItem('Loại sản phẩm', 'loaisp', <AppstoreOutlined />),
        getItem('Nhà cung cấp', 'nhacc', <BankOutlined />),
        getItem('Khách hàng', 'khachhang', <ContactsOutlined />),
        getItem('Đơn hàng', 'donhang', <PieChartOutlined/>)
  
    ];


    const [keySelected, setKeySelected] = useState('')

    const renderPage =(key) => {
        switch(key) {
            case 'user' :
                return(
                    <AdminUser/>
                )
                case 'product' :
                return(
                    <AdminProduct/>
                )
                 case 'loaisp' :
                return(
                    <AdminLSP/>
                )
                case 'nhacc' :
                return(
                    <AdminNCC/>
                )
                case 'khachhang' :
                    return(
                        <AdminKH/>
                    )
                default: 
                    return<></>
        }
        
    }

       

    const handleOnclick = ({ key}) => {
        setKeySelected(key)
    }
    console.log('keySelected', keySelected)
    return(
        <>
        <HeaderComponent isHiddenSearch isHiddenCart/>
            <div style={{ display: 'flex', }}>
                <Menu
                    mode="inline"
                    style={{
                    width: 256,
                    boxShadow: '1px, 1px, 2px #ccc',
                    height: '100vh'
                    }}
                    items={items}
                    onClick={handleOnclick}
                />
                <div style={{flex: '1', padding: '15px'}}>
                    {renderPage(keySelected)}
                </div>
            </div>
    </>
    )
}

export default AdminPage