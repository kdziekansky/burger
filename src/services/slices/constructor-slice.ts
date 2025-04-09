// src/services/slices/constructor-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = action.payload;
      const constructorIngredient = {
        ...ingredient,
        id: uuidv4()
      };

      if (ingredient.type === 'bun') {
        state.bun = constructorIngredient;
      } else {
        state.ingredients.push(constructorIngredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.ingredients = state.ingredients.filter(item => item.id !== id);
    },
    moveIngredient: (state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragItem = state.ingredients[dragIndex];
      const newIngredients = [...state.ingredients];
      
      // Usuwamy element z dragIndex i wstawiamy go na hoverIndex
      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, dragItem);
      
      state.ingredients = newIngredients;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;