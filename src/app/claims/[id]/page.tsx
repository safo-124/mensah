"use client"

import React from "react";
import { CheckCircle, XCircle, Clock, Calendar, MapPin,  ChevronLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useRef } from "react";

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
  venue: string;
  studentCount: number;
  submittedDate: string;
}

const ClaimDetailsPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  // In a real app, you would fetch this data based on the ID from your API
  const claim: TeachingClaim = {
    id: params.id,
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
    status: "pending",
    venue: "Computer Lab 3",
    studentCount: 45,
    submittedDate: "2023-10-16T09:30:00Z"
  };

  /**const handlePrint = useReactToPrint({
    contentRef: () => printRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
    documentTitle: `UEW_Teaching_Claim_${claim.id}`
  }); */

  const handleApprove = () => {
    // In a real app, you would make an API call here
    console.log(`Claim ${claim.id} approved`);
    router.push("/approvals");
  };

  const handleReject = () => {
    // In a real app, you would make an API call here
    console.log(`Claim ${claim.id} rejected`);
    router.push("/approvals");
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Claims
        </Button>
      </div>

      {/* Printable content */}
      <div ref={printRef} className="p-6 print:p-0">
        <div className="print:hidden mb-6">
          <h1 className="text-2xl font-bold">Teaching Claim Details</h1>
          <p className="text-gray-600">Claim ID: {claim.id}</p>
        </div>

        {/* Header for print */}
        <div className="hidden print:flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold">University of Education, Winneba</div>
          </div>
          <div className="text-right">
            <p className="text-sm">Generated: {new Date().toLocaleString()}</p>
            <p className="text-sm">Claim ID: {claim.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Claim Summary Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Claim Summary</span>
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
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Serial Number</p>
                    <p className="font-medium">{claim.serialNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Study Center</p>
                    <p className="font-medium">{claim.studyCenter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Lecturer</p>
                    <p className="font-medium">{claim.lecturer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{claim.department}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Course Code</p>
                    <p className="font-medium">{claim.courseCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Course Title</p>
                    <p className="font-medium">{claim.courseTitle}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(claim.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {claim.startTime} - {claim.endTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hours</p>
                    <p className="font-medium">{claim.hours} hrs</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-gray-500">Venue</p>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {claim.venue}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Number of Students</p>
                  <p className="font-medium">{claim.studentCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status and Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Claim Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500">Assigned Status</p>
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

                <div>
                  <p className="text-sm text-gray-500">Submitted On</p>
                  <p className="font-medium">
                    {new Date(claim.submittedDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-gray-500 mb-2">Remarks</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-md">{claim.remarks}</p>
                </div>

                {claim.status === "pending" && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500">Actions</p>
                      <div className="flex flex-col gap-2">
                        <Button 
                          variant="outline" 
                          className="bg-green-50 text-green-600 hover:bg-green-100"
                          onClick={handleApprove}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Claim
                        </Button>
                        <Button 
                          variant="outline" 
                          className="bg-red-50 text-red-600 hover:bg-red-100"
                          onClick={handleReject}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Claim
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer for print */}
        <div className="hidden print:block mt-8 pt-4 border-t text-sm text-gray-500">
          <p>University of Education, Winneba - Teaching Claim #{claim.id}</p>
          <p>This document was generated automatically on {new Date().toLocaleString()}</p>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6 print:hidden">
        <Button variant="outline"  className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print Claim
        </Button>
        <Button asChild>
          <Link href={`/claims/${claim.id}/edit`}>Edit Claim</Link>
        </Button>
      </div>
    </div>
  );
};

export default ClaimDetailsPage;