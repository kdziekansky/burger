// src/pages/profile/profile.tsx
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser, clearUpdateError, getUser } from '@services/slices/user-slice';;
import { selectUser, selectUserLoading, selectUpdateUserError, selectUserLoaded } from '@services/selectors';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserLoading);
  const updateUserError = useSelector(selectUpdateUserError);
  const isUserLoaded = useSelector(selectUserLoaded);
  
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  
  // Pobieramy dane użytkownika, jeśli nie są załadowane
  useEffect(() => {
    if (!isUserLoaded) {
      dispatch(getUser());
    }
  }, [dispatch, isUserLoaded]);
  
  // Aktualizujemy formularz, gdy dane użytkownika się zmienią
  useEffect(() => {
    if (user) {
      setFormValue((prevState) => ({
        ...prevState,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);
  
  // Czyszczenie błędów przy wyjściu
  useEffect(() => {
    return () => {
      dispatch(clearUpdateError());
    };
  }, [dispatch]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isLoading || !isFormChanged) return;
    
    const updateData: { name?: string; email?: string; password?: string } = {};
    
    if (formValue.name !== user?.name) updateData.name = formValue.name;
    if (formValue.email !== user?.email) updateData.email = formValue.email;
    if (formValue.password) updateData.password = formValue.password;
    
    dispatch(updateUser(updateData));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};