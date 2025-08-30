import React from 'react';
import { FiCamera, FiRefreshCw } from 'react-icons/fi';
import { useCamera } from '../contexts/CameraContext';


const CheckinHeader: React.FC<{}> =  () => {

  const { switchCamera, cameras } = useCamera();

    const hasMultipleCameras = cameras.length > 1;


      return (
        <header className="flex-shrink-0 flex items-center justify-between">
              <div>
                    <h1 className="text-3xl font-bold text-gray-800">Check-in Terminal</h1>
                    <p className="text-gray-500 mt-1">Point the camera at an attendee's QR code.</p>
              </div>

              <button
                     onClick={switchCamera}
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
