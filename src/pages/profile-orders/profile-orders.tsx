// src/pages/profile-orders/profile-orders.tsx
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { getProfileOrders } from '../../services/slices/profile-orders-slice';
import { selectProfileOrders } from '@selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  
  useEffect(() => {
    dispatch(getProfileOrders());
    
    // Opcjonalnie: interwał do odświeżania danych
    const interval = setInterval(() => {
      dispatch(getProfileOrders());
    }, 30000); // co 30 sekund
    
    return () => clearInterval(interval);
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};