import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import FooterPage from '../FooterPage/FooterPage'


const HomePage = () => {
    const arr = ['Danh mục sản phẩm', 'Tìm theo hãng', 'Sim số-dịch vụ', 'Phụ Kiện', 'Trả góp', 'Độc quyền online', 'Tin tức']
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct()
        console.log('res', res)
        return res
    }
    const { data: products } = useQuery({ queryKey: 'product', queryFn: fetchProductAll, retry: 3, retryDelay: 1000 })
    console.log('data', products)
    return (

        <div >
            <WrapperTypeProduct>
                {arr.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />
                    )
                })}

            </WrapperTypeProduct>

            <div className='body' style={{ width: '100%', height: '1100px', backgroundColor: '#efefef' }}>
                <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />
                    <WrapperProducts style={{ marginTop: '20px', display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {products?.data?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    counInStock={product.counInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    selled={product.selled}
                                    discount={product.discount}
                                    id={product._id}
                                />
                            )
                        })}

                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <WrapperButtonMore textButton="Xem thêm" styleButton={{
                            border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
                            width: '240px', height: '38px', borderRadius: '4px', marginTop: '23px'
                        }}
                            styleTexButton={{ fontWeight: 500 }}
                        />
                    </div>

                </div>
            </div>
            <FooterPage />

        </div>


    )
}

export default HomePage