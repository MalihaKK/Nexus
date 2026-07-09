import { useRef, useState } from "react";

import { Card, CardBody, CardHeader } from "../ui/Card";
import { VideoWindow } from "./VideoWindow";
import { VideoControls } from "./VideoControls";

export const VideoCall = () => {
  const localVideo = useRef<HTMLVideoElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);

  const screenStream = useRef<MediaStream | null>(null);

  const [inCall, setInCall] = useState(false);

  const [micOn, setMicOn] = useState(true);

  const [cameraOn, setCameraOn] = useState(true);

  const [screenSharing, setScreenSharing] = useState(false);

  const startCall = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideo.current) {
        localVideo.current.srcObject = media;
      }

      setStream(media);
      setInCall(true);
    } catch {
      alert("Unable to access camera.");
    }
  };

  const stopScreenShare = () => {
    screenStream.current?.getTracks().forEach((track) => track.stop());

    if (stream && localVideo.current) {
      localVideo.current.srcObject = stream;
    }

    screenStream.current = null;
    setScreenSharing(false);
  };

  const shareScreen = async () => {
    try {
      if (!screenSharing) {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

        screenStream.current = displayStream;

        if (localVideo.current) {
          localVideo.current.srcObject = displayStream;
        }

        setScreenSharing(true);

        displayStream.getVideoTracks()[0].onended = () => {
          stopScreenShare();
        };
      } else {
        stopScreenShare();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const endCall = () => {
    stream?.getTracks().forEach((track) => track.stop());

    screenStream.current?.getTracks().forEach((track) => track.stop());

    if (localVideo.current) {
      localVideo.current.srcObject = null;
    }

    setStream(null);
    setInCall(false);

    setMicOn(true);
    setCameraOn(true);
    setScreenSharing(false);
  };

  const toggleMic = () => {
    if (!stream) return;

    const enabled = !micOn;

    stream.getAudioTracks().forEach((track) => {
      track.enabled = enabled;
    });

    setMicOn(enabled);
  };

  const toggleCamera = () => {
    if (!stream) return;

    const enabled = !cameraOn;

    stream.getVideoTracks().forEach((track) => {
      track.enabled = enabled;
    });

    setCameraOn(enabled);
  };

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardBody className="p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Business Nexus Meeting Room
            </h2>

            <p className="text-gray-500 mt-1">
              Secure Investor ↔ Entrepreneur Video Conference
            </p>
          </div>

        </div>

        {/* Meeting Information */}

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-blue-50 border rounded-xl p-5">
            <p className="text-xs uppercase text-blue-600 font-medium">
              Meeting Type
            </p>

            <h3 className="font-semibold mt-2">
              Investor ↔ Entrepreneur
            </h3>
          </div>

          <div className="bg-green-50 border rounded-xl p-5">
            <p className="text-xs uppercase text-green-600 font-medium">
              Platform
            </p>

            <h3 className="font-semibold mt-2">
              Business Nexus
            </h3>
          </div>

          <div className="bg-orange-50 border rounded-xl p-5">
            <p className="text-xs uppercase text-orange-600 font-medium">
              Status
            </p>

            <h3 className="font-semibold mt-2">
              {screenSharing
                ? "🖥 Sharing Screen"
                : inCall
                ? "🟢 In Call"
                : "⚪ Ready"}
            </h3>
          </div>

        </div>

        {/* Video Section */}

        <CardHeader className="px-0 pb-6 border-b">

          <h2 className="text-2xl font-bold">
            Live Meeting
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Camera Preview & Remote Participant
          </p>

        </CardHeader>

        <div className="mt-8 grid md:grid-cols-2 gap-8">

          {/* Local Video */}

          <VideoWindow
            title="You"
            videoRef={localVideo}
            inCall={inCall}
          />

          {/* Remote Video */}

          <div className="relative h-72 rounded-2xl bg-gradient-to-br from-slate-100 via-gray-100 to-gray-200 border shadow-lg flex flex-col items-center justify-center">

            <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-5xl">
              👤
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-800">
              Remote Participant
            </h3>

            {!inCall ? (
              <p className="mt-3 text-gray-500">
                Ready to join the meeting
              </p>
            ) : (
              <>
                <p className="mt-3 text-gray-600">
                  Waiting for participant to join...
                </p>

                <span className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
                  🟡 Connecting
                </span>
              </>
            )}

          </div>

        </div>

        {/* Controls */}

        <div className="mt-10 flex justify-center">

          <VideoControls
            inCall={inCall}
            micOn={micOn}
            cameraOn={cameraOn}
            screenSharing={screenSharing}
            onStart={startCall}
            onEnd={endCall}
            toggleMic={toggleMic}
            toggleCamera={toggleCamera}
            toggleScreenShare={shareScreen}
          />

        </div>

        {/* Footer */}

        <div className="mt-10 border-t pt-6 text-center">

          <p className="text-sm text-gray-500">
            Need help? Ensure your camera and microphone permissions are enabled.
          </p>

        </div>

      </CardBody>
    </Card>
  );
};