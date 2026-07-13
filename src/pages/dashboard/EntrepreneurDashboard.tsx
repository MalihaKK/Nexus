import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Bell,
  Calendar,
  AlertCircle,
  PlusCircle,
  DollarSign,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { CollaborationRequestCard } from "../../components/collaboration/CollaborationRequestCard";
import { InvestorCard } from "../../components/investor/InvestorCard";
import { useAuth } from "../../context/AuthContext";
import { CollaborationRequest } from "../../types";
import { getRequestsForEntrepreneur } from "../../data/collaborationRequests";
import { investors } from "../../data/users";

//import { CollaborationProvider } from "../../context/CollaborationContext";
import { AvailabilityCalendar } from "../../components/collaboration/calendar/AvailabilityCalendar";
//import { MeetingRequests } from "../../components/collaboration/calendar/MeetingRequests";
//import { ConfirmedMeetings } from "../../components/collaboration/calendar/ConfirmedMeetings";
import { useCollaboration } from "../../context/CollaborationContext";

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();

  const { requests, confirmed } = useCollaboration();

  const myRequests = requests.filter(
    (request) => request.senderId === user?.id,
  );

  const myConfirmed = confirmed.filter(
    (meeting) => meeting.senderId === user?.id,
  );

  const [collaborationRequests, setCollaborationRequests] = useState<
    CollaborationRequest[]
  >([]);
  const [recommendedInvestors, _setRecommendedInvestors] = useState(
    investors.slice(0, 3),
  );

  useEffect(() => {
    if (user) {
      // Load collaboration requests
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);

  const handleRequestStatusUpdate = (
    requestId: string,
    status: "accepted" | "rejected",
  ) => {
    setCollaborationRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId ? { ...req, status } : req,
      ),
    );
  };

  if (!user) return null;

  const pendingRequests = collaborationRequests.filter(
    (req) => req.status === "pending",
  );

  const transactions = JSON.parse(
    localStorage.getItem("nexus-payments") || "[]",
  );

  const fundingReceived = transactions
    .filter((t: any) => t.type === "Funding")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const recentFunding = transactions
    .filter((t: any) => t.type === "Funding")
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your startup today
          </p>
        </div>

        <Link to="/investors">
          <Button leftIcon={<PlusCircle size={18} />}>Find Investors</Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Bell size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">
                  Pending Requests
                </p>
                <h3 className="text-xl font-semibold text-primary-900">
                  {pendingRequests.length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4">
                <Users size={20} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">
                  Total Connections
                </p>
                <h3 className="text-xl font-semibold text-secondary-900">
                  {
                    collaborationRequests.filter(
                      (req) => req.status === "accepted",
                    ).length
                  }
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4">
                <Calendar size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">
                  Upcoming Meetings
                </p>
                <h3 className="text-xl font-semibold">{confirmed.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-success-50 border border-success-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-success-100 rounded-full mr-4">
                <DollarSign size={20} className="text-success-700" />
              </div>

              <div>
                <p className="text-sm font-medium text-success-700">
                  Funding Received
                </p>

                <h3 className="text-xl font-semibold text-success-900">
                  ${fundingReceived.toLocaleString()}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Meeting Scheduling Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AvailabilityCalendar />
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Recent Investments</h2>
          </CardHeader>

          <CardBody>
            {recentFunding.length === 0 ? (
              <p className="text-gray-500">No investments received yet.</p>
            ) : (
              <div className="space-y-3">
                {recentFunding.map((item: any) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-3 flex justify-between"
                  >
                    <div>
                      <p className="font-medium">{item.sender}</p>

                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>

                    <div className="font-semibold text-green-600">
                      +${item.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Meeting Requests</h2>
            </CardHeader>

            <CardBody>
              {myRequests.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No pending meeting requests.
                </p>
              ) : (
                <div className="space-y-3">
                  {myRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-3">
                      <p className="font-medium">To: {request.receiverName}</p>

                      <p className="text-sm text-gray-500">
                        {request.date} • {request.time}
                      </p>

                      <span
                        className={`text-xs font-semibold ${
                          request.status === "pending"
                            ? "text-yellow-600"
                            : request.status === "accepted"
                              ? "text-green-600"
                              : "text-red-600"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Confirmed Meetings</h2>
            </CardHeader>

            <CardBody>
              {myConfirmed.length === 0 ? (
                <p className="text-sm text-gray-500">No confirmed meetings.</p>
              ) : (
                <div className="space-y-3">
                  {myConfirmed.map((meeting) => (
                    <div key={meeting.id} className="border rounded-lg p-3">
                      <p className="font-medium">
                        With: {meeting.receiverName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {meeting.date} • {meeting.time}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaboration requests */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Collaboration Requests
              </h2>
              <Badge variant="primary">{pendingRequests.length} pending</Badge>
            </CardHeader>

            <CardBody>
              {collaborationRequests.length > 0 ? (
                <div className="space-y-4">
                  {collaborationRequests.map((request) => (
                    <CollaborationRequestCard
                      key={request.id}
                      request={request}
                      onStatusUpdate={handleRequestStatusUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <AlertCircle size={24} className="text-gray-500" />
                  </div>
                  <p className="text-gray-600">No collaboration requests yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    When investors are interested in your startup, their
                    requests will appear here
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Recommended investors */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Recommended Investors
              </h2>
              <Link
                to="/investors"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                View all
              </Link>
            </CardHeader>

            <CardBody className="space-y-4">
              {recommendedInvestors.map((investor) => (
                <InvestorCard
                  key={investor.id}
                  investor={investor}
                  showActions={false}
                />
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
