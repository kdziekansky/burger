// src/components/app/app.tsx
import { FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../services/store';
import { ConstructorPage, Feed, Login, Register, ForgotPassword, ResetPassword, Profile, ProfileOrders, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUser } from '@services/slices/user-slice';;
import { selectUserLoaded } from '@services/selectors';
import { Preloader } from '@ui';

// Komponenty do renderowania w modalach
const ModalSwitch: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Sprawdzanie, czy mamy przekazany stan background z poprzedniej lokalizacji
  const background = location.state && location.state.background;
  
  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderInfo />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        
        <Route path="/login" element={
          <ProtectedRoute anonymous={true}>
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute anonymous={true}>
            <Register />
          </ProtectedRoute>
        } />
        <Route path="/forgot-password" element={
          <ProtectedRoute anonymous={true}>
            <ForgotPassword />
          </ProtectedRoute>
        } />
        <Route path="/reset-password" element={
          <ProtectedRoute anonymous={true}>
            <ResetPassword />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/profile/orders" element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        } />
        <Route path="/profile/orders/:number" element={
          <ProtectedRoute>
            <OrderInfo />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {/* Modalne okna */}
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={
            <Modal title="Детали ингредиента" onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          } />
          <Route path="/feed/:number" element={
            <Modal title="Информация о заказе" onClose={handleModalClose}>
              <OrderInfo />
            </Modal>
          } />
          <Route path="/profile/orders/:number" element={
            <ProtectedRoute>
              <Modal title="Информация о заказе" onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          } />
        </Routes>
      )}
    </>
  );
};

const App: FC = () => {
  const dispatch = useDispatch();
  const isUserLoaded = useSelector(selectUserLoaded);
  
  // Sprawdzanie tokenu i pobieranie danych użytkownika przy starcie
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  
  // Wyświetlanie loadera dopóki nie sprawdzimy, czy użytkownik jest zalogowany
  if (!isUserLoaded) {
    return (
      <div className={styles.app}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <ModalSwitch />
      </BrowserRouter>
    </div>
  );
};

export default App;