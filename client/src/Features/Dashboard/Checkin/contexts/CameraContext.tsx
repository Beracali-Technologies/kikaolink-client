import React, { createContext, useContext, useState, useEffect } from 'react';

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
    console.log('🔁 Switch camera button clicked');

    if (cameras.length <= 1) {
      console.warn('⚠️ Cannot switch cameras: Only', cameras.length, 'camera(s) available');
      return;
    }

    const nextIndex = (currentCameraIndex + 1) % cameras.length;
    console.log('🔄 Switching from camera', currentCameraIndex, 'to', nextIndex);
    console.log('📷 New camera deviceId:', cameras[nextIndex].deviceId);
    console.log('📷 New camera label:', cameras[nextIndex].label);

    setCurrentCameraIndex(nextIndex);
    setCameraId(cameras[nextIndex].deviceId);

    console.log('✅ Camera switched successfully');
  };


  useEffect(() => {
  const initializeCameras = async () => {
    try {
      // Request camera permission first
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());

      // Then enumerate devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      setCameras(videoDevices);
      if (videoDevices.length > 0 && !cameraId) {
        // Prefer back camera (environment facing) if available
        const backCamera = videoDevices.find(device =>
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('rear')
        );
        setCameraId(backCamera ? backCamera.deviceId : videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error('Error initializing cameras:', error);
    }
  };

  initializeCameras();
}, []);



  const setAvailableCameras = (newCameras: MediaDeviceInfo[]) => {
    console.log('📸 Available cameras detected:', newCameras.length);
    newCameras.forEach((cam, index) => {
      console.log(`   ${index + 1}. ${cam.label || 'Unnamed Camera'} (${cam.deviceId})`);
    });

    setCameras(newCameras);
    if (newCameras.length > 0 && !cameraId) {
      console.log('🎥 Setting initial camera:', newCameras[0].deviceId);
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
