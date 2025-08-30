import React from 'react';
import { FiCamera, FiRefreshCw } from 'react-icons/fi';
import { useCamera } from '../contexts/CameraContext';


const CheckinHeader: React.FC<{}> =  () => {

  const { switchCamera, cameras } = useCamera();

    const hasMultipleCameras = cameras.length > 1;

    /*  To be used at the settings page info
    const currentCamera = cameras.find(cam => cam.deviceId === cameraId); */


    const handleSwitchCamera = () => {
   console.log('🖱️ Camera switch button clicked');
   console.log('📊 Available cameras:', cameras.length);

   if (!hasMultipleCameras) {
     console.warn('🚫 Cannot switch: Only one camera available');
     return;
   }

   try {
     switchCamera();
     console.log('✅ Camera switch initiated');
   } catch (error) {
     console.error('❌ Error switching camera:', error);
   }
 };

 return (
   <header className="flex-shrink-0 flex items-center justify-between">
     <div>
       <h1 className="text-3xl font-bold text-gray-800">Check-in Terminal</h1>

     {/* to be show at the settings info
          {import.meta.env.DEV && (
             <div className="text-xs text-gray-400 mt-1">
                   <p>Cameras: {cameras.length} | Current: {currentCamera?.label || 'default'}</p>
                   <p>Device ID: {cameraId ? `${cameraId.substring(0, 10)}...` : 'none'}</p>
             </div>
          )} */}
     </div>
     <button
       onClick={handleSwitchCamera}
       disabled={!hasMultipleCameras}
       className={`p-3 border shadow-sm rounded-lg flex items-center gap-2 ${
         hasMultipleCameras
           ? 'bg-white hover:bg-gray-100 text-gray-600 cursor-pointer'
           : 'bg-gray-100 text-gray-400 cursor-not-allowed'
       }`}
       title={hasMultipleCameras ? 'Switch camera' : 'Only one camera available'}
     >
       <FiCamera className="w-5 h-5" />
       {hasMultipleCameras && <FiRefreshCw className="w-4 h-4" />}
     </button>
   </header>
 );
};

export default CheckinHeader;
