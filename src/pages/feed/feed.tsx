// src/pages/feed/feed.tsx
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { getFeeds } from '../../services/slices/feed-slice';
import { selectFeedOrders, selectFeedLoading } from '@selectors';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  
  useEffect(() => {
    dispatch(getFeeds());
    
    // Opcjonalnie możemy ustawić interwał do odświeżania danych
    const interval = setInterval(() => {
      dispatch(getFeeds());
    }, 30000); // co 30 sekund
    
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};