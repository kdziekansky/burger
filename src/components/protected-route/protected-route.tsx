// src/components/protected-route/protected-route.tsx
import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser, selectUserLoaded } from '@services/selectors';

interface IProtectedRouteProps {
  children: ReactNode;
  anonymous?: boolean;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ children, anonymous = false }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const isUserLoaded = useSelector((state) => state.user.isUserLoaded);

  // Oczekujemy na załadowanie danych użytkownika
  if (!isUserLoaded) {
    return null; // lub jakiś komponent ładowania
  }

  // Dla tras tylko dla nieautoryzowanych użytkowników (login, register, itp.)
  if (anonymous && user) {
    // Przekierowanie do głównej lub do poprzedniej strony
    const from = location.state?.from || '/';
    return <Navigate to={from} />;
  }

  // Dla tras chronionych wymagających autoryzacji
  if (!anonymous && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Jeśli wszystko ok, renderujemy dzieci
  return <>{children}</>;
};