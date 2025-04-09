// src/services/selectors/index.ts
import { RootState } from '../store';
import { TIngredient, TConstructorIngredient, TTabMode } from '@utils-types';

// Ingredients selectors
export const selectIngredients = (state: RootState): TIngredient[] => state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState): boolean => state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState): string | null => state.ingredients.error;
export const selectSelectedIngredient = (state: RootState): TIngredient | null => state.ingredients.selectedIngredient;

export const selectBuns = (state: RootState): TIngredient[] => 
  state.ingredients.ingredients.filter(item => item.type === 'bun');

export const selectMains = (state: RootState): TIngredient[] => 
  state.ingredients.ingredients.filter(item => item.type === 'main');

export const selectSauces = (state: RootState): TIngredient[] => 
  state.ingredients.ingredients.filter(item => item.type === 'sauce');

// Constructor selectors
export const selectConstructorBun = (state: RootState): TConstructorIngredient | null => state.burgerConstructor.bun;
export const selectConstructorIngredients = (state: RootState): TConstructorIngredient[] => state.burgerConstructor.ingredients;

export const selectConstructorItems = (state: RootState) => ({
  bun: state.burgerConstructor.bun,
  ingredients: state.burgerConstructor.ingredients
});

export const selectTotalPrice = (state: RootState): number => {
  const bunPrice = state.burgerConstructor.bun ? state.burgerConstructor.bun.price * 2 : 0;
  const ingredientsPrice = state.burgerConstructor.ingredients.reduce((sum, item) => sum + item.price, 0);
  return bunPrice + ingredientsPrice;
};

// Order selectors
export const selectOrder = (state: RootState) => state.order.order;
export const selectOrderLoading = (state: RootState) => state.order.isLoading;
export const selectOrderError = (state: RootState) => state.order.error;

// User selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUpdateUserError = (state: RootState) => state.user.updateUserError;
export const selectUserLoaded = (state: RootState) => state.user.isUserLoaded;

// Feed selectors
export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;
export const selectFeedLoading = (state: RootState) => state.feed.isLoading;
export const selectFeedError = (state: RootState) => state.feed.error;

export const selectFeedData = (state: RootState) => ({
  orders: state.feed.orders,
  total: state.feed.total,
  totalToday: state.feed.totalToday
});

// Profile orders selectors
export const selectProfileOrders = (state: RootState) => state.profileOrders.orders;
export const selectProfileOrdersLoading = (state: RootState) => state.profileOrders.isLoading;
export const selectProfileOrdersError = (state: RootState) => state.profileOrders.error;