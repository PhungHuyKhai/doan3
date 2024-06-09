import { Col, Row, Image, Rate } from "antd";
import React, { useState } from "react";
import imageProductSmall from '../../assets/images/testSmall3.webp'
import imageTicken from '../../assets/images/ticken.png'
import imageshipper from '../../assets/images/Shipper.png'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperSellText, WrapperShipper, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";
import {
    PlusOutlined, MinusOutlined
} from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import FooterPage from "../../pages/FooterPage/FooterPage";
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from "react-redux";



const ProductDetailsComponent = ({ idProduct }) => {
    const user = useSelector((state) => state.user)
    const [numProduct, setNumProduct] = useState(1)
    const onChange = (value) => {
        setNumProduct(Number(value))
    }
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        const res = await ProductService.getDetailsProduct(id)
        return res.data
    }

    const { data: productDetails } = useQuery({
        queryKey: ['prduct-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct
    });

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct(numProduct + 1)
        } else {
            setNumProduct(numProduct - 1)
        }
    }

    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <Image src={productDetails?.image} alt="image product" preview={false} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <div style={{ marginTop: '10px', }}>
                        <h3>Đặc điểm nổi bật</h3>
                        <div style={{ display: 'flex', lineheight: '150%', gap: '8px', color: ' #333', paddingBottom: '5px' }}>
                            <Image style={{ width: '16px', height: '16px' }} src={imageTicken} alt="image ticken" />
                            <h4 style={{ paddingTop: '2px' }}>Màn hình 6.6 inch FHD+ cho hiển thị sống động và chân thực.</h4>
                        </div>
                        <div style={{ display: 'flex', lineheight: '150%', gap: '8px', color: ' #333', paddingBottom: '5px' }}>
                            <Image style={{ width: '16px', height: '16px' }} src={imageTicken} alt="image ticken" />
                            <h4 style={{ paddingTop: '2px' }} >Camera chính 50MP cho ảnh sắc nét, tự tin tỏa sáng trong mọi điều kiện.</h4>
                        </div>
                        <div style={{ display: 'flex', lineheight: '150%', gap: '8px', color: ' #333', paddingBottom: '5px' }}>
                            <Image style={{ width: '16px', height: '16px' }} src={imageTicken} alt="image ticken" />
                            <h4 style={{ paddingTop: '2px' }}>Dung lượng pin 5000mAh bền bỉ, đồng hành cùng bạn cả ngày dài.</h4>
                        </div>
                    </div>
                    <div style={{ width: '100%', padding: '16px', background: 'rgb(250, 250, 250)', borderRadius: '8px' }}>
                        <div>
                            <h3>Thông tin bảo hành</h3>
                            <div style={{ display: 'flex', gap: '4px', marginTop: '15px', borderBottom: '1px solid #e5e5e5 ', paddingBottom: '10px' }}>
                                <span>Thời gian bảo hành: </span>
                                <div style={{ color: 'rgb(39, 39, 42)', fontWeight: 'bold' }}>12 tháng</div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px', marginTop: '15px', borderBottom: '1px solid #e5e5e5 ', paddingBottom: '10px' }}>
                                <span>Hình thức bảo hành: </span>
                                <div style={{ color: 'rgb(39, 39, 42)', fontWeight: 'bold' }}>Điện tử</div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px', marginTop: '15px', borderBottom: '1px solid #e5e5e5 ', paddingBottom: '10px' }}>
                                <span>Nơi bảo hành: </span>
                                <div style={{ color: 'rgb(39, 39, 42)', fontWeight: 'bold' }}>Bảo hành chính hãng</div>
                            </div>
                            <div style={{ display: 'flex', gap: '4px', marginTop: '15px', borderBottom: '1px solid #e5e5e5 ', paddingBottom: '10px' }}>
                                <span>Hướng dẫn bảo hành: </span>
                                <div style={{ color: 'rgb(10, 104, 255)', fontWeight: 'bold' }}>Xem chi tiết</div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <WrapperStyleNameProduct> {productDetails?.name} - Hàng Chính Hãng</WrapperStyleNameProduct>
                <div>
                    <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                    <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>{productDetails?.price}
                        <sup>đ</sup>
                        <WrapperSellText>
                            -25%
                        </WrapperSellText>
                    </WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct style={{ background: 'rgb(250, 250, 250)', borderRadius: '8px', padding: '16px' }}>
                    <span className='address'>Thông tin vận chuyển</span>
                    <div>
                        <span >{user?.address}</span> -
                        <span className='change-address'>Đổi địa chỉ</span>
                    </div>

                    <div style={{ marginTop: '10px', borderTop: '1px solid #e5e5e5' }}>

                        <div style={{ display: 'flex', lineheight: '150%', gap: '8px', color: ' #333', paddingBottom: '5px', marginTop: '20px' }}>
                            <Image style={{ width: '32px', height: '16px' }} src={imageshipper} alt="image shipper" />
                            <WrapperShipper>Giao thứ 6</WrapperShipper>

                        </div>
                        <div style={{ display: ' flex' }}>
                            <span>Trước 19h, 31/05:</span>
                            <span style={{ color: '#00AB56', paddingLeft: '5px', paddingRight: '5px' }}>Miễn phí</span>
                            <div style={{ color: '#808089', textDecoration: 'line-through' }}>
                                <span>22.000</span>
                                <sup>đ</sup>
                            </div>

                        </div>

                    </div>
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 18px', padding: ' 10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                    <div style={{ marginBottom: '10px' }}>Số lượng</div>
                    <WrapperQualityProduct>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                        <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} size="small" />
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>

                    </WrapperQualityProduct>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: ' 12px' }}>
                    <ButtonComponent
                        size={40}
                        styleButton={{ background: 'rgb(255, 57, 69)', height: '48px', width: '220px', border: 'none' }}
                        textButton={'Mua ngay'}
                        styleTexButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                    <ButtonComponent
                        size={40}
                        styleButton={{ background: '#fff', height: '48px', width: '220px', border: '1px solid rgb(13, 92, 182)' }}
                        textButton={'Thêm vào giỏ hàng'}
                        styleTexButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                    ></ButtonComponent>
                    <ButtonComponent
                        size={40}
                        styleButton={{ background: '#fff', height: '48px', width: '220px', border: '1px solid rgb(13, 92, 182)' }}
                        textButton={'Mua trả góp-trả sau'}
                        styleTexButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                    ></ButtonComponent>
                </div>
                <WrapperAddressProduct style={{ background: 'rgb(250, 250, 250)', borderRadius: '8px', padding: '16px', marginTop: '20px', width: '100%' }}>
                    <span className='address'>Thông tin chi tiết</span>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', width: '100%', paddingTop: '15px' }}>
                        <div style={{ width: '60%', color: 'rgb(128, 128, 137)' }}>
                            <span >Dung lượng pin</span>
                        </div>
                        <div>
                            <span >5000 mah</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', width: '100%', paddingTop: '15px' }}>
                        <div style={{ width: '60%', color: 'rgb(128, 128, 137)' }}>
                            <span >Bluetooth</span>
                        </div>
                        <div>
                            <span >v5.2</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', width: '100%', paddingTop: '15px' }}>
                        <div style={{ width: '60%', color: 'rgb(128, 128, 137)' }}>
                            <span >Thương hiệu</span>
                        </div>
                        <div>
                            <span >Samsung</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', width: '100%', paddingTop: '15px' }}>
                        <div style={{ width: '60%', color: 'rgb(128, 128, 137)' }}>
                            <span >Xuất xứ (Made in)</span>
                        </div>
                        <div>
                            <span >Việt Nam</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', width: '100%', paddingTop: '15px' }}>
                        <div style={{ width: '60%', color: 'rgb(128, 128, 137)' }}>
                            <span >RAM</span>
                        </div>
                        <div>
                            <span >4GB</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', width: '100%', paddingTop: '15px' }}>
                        <div style={{ width: '60%', color: 'rgb(128, 128, 137)' }}>
                            <span >ROM</span>
                        </div>
                        <div>
                            <span >128GB</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', width: '100%', paddingTop: '15px' }}>
                        <div style={{ width: '60%', color: 'rgb(128, 128, 137)' }}>
                            <span >Kích thước màn hình</span>
                        </div>
                        <div>
                            <span >6.6 inch</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', width: '100%', paddingTop: '15px' }}>
                        <div style={{ width: '60%', color: 'rgb(128, 128, 137)' }}>
                            <span >Wifi</span>
                        </div>
                        <div style={{ height: '45px', width: '552px', width: '40%' }}>
                            <span >Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi hotspot, Wi-Fi Direct,Dual-band (2.4 GHz/5 GHz)</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', width: '100%', paddingTop: '15px' }}>
                        <div style={{ width: '60%', color: 'rgb(128, 128, 137)' }}>
                            <span >Sản phẩm có được bảo hành không?</span>
                        </div>
                        <div>
                            <span >Có</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px', width: '100%', paddingTop: '15px' }}>
                        <div style={{ width: '60%', color: 'rgb(128, 128, 137)' }}>
                            <span >Thời gian bảo hành</span>
                        </div>
                        <div>
                            <span >12 tháng</span>
                        </div>

                    </div>


                </WrapperAddressProduct>
            </Col>
            <FooterPage />
        </Row>
    )
}

export default ProductDetailsComponent