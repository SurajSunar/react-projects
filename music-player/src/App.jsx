import {
  Pause,
  Play,
  Plus,
  SkipBack,
  SkipForward,
  Volume,
  Volume2Icon,
  VolumeOff,
} from "lucide-react";
import WavesurferPlayer from "@wavesurfer/react";
import { useState } from "react";

const App = () => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState("sample.mp3");
  const [filename, setFilename] = useState("sample.mp3");
  const [duration, setDuration] = useState("00:00:00");
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [mute, setMute] = useState(false);

  const onReady = (ws) => {
    setWavesurfer(ws);
    setIsPlaying(false);
    ws.on("audioprocess", (time) => {
      setCurrentTime(timeFormatter(time));
    });
    console.log(ws.getDuration());

    setDuration(timeFormatter(ws.getDuration()));
  };

  const timeFormatter = (time) => {
    //time in sec
    if (!time) return;
    const h = Math.floor(time / (60 * 60))
      .toString()
      .padStart(2, "0");
    const m = Math.floor((time % (60 * 60)) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  const playBack = () => {
    wavesurfer && wavesurfer.skip(-10);
  };

  const playForward = () => {
    wavesurfer && wavesurfer.skip(10);
  };

  const fileSelect = () => {
    const element = document.createElement("input");
    element.type = "file";
    element.accept = "audio/*";
    element.click();
    element.onchange = (event) => {
      const file = event.target.files[0];
      setFilename(file.name);
      const uri = URL.createObjectURL(file);
      setUrl(uri);
    };
  };

  const handleMute = () => {
    const mute = wavesurfer.getMuted();
    wavesurfer.setMuted(!mute);
    setMute(!mute);
  };

  return (
    <div className="bg-rose-50 h-screen flex flex-col lg:flex-row justify-center items-center">
      <div className="w-full lg:w-4xl rounded-xl bg-rose-600 bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500">
        <div className="px-8 py-6 border-b border-rose-300 flex flex-col lg:flex-row justify-between items-center gap-y-4">
          <marquee className="w-2/3">
            <h1 className="text-xl font-semibold text-white capitalize">
              Song launched: {filename}
            </h1>
          </marquee>
          <label className="text-white ">
            {currentTime} / {duration}
          </label>
        </div>
        <div className="bg-rose-100 p-4">
          <WavesurferPlayer
            height={100}
            waveColor="black"
            url={url}
            onReady={onReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
        <div className="px-8 py-6 border-t border-rose-300 flex justify-center items-center gap-8">
          <div
            onClick={fileSelect}
            className="w-10 h-10 rounded-full bg-rose-50 flex justify-center items-center hover:scale-110 hover:duration-200 cursor-pointer"
          >
            <Plus />
          </div>
          <div
            onClick={playBack}
            className="w-10 h-10 rounded-full bg-rose-50 flex justify-center items-center hover:scale-110 hover:duration-200 cursor-pointer"
          >
            <SkipBack />
          </div>
          <div
            onClick={onPlayPause}
            className="w-16 h-16 rounded-full bg-rose-50 flex justify-center items-center hover:scale-110 hover:duration-200 cursor-pointer"
          >
            {isPlaying ? <Pause /> : <Play />}
          </div>
          <div
            onClick={playForward}
            className="w-10 h-10 rounded-full bg-rose-50 flex justify-center items-center hover:scale-110 hover:duration-200 cursor-pointer"
          >
            <SkipForward />
          </div>
          <div
            onClick={handleMute}
            className="w-10 h-10 rounded-full bg-rose-50 flex justify-center items-center hover:scale-110 hover:duration-200 cursor-pointer"
          >
            {mute ? <VolumeOff /> : <Volume2Icon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
