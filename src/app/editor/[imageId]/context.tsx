import { RefObject, createContext, useRef, useState } from 'react';

// We store the canvas reference and a flag to indicate when the canvas is ready
// this way it could be used by the imagePreview for rendering and designPanel for download or loading state

export interface CanvasContextProps {
  canvasRef?: RefObject<HTMLCanvasElement>;
  canvasReady: boolean;
  setCanvasReady: (ready: boolean) => void;
}

export const CanvasContext = createContext<CanvasContextProps>({
  canvasReady: false,
  setCanvasReady: () => {},
});

export const CanvasContextProvider = ({ children }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasReady, setCanvasReady] = useState(false);

  return (
    <CanvasContext.Provider value={{ canvasRef, canvasReady, setCanvasReady }}>
      {children}
    </CanvasContext.Provider>
  );
};
