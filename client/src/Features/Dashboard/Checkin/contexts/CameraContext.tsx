// component for state managment
import React, { createContext, useContext, useState } from 'react';

interface CameraContextType {
  cameraId: string | null;
  cameras: MediaDeviceInfo[];
  switchCamera: () => void;
  setAvailableCameras: (cameras: MediaDeviceInfo[]) => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const CameraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cameraId, setCameraId] = useState<string | null>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

  const switchCamera = () => {
    if (cameras.length <= 1) return;

    const nextIndex = (currentCameraIndex + 1) % cameras.length;
    setCurrentCameraIndex(nextIndex);
    setCameraId(cameras[nextIndex].deviceId);
  };

  const setAvailableCameras = (newCameras: MediaDeviceInfo[]) => {
    setCameras(newCameras);
    if (newCameras.length > 0 && !cameraId) {
      setCameraId(newCameras[0].deviceId);
    }
  };

  return (
    <CameraContext.Provider value={{ cameraId, cameras, switchCamera, setAvailableCameras }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (context === undefined) {
    throw new Error('useCamera must be used within a CameraProvider');
  }
  return context;
};
