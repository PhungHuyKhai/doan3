import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Modal } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/userMutationHook'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { render } from '@testing-library/react'
import { useSelector } from 'react-redux'
import ModalComponent from '../Modal/ModalComponent'

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''
    })
    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''
    })
    const [form] = Form.useForm();

    const mutation = useMutationHooks (
        (data) => {
        const { name,
            price,
            description,
            rating,
            image,
            type,
        countInStock: countInStock } = data
       const res = ProductService.createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock
        })
            return res
        }
    )

    const mutationUpdate = useMutationHooks (
        (data) => {
        const { id,
             ...rests} = data
       const res = ProductService.updateProduct(
            id,
            {...rests})
            return res
        }
    )
    const mutationDelete = useMutationHooks (
        (data) => {
        const { id } = data
       const res = ProductService.deleteProduct(
            id)
            return res
        }
    )
    
    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if(res?.data){
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock
            })
        }
    }

    useEffect(() => {
        console.log('stateProductDetails', )
        form.setFieldsValue(stateProductDetails);
    }, [form, stateProductDetails]);
    

    useEffect(() => {
        if(rowSelected) {
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsProduct = () => {
        if (rowSelected){
          fetchGetDetailsProduct();
        }
        setIsOpenDrawer(true)
    }

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    


    const { data, isSuccess, isError} = mutation
    const { data : dataUpdated, isSuccess : isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate
    const { data : dataDeleted, isSuccess : isSuccessDeleted, isError: isErrorDeleted} = mutationDelete
    const queryProduct = useQuery({ queryKey: ['products' ], queryFn: getAllProducts});
    const { data: products} = queryProduct
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer'}} onClick={() => setIsModalOpenDelete(true)}/>
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer'}} onClick={handleDetailsProduct}/>
            </div>
        )
    }
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Price',
          dataIndex: 'price',
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        },
      ];
      const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {...product, key: product._id}
      })


    useEffect(() => {
        if(isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        }else if(isError){
            message.error()
        }
    },[isSuccess])

    useEffect(() => {
        if(isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        }else if(isErrorDeleted){
            message.error()
        }
    },[isSuccessDeleted])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
        })
        form.resetFields()
      };

    useEffect(() => {
        if(isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        }else if(isErrorUpdated){
            message.error()
        }
    },[isSuccessUpdated])
  
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteProduct = () => {
        mutationDelete.mutate({id: rowSelected}, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
        })
        form.resetFields()
      };

    const onFinish = () => {
       mutation.mutate(stateProduct,{
             onSettled:() => {
                 queryProduct.refetch()
             }
         }) 
    }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }
    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image:  file.preview
        });
    }
    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        });
    }
    const onUpdateProduct = () => {
        mutationUpdate.mutate({id: rowSelected,  ...stateProductDetails}, {
            onSettled:() => {
                queryProduct.refetch()
            }
        })
    }
    return(
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px'}}>
                 <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '50px'}} /></Button>
            </div>
            <div style={{ marginTop: '20px'}}>
                 <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                    onClick: event => {
                        setRowSelected(record._id)
                    }
                    };
                }}/>
            </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen}  onCancel={handleCancel} footer={null}>
            <Form
                name="basic"
                labelCol={{
                span: 6,
                }}
                wrapperCol={{
                span: 18,
                }}
                onFinish={onFinish}
                autoComplete="on"
                form={form}
            >
                <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                    required: true,
                    message: 'Please input your name!',
                    },
                ]}
                >
                <InputComponent value={stateProduct['name']} onChange={handleOnchange} name="name" />
                </Form.Item>

                <Form.Item
                label="Type"
                name="type"
                rules={[
                    {
                    required: true,
                    message: 'Please input your type!',
                    },
                ]}
                >
                <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type"/>
                </Form.Item>
                <Form.Item
                label="Count inStock"
                name="countInStock"
                rules={[
                    {
                    required: true,
                    message: 'Please input your count inStock!',
                    },
                ]}
                >
                <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                </Form.Item>
                <Form.Item
                label="Price"
                name="price"
                rules={[
                    {
                    required: true,
                    message: 'Please input your price!',
                    },
                ]}
                >
                <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                </Form.Item>
                    <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your description!',
                        },
                    ]}
                    >
                    <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" /> 
                    </Form.Item>
                <Form.Item
                label="Rating"
                name="rating"
                rules={[
                    {
                    required: true,
                    message: 'Please input your rating!',
                    },
                ]}
                >
                <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your description!',
                        },
                    ]}
                    >
                    <WrapperUploadFile Upload File onChange={handleOnchangeAvatar} maxCount={1}>
                         <Button>Select File</Button>
                         {stateProduct.image && (
                            <img src={stateProduct?.image} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft:'10px',
                            }} alt="avatar" />
                        )}
                    </WrapperUploadFile>
                    </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 20,
                        span: 16,
                    }}
                >
                <Button type="primary" htmlType="submit">
                    Thêm mới
                </Button>
                </Form.Item>
                </Form>
            </ModalComponent>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
            <Form
                name="basic"
                labelCol={{ span: 2, }}
                wrapperCol={{ span: 22, }}
                onFinish={onUpdateProduct}
                autoComplete="on"
                form={form}
            >
                <Form.Item
                label="Name"
                name="name"
                rules={[ {required: true, message: 'Please input your name!', },
                ]}
                >
                <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name" />
                </Form.Item>

                <Form.Item
                label="Type"
                name="type"
                rules={[
                    {
                    required: true,
                    message: 'Please input your type!',
                    },
                ]}
                >
                <InputComponent value={stateProductDetails.type} onChange={handleOnchangeDetails} name="type"/>
                </Form.Item>
                <Form.Item
                label="Count inStock"
                name="countInStock"
                rules={[
                    {
                    required: true,
                    message: 'Please input your count inStock!',
                    },
                ]}
                >
                <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock" />
                </Form.Item>
                <Form.Item
                label="Price"
                name="price"
                rules={[
                    {
                    required: true,
                    message: 'Please input your price!',
                    },
                ]}
                >
                <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
                </Form.Item>
                    <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your description!',
                        },
                    ]}
                    >
                    <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" /> 
                    </Form.Item>
                <Form.Item
                label="Rating"
                name="rating"
                rules={[
                    {
                    required: true,
                    message: 'Please input your rating!',
                    },
                ]}
                >
                <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails} name="rating" />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your description!',
                        },
                    ]}
                    >
                    <WrapperUploadFile Upload File onChange={handleOnchangeAvatarDetails} maxCount={1}>
                         <Button>Select File</Button>
                         {stateProductDetails.image && (
                            <img src={stateProductDetails?.image} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft:'10px',
                            }} alt="avatar" />
                        )}
                    </WrapperUploadFile>
                    </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 20,
                        span: 16,
                    }}
                >
                <Button type="primary" htmlType="submit">
                    Cập nhật
                </Button>
                </Form.Item>
                </Form>
            </DrawerComponent>

            <ModalComponent title="Xoá sản phẩm" open={isModalOpenDelete}  onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
                    <div>Bạn có chắc muốn xoá sản phẩm này không?</div>
            </ModalComponent>
        </div>
    )
}

export default AdminProduct