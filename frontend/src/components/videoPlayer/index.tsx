import { useState, useEffect, useRef, MouseEvent } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import formatDuration from "format-duration";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
import Button from "../button";
type VideoPlayerProps = {
  videoUrl?: string;
};

interface OnProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const [showSpeedChanger, setShowSpeedChanger] = useState<boolean>(false);
  const [playerProps, setPlayerProps] = useState<ReactPlayerProps>({
    url: videoUrl ? videoUrl : "https://vimeo.com/839448490?share=copy",
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  });

  const handlePlay = () => {
    setPlayerProps({ ...playerProps, playing: true });
  };
  const handlePause = () => {
    setPlayerProps({ ...playerProps, playing: false });
  };

  const handlePlayPause = () => {
    console.log(playerProps.playing);

    setPlayerProps({ ...playerProps, playing: !playerProps.playing });
  };
  const handleDuration = (e: number) => {
    setPlayerProps({ ...playerProps, duration: e });
  };

  const handleSeekMouseDown = () => {
    setPlayerProps({ ...playerProps, seeking: true });
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerProps({ ...playerProps, played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e: MouseEvent<HTMLInputElement>) => {
    setPlayerProps({ ...playerProps, seeking: false });
    playerRef.current?.seekTo(parseFloat((e.target as HTMLInputElement).value));
  };

  const handleProgress = (state: OnProgressProps): void => {
    if (!playerProps.seeking) {
      setPlayerProps({ ...playerProps, played: state.played });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerProps({ ...playerProps, volume: parseFloat(e.target.value) });
  };

  const handleVolumeToggle = (state: string) => {
    setPlayerProps({ ...playerProps, volume: state === "mute" ? 0 : 0.8 });
  };

  const handleClickFullscreen = () => {
    screenfull.request(findDOMNode(playerContainerRef.current) as Element);
  };

  const handleSetPlaybackRate = (e: MouseEvent<HTMLButtonElement>) => {
    setPlayerProps({
      ...playerProps,
      playbackRate: parseFloat((e.currentTarget as HTMLButtonElement).value),
    });
  };

  const handleOnPlaybackRateChange = (speed: string) => {
    setPlayerProps({
      ...playerProps,
      playbackRate: parseFloat(speed),
    });
  };

  let timeoutId: number;
  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setShowControls(false);
  };

  // const handleMouseEnter = () => {
  //   setShowControls(true);
  //   clearTimeout(timeoutId);
  //   timeoutId = setTimeout(() => {
  //     setShowControls(false);
  //   }, 3000);
  // };

  const handleMouseMove = () => {
    if (!showControls) {
      setShowControls(true);
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div
      ref={playerContainerRef}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      // onMouseEnter={handleMouseEnter}
      className="w-full h-full relative pt-[56.25%]"
    >
      {showControls && (
        <div className="absolute h-full justify-end bottom-0 w-full z-10 flex flex-col px-[12px]">
          <input
            className="accent-red-500"
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={playerProps.played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
          <div className="flex items-center justify-between pb-[17px] pt-[12px] px-[23px] text-neutral-300">
            <div className="flex items-center space-x-[20px]">
              <div onClick={handlePlayPause} className="cursor-pointer">
                {playerProps.playing ? (
                  <PauseOutlinedIcon />
                ) : (
                  <PlayArrowIcon />
                )}
              </div>
              <div className="cursor-pointer">
                <SkipNextIcon />
              </div>
              <div
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="flex items-center gap-3"
              >
                {playerProps.volume ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleVolumeToggle("mute")}
                  >
                    <VolumeUpIcon />
                  </div>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleVolumeToggle("unmute")}
                  >
                    <VolumeOffIcon />
                  </div>
                )}
                <input
                  className={`${
                    showVolumeSlider ? "flex" : "hidden"
                  } accent-neutral-300 `}
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={playerProps.volume}
                  onChange={handleVolumeChange}
                />
              </div>
              <div className="">
                <p className="p3-r">
                  {formatDuration(
                    1000 * playerProps.played * playerProps.duration
                  )}{" "}
                  / {formatDuration(1000 * playerProps.duration)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-[20px]">
              <div
                onMouseEnter={() => setShowSpeedChanger(true)}
                onMouseLeave={() => setShowSpeedChanger(false)}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <div className="">
                  <SlowMotionVideoIcon />
                </div>
                <div
                  className={`${
                    showSpeedChanger ? "flex" : "hidden"
                  } flex items-center space-x-3 `}
                >
                  <button
                    value={1}
                    onClick={handleSetPlaybackRate}
                    className=""
                  >
                    <Button title="1x" type="solid" />
                  </button>
                  <button
                    value={1.5}
                    onClick={handleSetPlaybackRate}
                    className=""
                  >
                    <Button title="1.5x" type="solid" />
                  </button>
                  <button
                    value={2}
                    onClick={handleSetPlaybackRate}
                    className=""
                  >
                    <Button title="2x" type="solid" />
                  </button>
                </div>
              </div>
              <div onClick={handleClickFullscreen} className="cursor-pointer">
                <FullscreenIcon />
              </div>
            </div>
          </div>
        </div>
      )}
      <ReactPlayer
        ref={playerRef}
        className="absolute top-0 left-0 z-[9]"
        width="100%"
        height="100%"
        url={playerProps.url}
        playing={playerProps.playing}
        light={playerProps.light}
        playbackRate={playerProps.playbackRate}
        volume={playerProps.volume}
        onPlay={handlePlay}
        muted={playerProps.muted}
        onPause={handlePause}
        onPlaybackRateChange={handleOnPlaybackRateChange}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
    </div>
  );
};

export default VideoPlayer;
