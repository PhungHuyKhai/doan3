import React, { useEffect, useState } from 'react';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import ModalComponent from '../Modal/ModalComponent';
import * as message from '../../components/Message/Message';
import * as UserService from '../../services/UserServices';
import { WrapperHeader, WrapperUploadFile } from './style';
import { getBase64 } from '../../utils';
import { useSelector } from 'react-redux';
import { useMutationHooks } from '../../hooks/userMutationHook';
import { useQuery } from '@tanstack/react-query';


const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const user = useSelector((state) => state?.user);
    const [stateUser, setstateUser] = useState({
        name: '',
        email: '',
        isAdmin: false,
        phone: '',
    });
    const [stateUserDetails, setstateUserDetails] = useState({
        name: '',
        email: '',
        isAdmin: false,
        phone: '',
    });
    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { name, email, isAdmin, phone } = data;
            const res = UserService.signupUser({
                name,
                email,
                isAdmin,
                phone,
            });
            return res;
        }
    );

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, ...rests } = data;
            const res = UserService.updateUser(id, { ...rests });
            return res;
        }
    );
    const mutationDelete = useMutationHooks(
        (data) => {
            const { id } = data;
            const res = UserService.deleteUser(id);
            return res;
        }
    );

    const fetchgetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected);
        if (res?.data) {
            setstateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                isAdmin: res?.data?.isAdmin,
                phone: res?.data?.phone,
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (rowSelected) {
            fetchgetDetailsUser(rowSelected);
        }
    }, [rowSelected]);

    const handleDetailUser = () => {
        if (rowSelected) {
            fetchgetDetailsUser();
        }
        setIsOpenDrawer(true);
    };

    const getAllUsers = async () => {
        const res = await UserService.getAllUser();
        return res;
    };

    const { data, isSuccess, isError } = mutation;
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
    const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUsers });
    const { data: users } = queryUser;
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailUser} />
            </div>
        );
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false
                }
            ]
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = users?.data?.length && users?.data?.map((user) => {
        return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' };
    });

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success();
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error();
        }
    }, [isSuccessDeleted]);

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setstateUserDetails({
            name: '',
            email: '',
            isAdmin: false,
            phone: '',
        });
        form.resetFields();
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated]);

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const handledeleteUser = () => {
        mutationDelete.mutate({ id: rowSelected }, {
            onSettled: () => {
                queryUser.refetch();
            }
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setstateUser({
            name: '',
            email: '',
            isAdmin: false,
            phone: '',
        });
        form.resetFields();
    };

    const onFinish = () => {
        mutation.mutate(stateUser, {
            onSettled: () => {
                queryUser.refetch();
            }
        });
    };

    const handleOnchange = (e) => {
        setstateUser({
            ...stateUser,
            [e.target.name]: e.target.value
        });
    };
    const handleOnchangeDetails = (e) => {
        setstateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setstateUser({
            ...stateUser,
            avatar: file.preview
        });
    };
    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setstateUserDetails({
            ...stateUserDetails,
            avatar: file.preview
        });
    };
    const onUpdateuser = () => {
        mutationUpdate.mutate({ id: rowSelected, ...stateUserDetails }, {
            onSettled: () => {
                queryUser.refetch();
            }
        });
    };

    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button
                    style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: '50px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent
                    columns={columns}
                    data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                setRowSelected(record._id);
                            }
                        };
                    }}
                />
            </div>
            <ModalComponent
                forceRender
                title="Tạo người dùng"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
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
                        <InputComponent value={stateUser.name} onChange={handleOnchange} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUser.email} onChange={handleOnchange} name="email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUser.password} onChange={handleOnchange} name="password" />
                    </Form.Item>
                    <Form.Item
                        label="Isadmin"
                        name="isAdmin"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your is admin!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUser.isAdmin} onChange={handleOnchange} name="isAdmin" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUser.phone} onChange={handleOnchange} name="phone" />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUser.address} onChange={handleOnchange} name="address" />
                    </Form.Item>
                    <Form.Item>
                        <WrapperUploadFile Upload File onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button>Select File</Button>
                            {stateUser.avatar && (
                                <img
                                    src={stateUser.avatar}
                                    style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px',
                                    }}
                                    alt="avatar"
                                />
                            )}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 16,
                        }}
                    >
                        <Button address="primary" htmladdress="submit">
                            Thêm mới
                        </Button>
                    </Form.Item>
                </Form>
            </ModalComponent>
            <DrawerComponent
                title='Chi tiết người dùng'
                isOpen={isOpenDrawer}
                onClose={handleCloseDrawer}
                width="90%"
            >
                <Form
                    name="basic"
                    labelCol={{ span: 2, }}
                    wrapperCol={{ span: 22, }}
                    onFinish={onUpdateuser}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!', },
                        ]}
                    >
                        <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUserDetails.email} onChange={handleOnchangeDetails} name="email" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                    </Form.Item>
                    <Form.Item>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 16,
                        }}
                    >
                        <Button address="primary" htmladdress="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerComponent>

            <ModalComponent title="Xoá người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handledeleteUser}>
                <div>Bạn có chắc muốn xoá người dùng này không?</div>
            </ModalComponent>
        </div>
    );
};

export default AdminUser;
