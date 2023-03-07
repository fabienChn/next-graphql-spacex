import { createContext, ReactNode } from 'react';
import { User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

interface GlobalState {
  authenticatedUser?: User | null; 
  isLoadingAuth: boolean;
}

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateContext = createContext<GlobalState>({
  authenticatedUser: undefined,
  isLoadingAuth: false,
});

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps): JSX.Element => {
  const [authenticatedUser, isLoadingAuth] = useAuthState(auth);

  return (
    <GlobalStateContext.Provider value={{ authenticatedUser, isLoadingAuth }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
