import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imagelogo from '../../assets/images/sign-in.png'
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserServices from '../../services/UserServices'
import { useMutationHooks } from '../../hooks/userMutationHook'
import * as message from '../../components/Message/Message'

const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleOnchangeEmail = (value) => {
        setEmail(value);
    }
   

    const mutation = useMutationHooks(
        data => UserServices.signupUser(data)
    )
    const { data, isSuccess, isError} = mutation

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleNavigateSignIn()
        }else if(isError) {
            message.error()
        }

    }, [isSuccess, isError])

    const handleOnchangePassword = (value) => {
        setPassword(value);
    }
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value);
    }

    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }

    const handleSignUp = () => {
        mutation.mutate({email, password, confirmPassword})

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
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                                cursor: 'pointer'
                            }}
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm placeholder="password" type={isShowPassword ? "text" : "password"}
                        value={password} onChange={handleOnchangePassword} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                                cursor: 'pointer'
                            }}
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                        >
                            {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm placeholder="confirm password" type={isShowConfirmPassword ? "text" : "password"}
                        value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red'}}>{data?.message}</span>}
                    <ButtonComponent
                    disabled={!email.length || !password.length || !confirmPassword.length}
                    onClick= {handleSignUp}
                        size={40}
                        styleButton={{ background: 'rgb(255, 57, 69)', height: '48px', width: '100%', border: 'none', margin: '26px 0 10px' }}
                        textButton={'Đăng ký'}
                        styleTexButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                    <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
                    <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></p>
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

export default SignUpPage;
