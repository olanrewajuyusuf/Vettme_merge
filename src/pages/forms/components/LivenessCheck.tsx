import React, { useState, useRef, useEffect, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { performLivenessCheck } from '@/api/dojahLivenessCheck'; // Assuming this function exists
import FaceIndicator from './FaceIndicator';
import images from '@/assets/Images';
import { TbBulbFilled, TbSunglassesFilled } from 'react-icons/tb';
import { LucideScanFace } from 'lucide-react';

const LiveCameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [livenessFailed, setLivenessFailed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();

  // Correct usage of useTransition: isPending comes first, then startTransition
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error(err);
        setError('Failed to access the camera. Please allow camera permissions.');
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) {
      setError('Camera or canvas not available.');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      setError('Failed to get canvas context.');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setError('Failed to capture photo.');
        return;
      }

      const file = new File([blob], 'capture.png', { type: 'image/png' });

      try {
        setIsLoading(true);
        
        // Start transition, but do not wrap the async function inside it
        startTransition(() => {
          performLivenessCheck(file)
            .then(response => {
              const livenessConfidence = response.entity.liveness.liveness_probability;

              if (livenessConfidence > 50) {
                setResult(`Liveness check successful! Confidence: ${livenessConfidence}`);
                localStorage.setItem('livenessConfidence', livenessConfidence.toString());
                setLivenessFailed(false);
                setTimeout(() => {
                  navigate(-1);  // Navigate back after success
                }, 5000);
              } else {
                setResult(`Liveness check failed. Confidence: ${livenessConfidence}. Please try again.`);
                setLivenessFailed(true);
              }
            })
            .catch(err => {
              setError('Error performing liveness check.');
              console.error(err)
            })
            .finally(() => {
              setIsLoading(false);  // Stop loading spinner
              setCountdown(null);
              setIsCapturing(false);
            });
        });
      } catch (err) {
        console.error(err);
        setError('Error performing liveness check.');
        setIsCapturing(false);
      }
    }, 'image/png');
  };

  const handleStartOrRestart = () => {
    if (isCapturing) return;

    setIsCapturing(true);
    setCountdown(5);
    let count = 5;
    const countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownInterval);
        capturePhoto();
      }
    }, 1000);
  };
  console.log(countdown)

  return (
    <div className="text-center max-w-[500px] p-5 mx-auto">
      <h1>Liveness Check</h1>
      <div className='w-[150px] h-[150px] relative rounded-lg bg-red-300 mt-8 mb-5 mx-auto overflow-hidden'>
        <img src={images.avatar} alt="avatar"  className='w-full h-[170px]'/>
        <div className='w-[100px] h-[100px] absolute top-0 left-1/2 -translate-x-1/2 rounded-full overflow-hidden'>
          <div className='w-[230px] h-[230px] absolute -bottom-20% left-1/2 -translate-x-1/2 -mt-[95px]'>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className='w-full h-full'
            />
          </div>
        </div>
        {isCapturing && <FaceIndicator />}
      </div>

      {isLoading && <div>Loading...</div>}  {/* Show loader while async task is in progress */}

      {/* Show pending state */}
      {isPending && !isLoading && <div>Processing your request...</div>}  {/* This shows when the transition is pending */}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {result && <p>{result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="w-full text-left text-sm bg-gray-200 p-5 mx-auto my-5 rounded-lg">
        <h3>We recommend that you...</h3>
        <ul>
          <li className="flex items-center gap-3 mt-5 mb-3">
            <TbBulbFilled className="bg-white w-7 h-7 p-1 rounded-full text-red-400" />
            <span>Stay in a well lit environment</span>
          </li>
          <li className="flex items-center gap-3 mb-2">
            <LucideScanFace className="bg-white w-7 h-7 p-1 rounded-full text-red-400" />
            <span>Your face is inside the frame</span>
          </li>
          <li className="flex items-center gap-3">
            <TbSunglassesFilled className="bg-white w-7 h-7 aspect-square p-1 rounded-full text-red-400" />
            <span className="w-[90%]">Remove sun glasses, hats, face masks, and any other face coverings</span>
          </li>
        </ul>
      </div>

      <div>
        <button onClick={handleStartOrRestart} disabled={isCapturing} className="text-sm bg-red-400 text-white px-5 py-2 rounded-full hover:bg-red-500 active:bg-red-500">
          {livenessFailed ? 'Restart Liveness Check' : 'Start Liveness Check'}
        </button>
      </div>
    </div>
  );
};

export default LiveCameraCapture;
