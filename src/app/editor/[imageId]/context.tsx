import { RefObject, createContext, useRef } from 'react';

export interface CanvasContextProps {
  canvasRef?: RefObject<HTMLCanvasElement>;
}

export const CanvasContext = createContext<CanvasContextProps>({});

export const CanvasContextProvider = ({ children }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <CanvasContext.Provider value={{ canvasRef }}>
      {children}
    </CanvasContext.Provider>
  );
};
