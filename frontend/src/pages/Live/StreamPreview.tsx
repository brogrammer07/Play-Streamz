import { FC, useRef, useState, useEffect } from "react";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import ScreenShareOutlinedIcon from "@mui/icons-material/ScreenShareOutlined";
import StopScreenShareOutlinedIcon from "@mui/icons-material/StopScreenShareOutlined";
interface StreamPreviewProps {}

const StreamPreview: FC<StreamPreviewProps> = ({}) => {
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [screenShareStream, setScreenShareStream] =
    useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openScreenShare, setOpenScreenShare] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [openAudio, setOpenAudio] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareVideoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setCameraStream(mediaStream);
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = mediaStream;
      }
      setOpenAudio(true);
    } catch (err) {
      setError("Error accessing camera: " + err);
    }
  };

  const startScreenShare = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setScreenShareStream(mediaStream);
      if (screenShareVideoRef.current) {
        screenShareVideoRef.current.srcObject = mediaStream;
      }

      mediaStream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      setError("Error accessing screen sharing: " + err);
    }
  };

  const toggleMuteAudio = (state: boolean) => {
    setOpenAudio(state);
    if (cameraStream) {
      cameraStream.getAudioTracks()[0].enabled = state;
    }
    if (screenShareStream) {
      screenShareStream.getAudioTracks()[0].enabled = state;
    }
  };

  const stopCamera = () => {
    if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop());
    setCameraStream(null);
  };

  const stopScreenShare = () => {
    if (screenShareStream)
      screenShareStream.getTracks().forEach((track) => track.stop());
    setScreenShareStream(null);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (cameraVideoRef.current) {
      const boxRect = cameraVideoRef.current.getBoundingClientRect();
      const offsetX = e.clientX - boxRect.left;
      const offsetY = e.clientY - boxRect.top;

      setIsDragging(true);
      setDragOffset({ x: offsetX, y: offsetY });

      // Prevent text selection during drag
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && containerRef.current && cameraVideoRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerLeft = containerRect.left;
      const containerTop = containerRect.top;
      const containerRight = containerRect.right;
      const containerBottom = containerRect.bottom;
      const boxWidth = cameraVideoRef.current.offsetWidth;
      const boxHeight = cameraVideoRef.current.offsetHeight;
      var newX = e.clientX - containerRect.left - dragOffset.x;
      var newY = e.clientY - containerRect.top - dragOffset.y;
      // Restrict movement within the container
      newX = Math.max(
        0,
        Math.min(newX, containerRight - containerLeft - boxWidth)
      );
      newY = Math.max(
        0,
        Math.min(newY, containerBottom - containerTop - boxHeight)
      );

      cameraVideoRef.current.style.left = `${newX}px`;
      cameraVideoRef.current.style.top = `${newY}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (openScreenShare) {
      startScreenShare();
    } else {
      if (screenShareStream) stopScreenShare();
    }
  }, [openScreenShare]);

  useEffect(() => {
    if (openCamera) {
      startCamera();
    } else {
      if (cameraStream) stopCamera();
    }
  }, [openCamera]);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);
  useEffect(() => {
    return () => {
      if (screenShareStream) {
        screenShareStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [screenShareStream]);

  return (
    <div className="flex flex-col space-y-[23px] h-full border-b-[1px] border-b-black-700 pb-5">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative self-center aspect-video h-[500px] rounded-lg bg-black-700 "
      >
        {openScreenShare && (
          <video
            playsInline
            autoPlay
            className="h-full aspect-video rounded-lg"
            ref={screenShareVideoRef}
          />
        )}
        {openCamera && (
          <video
            onMouseDown={handleMouseDown}
            playsInline
            autoPlay
            className={`${
              !openScreenShare
                ? "h-full aspect-video"
                : "h-[50%] absolute bottom-0 right-0  aspect-square"
            }  rounded-lg`}
            ref={cameraVideoRef}
          />
        )}
      </div>
      <div className="flex items-center space-x-[20px] self-center text-primary-900">
        {openAudio ? (
          <div
            className="cursor-pointer"
            onClick={() => toggleMuteAudio(false)}
          >
            <MicOutlinedIcon />
          </div>
        ) : (
          <div className="cursor-pointer" onClick={() => toggleMuteAudio(true)}>
            <MicOffOutlinedIcon />
          </div>
        )}
        {openCamera ? (
          <div className="cursor-pointer" onClick={() => setOpenCamera(false)}>
            <VideocamOutlinedIcon />
          </div>
        ) : (
          <div className="cursor-pointer" onClick={() => setOpenCamera(true)}>
            <VideocamOffOutlinedIcon />
          </div>
        )}
        {openScreenShare ? (
          <div
            className="cursor-pointer"
            onClick={() => setOpenScreenShare(false)}
          >
            <ScreenShareOutlinedIcon />
          </div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => setOpenScreenShare(true)}
          >
            <StopScreenShareOutlinedIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamPreview;
