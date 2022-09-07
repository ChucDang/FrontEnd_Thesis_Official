// import { Route, Routes } from 'react-router-dom';
import './App.scss';
// import Dashboard from './Components/Dashboard';
// import HomePage from './Components/HomePage';
// import Login from './Components/Login';
// import Index from './Components/PrivatePages';
// import AssignmentView from './Components/AssignmentView';
import NavBarComponent from "./Components/NavBar/NavBarComponent";
// import CarouselComponent from './Components/Casourel/CasourelComponent';
// import ProductComponent from './Components/Product/ProductComponent';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ProductComponent from './Components/Product/ProductComponent';
import LoginComponent from './Components/Login/LoginComponent';
import FooterComponent from './Components/Footer/FooterComponent';
import RegisterComponent from './Components/Register/RegisterComponent';
import CarouselComponent from './Components/NavBar/CarouselComponent';
import ProductDetail from './Components/Product/ProductDetail';
import Loading from './Components/Loading/Loading';
import Cart from './Components/Cart/Cart';
import ADNavbar from './Admin/Components/NavBar/ADNavbar';
import ListUser from './Admin/ListUser/ListUser';
import OrderPage from './Components/OrderPage/OrderPage';
import { useLocalState } from './Services/useLocalStorage';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { useEffect, useState } from 'react';
import { ROLE_ENUM } from './Constants/roles';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import { useLoading } from './Context/LoadingContext';
import StockComponent from './Admin/Stock/StockComponent';
import FlashSale from './Admin/FlashSale/FlashSale';
import ProductAdmin from './Admin/Product/ProductAdmin';
import EditProductAdmin from './Admin/Product/EditProductAdmin';
import Account from './Components/Account/Account';
import StaffNavbar from './Staff/Components/StaffNavbar';
import CustomerOrder from './Staff/Customer_Orders/CustomerOrder';
import Sale from './Components/Sale/Sale';
import Gift from './Components/Gift/Gift';

function App() {
    const loading = useLoading();
    return (
        <div>
            <Routes>


                <Route path="/" element={
                    loading.user && loading.user.authorities[0].authority === ROLE_ENUM.ADMIN ?
                        <>
                            <PrivateRoute >
                                <ADNavbar />
                                <ListUser />

                            </PrivateRoute>


                        </> : loading.user && loading.user.authorities[0].authority === ROLE_ENUM.STAFF ? <>
                            <PrivateRoute >
                                <StaffNavbar />
                                <CustomerOrder />

                            </PrivateRoute>

                        </> : <>

                            <ProductComponent />
                        </>


                }></Route>
                 <Route path='/test' element={
                    <NavBarComponent />
                }></Route>
                <Route path='/order' element={
                    <PrivateRoute>
                        <OrderPage />
                    </PrivateRoute>
                }></Route>
                <Route path="/cart" element={
                    <PrivateRoute>
                        <NavBarComponent />
                        <Cart />
                    </PrivateRoute>

                } />
                <Route path='/register' element={
                    <>
                        <NavBarComponent />
                        <RegisterComponent />
                    </>

                } />

                <Route path="/sale" element={
                    loading.user && (loading.user.authorities[0].authority === ROLE_ENUM.ADMIN || loading.user.authorities[0].authority === ROLE_ENUM.STAFF) ?
                        <>
                            <PrivateRoute >
                                <Sale />

                            </PrivateRoute>


                        </> : <></>
                } />

                <Route path="/gift" element={
                    loading.user && (loading.user.authorities[0].authority === ROLE_ENUM.ADMIN || loading.user.authorities[0].authority === ROLE_ENUM.STAFF) ?
                        <>
                            <PrivateRoute >
                                <Gift />

                            </PrivateRoute>


                        </> : <></>
                } />

                <Route path="/products/category/:categoryCode" element={
                    <>

                        <ProductComponent />

                    </>
                }
                />
                <Route path="/products/product/:productId" element={
                    <>
                        <NavBarComponent />
                        <ProductDetail />
                        <FooterComponent />
                    </>
                }
                />
                <Route path="/account" element={
                    loading.user && loading.user.authorities[0].authority === ROLE_ENUM.ADMIN ? <>
                        <ADNavbar />
                        <Account />
                    </> : loading.user && loading.user.authorities[0].authority === ROLE_ENUM.STAFF ? <>
                        <StaffNavbar />
                        <Account />

                    </> : loading.user && loading.user.authorities[0].authority === ROLE_ENUM.CUSTOMER ? <>
                        <NavBarComponent />
                        <Account />
                    </> : <ErrorPage />



                }
                />

                <Route path='/stock' element={
                    loading.user && (loading.user.authorities[0].authority === ROLE_ENUM.ADMIN || loading.user.authorities[0].authority === ROLE_ENUM.STAFF) ?
                        <PrivateRoute>
                            <StockComponent />
                        </PrivateRoute> :
                        <ErrorPage />
                } />
                <Route path='/admin/product' element={
                    loading.user && loading.user.authorities[0].authority === ROLE_ENUM.ADMIN ?
                        <PrivateRoute>
                            <ProductAdmin />
                        </PrivateRoute> :
                        <ErrorPage />
                } />
                <Route path='/admin/product/create/:id' element={
                    loading.user && loading.user.authorities[0].authority === ROLE_ENUM.ADMIN ?
                        <PrivateRoute>
                            <EditProductAdmin />
                        </PrivateRoute> :
                        <ErrorPage />
                } />


            </Routes >

        </div >
    );
}

export default App;






// function App() {
//
//   return (
//     <Routes>
//       <Route path='/' element={<HomePage />
//       } >
//       </Route>
//
//       <Route path='dashboard' element={
//         <Index>
//           <Dashboard />
//         </Index>}>
//       </Route>
//       <Route path='/assignments/:id' element={<Index>
//         <AssignmentView />
//       </Index>}></Route>
//       <Route path='login' element={<Login />}></Route>
//     </Routes>
//
//   );
// }
//
// export default App;
