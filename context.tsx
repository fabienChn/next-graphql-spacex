import { createContext, ReactNode, useState } from 'react';

interface GlobalState {
  name: string; 
  setName: (name: string) => void
}

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateContext = createContext<GlobalState>({
  name: '',
  setName: () => null,
});

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps): JSX.Element => {
  const [name, setName] = useState('Fabien');

  return (
    <GlobalStateContext.Provider value={{ name, setName }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
