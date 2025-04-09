// src/components/order-info/order-info.tsx
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { selectIngredients, selectFeedOrders, selectProfileOrders } from '@selectors';
import { getFeeds } from '../../services/slices/feed-slice';
import { getProfileOrders } from '../../services/slices/profile-orders-slice';
import { TIngredient, TOrder } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  
  const ingredients = useSelector(selectIngredients) as TIngredient[];
  const feedOrders = useSelector(selectFeedOrders) as TOrder[];
  const profileOrders = useSelector(selectProfileOrders) as TOrder[];
  
  useEffect(() => {
    // Jeśli nie mamy zamówień, pobieramy je
    if (!feedOrders.length) {
      dispatch(getFeeds());
    }
    if (!profileOrders.length) {
      dispatch(getProfileOrders());
    }
  }, [dispatch, feedOrders.length, profileOrders.length]);
  
  // Szukamy zamówienia albo w feed, albo w profile
  const orderData = useMemo(() => {
    const parsedNumber = parseInt(number || '0');
    return [...feedOrders, ...profileOrders].find(
      (order) => order.number === parsedNumber
    );
  }, [number, feedOrders, profileOrders]);

  /* Gotujemy dane dla wyświetlenia */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};