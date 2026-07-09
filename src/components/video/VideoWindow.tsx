import React from "react";

interface Props {
  title: string;
  videoRef: React.Ref<HTMLVideoElement>;
  inCall: boolean;
}

export const VideoWindow: React.FC<Props> = ({
  title,
  videoRef,
  inCall,
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gray-900 border shadow-lg">

      {/* Header */}
      <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-3">
        <span className="font-semibold">{title}</span>

        {inCall && (
          <span className="flex items-center gap-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            LIVE
          </span>
        )}
      </div>

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={title === "You"}
        className="w-full h-72 object-cover bg-black"
      />
    </div>
  );
};