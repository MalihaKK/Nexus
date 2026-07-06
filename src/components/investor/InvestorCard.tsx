import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, ExternalLink } from "lucide-react";
import { Investor } from "../../types";
import { Card, CardBody, CardFooter } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MeetingRequestModal } from "../collaboration/calendar/MeetingRequestModal";
import { useCollaboration } from "../../context/CollaborationContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface InvestorCardProps {
  investor: Investor;
  showActions?: boolean;
}

export const InvestorCard: React.FC<InvestorCardProps> = ({
  investor,
  showActions = true,
}) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/investor/${investor.id}`);
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/chat/${investor.id}`);
  };
  const handleViewProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleViewProfile();
  };
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  const { sendRequest } = useCollaboration();
  const { user: currentUser } = useAuth();
  return (
    <Card
      hoverable
      className="transition-all duration-300 h-full"
      onClick={handleViewProfile}
    >
      <CardBody className="flex flex-col">
        <div className="flex items-start">
          <Avatar
            src={investor.avatarUrl}
            alt={investor.name}
            size="lg"
            status={investor.isOnline ? "online" : "offline"}
            className="mr-4"
          />

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {investor.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Investor • {investor.totalInvestments} investments
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {investor.investmentStage.map((stage, index) => (
                <Badge key={index} variant="secondary" size="sm">
                  {stage}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-900 mb-1">
            Investment Interests
          </h4>
          <div className="flex flex-wrap gap-2">
            {investor.investmentInterests.map((interest, index) => (
              <Badge key={index} variant="primary" size="sm">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 line-clamp-2">{investor.bio}</p>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-500">Investment Range</span>
            <p className="text-sm font-medium text-gray-900">
              {investor.minimumInvestment} - {investor.maximumInvestment}
            </p>
          </div>
        </div>
      </CardBody>

      {showActions && (
        <CardFooter className="border-t border-gray-100 bg-gray-50 flex gap-2 p-3">
          <Button
            className="flex-1 h-9 text-xs"
            variant="outline"
            size="sm"
            leftIcon={<MessageCircle size={14} />}
            onClick={handleMessage}
          >
            Message
          </Button>

          <Button
            className="flex-1 h-9 text-xs"
            variant="primary"
            size="sm"
            rightIcon={<ExternalLink size={14} />}
            onClick={handleViewProfileClick}
          >
            View Profile
          </Button>

          <Button
            className="flex-1 h-9 text-xs"
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowMeetingModal(true);
            }}
          >
            Send Meeting
          </Button>
        </CardFooter>
      )}
      {showMeetingModal && (
        <MeetingRequestModal
          participant={investor.name}
          onClose={() => setShowMeetingModal(false)}
          onSend={(date, time) => {
            sendRequest({
              id: Date.now().toString(),
              senderId: currentUser!.id,
              senderName: currentUser!.name,
              receiverId: investor.id,
              receiverName: investor.name,
              date,
              time,
              status: "pending",
            });

            toast.success("Meeting request sent successfully!");

            setShowMeetingModal(false);
          }}
        />
      )}
    </Card>
  );
};
