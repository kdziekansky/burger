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
} from '@selectors';
import { clearOrder, createOrder } from '../../services/slices/order-slice';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const constructorItems = useSelector(selectConstructorItems) as {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  const price = useSelector(selectTotalPrice) as number;
  const orderRequest = useSelector(selectOrderLoading) as boolean;
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