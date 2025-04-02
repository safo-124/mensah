"use client"

import { FileText, CheckCircle, XCircle, ChevronLeft, Printer, Download, Calendar as CalendarIcon, Clock, MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter, useParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

type ClaimStatus = 'pending' | 'approved' | 'rejected';
type AssignedStatus = 'assigned' | 'unassigned' | 'completed';

interface TeachingClaim {
  id: string;
  serialNumber: string;
  studyCenter: string;
  lecturer: string;
  department: string;
  month: string;
  year: string;
  date: string;
  courseCode: string;
  courseTitle: string;
  startTime: string;
  endTime: string;
  hours: number;
  assignedStatus: AssignedStatus;
  remarks: string;
  status: ClaimStatus;
}

const fetchClaim = async (id: string): Promise<TeachingClaim> => {
  // In a real app, this would fetch from your API
  // const res = await fetch(`/api/claims/${id}`);
  // return res.json();
  
  // Mock data - remove this in production
  const mockClaims: TeachingClaim[] = [
    {
      id: "TCL-2023-001",
      serialNumber: "SN001",
      studyCenter: "Accra Main Campus",
      lecturer: "Dr. Kwame Mensah",
      department: "Computer Science",
      month: "October",
      year: "2023",
      date: "2023-10-15",
      courseCode: "CS101",
      courseTitle: "Introduction to Programming",
      startTime: "08:00",
      endTime: "10:00",
      hours: 2,
      assignedStatus: "assigned",
      remarks: "Regular teaching hours covering basic programming concepts including variables, loops, and functions.",
      status: "pending"
    },
    // Add more mock claims as needed
  ];
  
  const claim = mockClaims.find(c => c.id === id);
  if (!claim) throw new Error("Claim not found");
  return claim;
};

const ClaimViewPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement>(null);

  const { data: claim, isLoading, error } = useQuery({
    queryKey: ['claim', id],
    queryFn: () => fetchClaim(id as string),
  });

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
    documentTitle: claim ? `UEW_Claim_${claim.id}_${new Date().toISOString().slice(0, 10)}` : "UEW_Claim"
  });

  const handleDownload = () => {
    // Implement PDF download functionality
    alert("Download functionality would be implemented here");
  };

  if (isLoading) return (
    <div className="container mx-auto p-6 flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto p-6 text-center">
      <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
        Error loading claim: {(error as Error).message}
      </div>
      <Button className="mt-4" onClick={() => router.back()}>
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Claims
      </Button>
    </div>
  );

  if (!claim) return (
    <div className="container mx-auto p-6 text-center">
      <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg inline-block">
        Claim not found
      </div>
      <Button className="mt-4" onClick={() => router.back()}>
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Claims
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      {/* Back button and actions */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Claims
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Printable content */}
      <div ref={printRef} className="bg-white p-6 rounded-lg">
        {/* Header for print view */}
        <div className="hidden print:flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex items-center gap-3">
            <img 
              src="/uew-logo.png" 
              alt="UEW Logo"
              className="h-16 w-auto"
            />
            <div>
              <h2 className="text-xl font-bold">University of Education, Winneba</h2>
              <p className="text-sm">Teaching Claim Document</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm">Generated: {new Date().toLocaleString()}</p>
            <p className="text-sm">Claim ID: {claim.id}</p>
          </div>
        </div>

        {/* Main claim content */}
        <Card className="print:border-0 print:shadow-none">
          <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold">
                {claim.courseCode} - {claim.courseTitle}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge 
                  variant="outline" 
                  className={
                    claim.status === "approved" 
                      ? "bg-green-50 text-green-600 border-green-200" 
                      : claim.status === "rejected" 
                        ? "bg-red-50 text-red-600 border-red-200" 
                        : "bg-yellow-50 text-yellow-600 border-yellow-200"
                  }
                >
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={
                    claim.assignedStatus === "assigned" 
                      ? "bg-blue-50 text-blue-600 border-blue-200" 
                      : claim.assignedStatus === "completed" 
                        ? "bg-green-50 text-green-600 border-green-200" 
                        : "bg-yellow-50 text-yellow-600 border-yellow-200"
                  }
                >
                  {claim.assignedStatus.charAt(0).toUpperCase() + claim.assignedStatus.slice(1)}
                </Badge>
              </div>
            </div>
            <div className="text-right print:hidden">
              <p className="text-sm text-gray-500">Serial No.</p>
              <p className="text-lg font-medium">{claim.serialNumber}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Lecturer Information</h3>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{claim.lecturer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{claim.studyCenter}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Department:</span>
                      <span>{claim.department}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Teaching Details</h3>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <span>
                        {new Date(claim.date).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{claim.startTime} - {claim.endTime} ({claim.hours} hours)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Course Information</h3>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Code:</span>
                      <span>{claim.courseCode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Title:</span>
                      <span>{claim.courseTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Period:</span>
                      <span>{claim.month} {claim.year}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Remarks</h3>
                  <p className="mt-1 text-gray-800 bg-gray-50 p-3 rounded">
                    {claim.remarks}
                  </p>
                </div>
              </div>
            </div>

            {/* Approval section (only for approvers) */}
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Claim Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  View Supporting Documents
                </Button>
                {claim.status === "pending" && (
                  <>
                    <Button 
                      variant="success" 
                      className="flex items-center gap-2"
                      onClick={() => alert("Approve functionality would be implemented here")}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve Claim
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex items-center gap-2"
                      onClick={() => alert("Reject functionality would be implemented here")}
                    >
                      <XCircle className="h-4 w-4" />
                      Reject Claim
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer for print view */}
        <div className="hidden print:block mt-8 pt-4 border-t text-sm text-gray-500">
          <p>University of Education, Winneba - Teaching Claim Document</p>
          <p>This document was generated automatically on {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ClaimViewPage;