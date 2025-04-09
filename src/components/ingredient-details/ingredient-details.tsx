// src/components/ingredient-details/ingredient-details.tsx
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '@ui';
import { selectIngredients, selectSelectedIngredient } from '@selectors';
import { setSelectedIngredient, clearSelectedIngredient } from '../../services/slices/ingredients-slice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const ingredients = useSelector(selectIngredients) as TIngredient[];
  const ingredientData = useSelector(selectSelectedIngredient);
  
  useEffect(() => {
    if (id && ingredients.length) {
      const ingredient = ingredients.find(item => item._id === id);
      if (ingredient) {
        dispatch(setSelectedIngredient(ingredient));
      }
    }
    
    // Czyszczenie przy odmontowaniu komponentu
    return () => {
      dispatch(clearSelectedIngredient());
    };
  }, [id, ingredients, dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};