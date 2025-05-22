import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const images = ["/Image2.png", "/Image3.png", "/Image4.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [images.length]);

  return (
    <div className="w-full h-screen bg-gray-100 m-0 p-0">
      <div className="flex w-full h-full">
        {/* Left - Text */}
        <div className="w-1/2 flex flex-col justify-center px-10 bg-gray-100">
          <h1 className="text-5xl font-bold text-black leading-tight">
            Welcome to AI TUNE ROOM
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Unleash the Power of Music with AI Tune Room: Your Ultimate Music Experience
          </p>
          <button
            className="mt-6 mr-10 w-fit px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition"
            onClick={handleGetStarted}
          >
            Create Room
          </button>
        </div>
        
        {/* Right - Full Height Carousel Image with No Margin */}
        <div className="w-1/2 h-auto">
          <img
            src={images[currentImageIndex]}
            alt="Tune Room Slide"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
