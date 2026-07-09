import React from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
} from "lucide-react";

import { Button } from "../ui/Button";

interface Props {
  inCall: boolean;
  micOn: boolean;
  cameraOn: boolean;
  screenSharing: boolean;

  onStart: () => void;
  onEnd: () => void;
  toggleMic: () => void;
  toggleCamera: () => void;
  toggleScreenShare: () => void;
}

export const VideoControls: React.FC<Props> = ({
  inCall,
  micOn,
  cameraOn,
  screenSharing,
  onStart,
  onEnd,
  toggleMic,
  toggleCamera,
  toggleScreenShare,
}) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      {!inCall ? (
        <Button onClick={onStart}>
          <Phone size={18} />
          Start Call
        </Button>
      ) : (
        <>
          <Button variant="outline" onClick={toggleMic}>
            {micOn ? <Mic size={18} /> : <MicOff size={18} />}
          </Button>

          <Button variant="outline" onClick={toggleCamera}>
            {cameraOn ? <Video size={18} /> : <VideoOff size={18} />}
          </Button>

          <Button variant="outline" onClick={toggleScreenShare}>
            <Monitor size={18} />
            {screenSharing ? "Stop Share" : "Share Screen"}
          </Button>

          <Button variant="primary" onClick={onEnd}>
            <PhoneOff size={18} />
            End Call
          </Button>
        </>
      )}
    </div>
  );
};