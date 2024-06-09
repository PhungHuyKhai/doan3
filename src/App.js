import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { updateUser } from './redux/slices/userSlide';
import * as UserService from './services/UserServices';
import { jwtDecode } from 'jwt-decode';
import { isJsonString } from './utils';


function App() {

  useEffect(() => {
    let storageData =  localStorage.getItem('access_token')
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
    }
    console.log('storageData',storageData)
  })

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData); // Sử dụng jwtDecode thay vì jwt_decode
    }
    return { decoded, storageData };
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const isCheckAuth = !route.isPrivate || user.isAdmin;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;

            // Kiểm tra route.path trước khi sử dụng
            if (typeof route.path !== 'string') {
              console.error('route.path không phải là chuỗi:', route.path);
              return null; // Bỏ qua route này nếu path không hợp lệ
            }

            return (
              <Route
                key={route.path}
                path={isCheckAuth ? route.path : '/'}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
