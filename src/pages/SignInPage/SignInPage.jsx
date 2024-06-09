import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import imagelogo from '../../assets/images/sign-in.png';
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'; // Đảm bảo nhập các biểu tượng này
import { navigate, useNavigate } from 'react-router-dom';
import * as UserServices from '../../services/UserServices'
import { useMutationHooks } from '../../hooks/userMutationHook';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/userSlide';

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false); // Sử dụng useState để quản lý trạng thái
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const mutation = useMutationHooks(
        data => UserServices.loginUser(data)
    )
    const { data, isSuccess} = mutation
    
      console.log('mutation', mutation)

      useEffect(() => {
        if (isSuccess) {
            navigate('/')
            localStorage.setItem('access_token', JSON.stringify (data?.access_token))
            if(data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                console.log('decode', decoded)
                if(decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }
        }
        

    }, [isSuccess])
    const handleGetDetailsUser = async (id, token) => {
        const res = await UserServices.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data, access_token: token}))
    }

    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        })
        console.log('sign-in', email, password)
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập hoặc Tạo tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                        onClick={() => setIsShowPassword(!isShowPassword)} // Thay đổi trạng thái khi nhấn vào
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                                cursor: 'pointer' // Thêm cursor để chỉ thị có thể nhấn vào
                            }}
                            
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm placeholder="password" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnchangePassword} />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red'}}>{data?.message}</span>}
                    <ButtonComponent
                        disabled={!email.length || !password.length}
                        onClick={handleSignIn}
                        size={40}
                        styleButton={{ background: 'rgb(255, 57, 69)', height: '48px', width: '100%', border: 'none', margin: '26px 0 10px' }}
                        textButton={'Đăng nhập'}
                        styleTexButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                    <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                    <p>Bạn chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imagelogo} preview={false} alt="image-logo" height="203px" width="203px" />
                    <h3>Mua sắm tại FPT Shop</h3>
                    <h4> Siêu ưu đãi mỗi ngày</h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
};

export default SignInPage;
