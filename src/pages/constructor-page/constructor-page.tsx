// src/pages/constructor-page/constructor-page.tsx
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ConstructorPageUI } from '@ui-pages';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { selectIngredientsLoading } from '@services/selectors';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};