import React, { Fragment } from 'react'
import NavbarComponent from '../../components/NavbarCombonent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'

const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{ width: '100%', height: '1060px', background: '#efefef' }}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                    <WrapperNavbar span={4} >
                        <NavbarComponent />
                    </WrapperNavbar>
                    <Col span={20}>
                        <WrapperProducts >
                            <CardComponent />
                            <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{ textAlign: 'center', margin: 'top' }} />
                        </WrapperProducts>
                    </Col>
                </Row>
            </div>
        </div>



    )
}

export default TypeProductPage