import images from "@/assets/Images";
import { useNavigate, useParams } from "react-router-dom";
import { PiRecordFill } from "react-icons/pi";
import { getGeolocation } from "@/lib/geolocation";
import { useEffect, useState } from "react";
import { Location } from "@/lib/geolocation";
import { useVideoContext } from "@/hooks/useVideoContext";
import { VerifiedAddress } from "@/api/address";
import Spinner from "@/components/Spinner";
import { uploadToCloudinary } from "@/lib/cloudinary";
import axios from "axios";
import { baseUrl } from "@/api/baseUrl";

interface Address {
  id: string,
  address: string,
  country: string,
  lga: string,
  state: string,
  personnelName: string,
  personnelId: string
}

const AddressVettForm = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [landmark, setLandmark] = useState(localStorage.getItem("landmark") || "");
  const [busStop, setBusStop] = useState(localStorage.getItem("busStop") || "");
  const [confirmation, setConfirmation] = useState(localStorage.getItem("confirmation") || "");
  const { video, setVideo } = useVideoContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { personnel_id } = useParams();

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const res = await axios.get(`${baseUrl}/address/${personnel_id}`);
        setAddress(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAddresses();
  }, [personnel_id]);

  useEffect(() => {
    // Save form states to localStorage
    localStorage.setItem("landmark", landmark);
    localStorage.setItem("busStop", busStop);
    localStorage.setItem("confirmation", confirmation);
  }, [landmark, busStop, confirmation]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const videoURL = await uploadToCloudinary(e.target.files[0]);
        if (videoURL) {
          setVideo(videoURL);
          console.log("Video URL saved in context:", videoURL);
        }
      } catch (error) {
        console.error("Error uploading video to Cloudinary:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const personnel = `${address?.personnelName}`;
    const addressId = `${address?.id}`;
    const fieldAgentId = localStorage.getItem("fieldAgentId");

    const location = await new Promise<Location | null>((resolve, reject) => {
      getGeolocation(
        (location, accuracy) => {
          console.log('Latitude:', location.lat, 'Longitude:', location.lon, 'Accuracy:', accuracy);
          resolve(location);
        },
        (errorMessage) => {
          alert(`Error: ${errorMessage}`);
          reject(new Error(errorMessage));
        }
      );
    });

    if (location) {
      const initialLocation: Location[] = JSON.parse(localStorage.getItem('savedLocations') || '[]');

      const newData = {
        personnel,
        addressId,
        fieldAgentId,
        initialLocation,
        finalLocation: location,
        landmark,
        busStop,
        confirmation,
        video
      };

      console.log(newData);
      VerifiedAddress(newData, setIsLoading, navigate);
    } else {
      console.error("Geolocation failed");
    }
  };

  return (
    <div className="min-h-[100svh] py-10">
      <form onSubmit={handleSubmit} className="address w-[90%] max-w-[500px] rounded-2xl mx-auto border-[1px] border-destructive overflow-hidden">
        <div className="h-[70px] flex justify-between items-center bg-destructive gap-10 pr-5">
          <div className="layoff">
            <img src={images.logo} alt="Vettme" className="h-8 pl-5 object-contain" />
          </div>
          <h2 className="text-white font-light text-lg md:text-xl uppercase mt-1">Address Verification Form</h2>
        </div>
        <h3 className="text-xl font-light mb-5 pl-5 pt-5 pb-2 shadow-sm shadow-gray-200 text-white border-b-[1px] border-gray-200">
          Kindly provide required information!
        </h3>
        <div className="p-5 text-slate-100">
          <p>Personnel's Name:</p>
          <div className="pb-2 pl-2 mb-5 mt-2 font-light border-b-[1px] border-l-[1px] text-slate-300">{address?.personnelName}</div>
          <p>Address:</p>
          <div className="pb-2 pl-2 mt-2 font-light border-b-[1px] border-l-[1px] py-2 text-slate-300">
            {address?.address}, {address?.lga}, {address?.state}, {address?.country}
          </div>
        </div>
        <div className="px-5">
          <label htmlFor="landmark" className="text-white text-[14px]">Landmark</label>
          <input
            type="text"
            name="landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            required
            className="w-full text-gray-900 mt-1 mb-5 py-2 px-2 outline-none"
            disabled={isLoading}
          />
          <label htmlFor="busstop" className="text-white text-[14px]">Bus Stop</label>
          <input
            type="text"
            name="busStop"
            value={busStop}
            onChange={(e) => setBusStop(e.target.value)}
            required
            className="w-full text-gray-900 mt-1 mb-5 py-2 px-2 outline-none"
            disabled={isLoading}
          />
          <label className="text-white text-[14px]">Does {address?.personnelName} live here?</label>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <label htmlFor="confirmation1" className="text-white">Yes</label>
              <input
                type="radio"
                name="confirmation"
                id="confirmation1"
                value="Yes"
                checked={confirmation === "Yes"}
                onChange={(e) => setConfirmation(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="confirmation2" className="text-white">No</label>
              <input
                type="radio"
                name="confirmation"
                id="confirmation2"
                value="No"
                checked={confirmation === "No"}
                onChange={(e) => setConfirmation(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <button type="button" onClick={() => navigate('video-recorder')} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 mt-3 pl-3 rounded-full text-gray-900 text-sm font-bold">
            <span>Record Live</span>
            <PiRecordFill className="text-destructive text-4xl" />
          </button>
          <div className="border-t-[1px] mt-5">
            <label htmlFor="video" className="text-white">Upload video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="w-full text-white border-[1px] px-3 rounded-xl my-2 outline-pink-500 placeholder:text-black"
            />
          </div>
          <button type="submit" disabled={!video} className="w-full flex items-center justify-center bg-destructive py-4 mt-2 rounded-xl text-white font-bold hover:bg-red-700">
            {isLoading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressVettForm;

