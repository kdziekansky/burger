// src/components/burger-constructor/burger-constructor.tsx
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerConstructorUI } from '@ui';
import { 
  selectConstructorItems, 
  selectTotalPrice,
  selectOrderLoading,
  selectOrder,
  selectUser
} from '@services/selectors';
import { clearOrder, createOrder } from '../../services/slices/order-slice';
import { selectConstructorItems, selectTotalPrice, selectOrderLoading, selectOrder, selectUser } from '@services/selectors';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const constructorItems = useSelector(selectConstructorItems);
  const price = useSelector(selectTotalPrice);
  const orderRequest = useSelector(selectOrderLoading);
  const orderModalData = useSelector(selectOrder);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(item => item._id),
      constructorItems.bun._id
    ];
    
    dispatch(createOrder(ingredientsIds));
  };
  
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};