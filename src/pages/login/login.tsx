// src/pages/login/login.tsx
import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { LoginUI } from '@ui-pages';
import { loginUser, clearError } from '../../services/slices/user-slice';
import { selectUserLoading, selectUserError, selectUser } from '@selectors';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const user = useSelector(selectUser);
  
  // Efekt po pomyślnym zalogowaniu
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    }
  }, [user, navigate, location]);
  
  // Czyszczenie błędów przy wyjściu
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};