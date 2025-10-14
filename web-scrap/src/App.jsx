import React, { useState } from "react";
import "animate.css";
import axios from "axios";
import { Loader2 } from "lucide-react";

const App = () => {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/images", {
        url,
      });
      setImages([...response.data.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-300 via-orange-200 to-orange-100 min-h-screen">
      <div className="w-3/4 mx-auto flex flex-col items-center gap-y-4">
        <h1 className="text-2xl ">Image Scraper</h1>
        <div className="flex gap-2  w-1/2 p-2">
          <input
            className="rounded-lg border flex-1 border-gray-400 px-4"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
             disabled={loading || !url}
            className="bg-blue-800 text-white rounded-lg px-4 py-2 disabled:bg-gray-600 disabled:cursor-not-allowed cursor-pointer"
            onClick={fetchImages}
          >
            Get Images
          </button>
        </div>
        {loading ? (
          <Loader2 className="mt-6 w-10 h-10 animate-spin text-orange-400" />
        ) : (
          <div className="grid grid-cols-4 gap-4 w-full">
            {images.map((image, index) => (
              <div
                key={index}
                className="bg-orange-00 rounded flex flex-col hover:scale-105 duration-200"
              >
                <img
                  src={image.src}
                  className="w-full h-[200px] object-cover rounded-t-lg"
                />
                <a
                  href={image.src}
                  target="_blank"
                  className="bg-green-500 hover:bg-green-400 cursor-pointer text-white rounded px-4 py-2 mt-4 text-center"
                  download={image.src}
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
