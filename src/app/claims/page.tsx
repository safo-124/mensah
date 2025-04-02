"use client"

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Car, BookOpen, GraduationCap, Clock, Calendar, MapPin, Hash, User, Book, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ClaimType = "transportation" | "teaching" | "thesis";

type TransportationClaim = {
  claimType: "transportation";
  transportMode: "public" | "private";
  registrationNumber?: string;
  cubicCapacity?: string;
  destinationFrom: string;
  destinationTo: string;
  date: string;
  distance: string;
};

type TeachingClaim = {
  claimType: "teaching";
  date: string;
  courseCode: string;
  contactHours: string;
  startTime: string;
  endTime: string;
};

type ThesisClaim = {
  claimType: "thesis";
  thesisType: "supervision" | "examination";
  degree: "PhD" | "MPhil" | "MA" | "Ed" | "PGDE";
  studentNumber: string;
  studentName: string;
  thesisTitle: string;
};

type ClaimData = {
  claimId: string;
} & (TransportationClaim | TeachingClaim | ThesisClaim);

type FormState = {
  success: boolean;
  message: string;
} | null;

const degrees = ["PhD", "MPhil", "MA", "Ed", "PGDE"] as const;
const transportModes = ["public", "private"] as const;
const thesisTypes = ["supervision", "examination"] as const;

export default function ClaimsPage() {
  const [claimType, setClaimType] = useState<ClaimType>("transportation");
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      try {
        const baseData = {
          claimId: formData.get("claimId") as string,
          claimType: formData.get("claimType") as ClaimType,
        };

        let claimData: ClaimData;

        if (baseData.claimType === "transportation") {
          claimData = {
            ...baseData,
            claimType: "transportation",
            transportMode: formData.get("transportMode") as "public" | "private",
            registrationNumber: formData.get("registrationNumber") as string,
            cubicCapacity: formData.get("cubicCapacity") as string,
            destinationFrom: formData.get("destinationFrom") as string,
            destinationTo: formData.get("destinationTo") as string,
            date: formData.get("date") as string,
            distance: formData.get("distance") as string,
          };
        } else if (baseData.claimType === "teaching") {
          claimData = {
            ...baseData,
            claimType: "teaching",
            date: formData.get("date") as string,
            courseCode: formData.get("courseCode") as string,
            contactHours: formData.get("contactHours") as string,
            startTime: formData.get("startTime") as string,
            endTime: formData.get("endTime") as string,
          };
        } else {
          claimData = {
            ...baseData,
            claimType: "thesis",
            thesisType: formData.get("thesisType") as "supervision" | "examination",
            degree: formData.get("degree") as "PhD" | "MPhil" | "MA" | "Ed" | "PGDE",
            studentNumber: formData.get("studentNumber") as string,
            studentName: formData.get("studentName") as string,
            thesisTitle: formData.get("thesisTitle") as string,
          };
        }

        console.log("Claim Submitted", claimData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return { 
          success: true, 
          message: "Claim submitted successfully!" 
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to submit claim. Please try again.";
        return { 
          success: false, 
          message: errorMessage 
        };
      }
    },
    null
  );

  useEffect(() => {
    if (state?.message) {
      alert(state.message);
    }
  }, [state]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          whileHover={{ x: -5 }}
          className="inline-block mb-6"
        >
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Submit a Claim</h1>
        </motion.div>
        
        <Separator className="my-6 bg-blue-100" />
        
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="max-w-3xl mx-auto shadow-lg border-blue-100">
            <CardHeader className="border-b border-blue-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span>Claim Information</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <form action={formAction} className="space-y-6">
                <div className="space-y-4">
                  {/* Claim ID */}
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <Hash className="h-4 w-4" />
                        Claim ID
                      </Label>
                      <Input 
                        name="claimId" 
                        required 
                        placeholder="CL-2023-001"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>

                  {/* Claim Type Selection */}
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <FileText className="h-4 w-4" />
                        Claim Type
                      </Label>
                      <Select 
                        name="claimType" 
                        required 
                        onValueChange={(value: ClaimType) => setClaimType(value)}
                        defaultValue="transportation"
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select claim type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transportation">
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4" />
                              Transportation Claim
                            </div>
                          </SelectItem>
                          <SelectItem value="teaching">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              Teaching Claim
                            </div>
                          </SelectItem>
                          <SelectItem value="thesis">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4" />
                              Thesis Claim
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  {/* Dynamic Form Fields Based on Claim Type */}
                  {claimType === "transportation" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
                    >
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Car className="h-4 w-4" />
                          Transport Mode
                        </Label>
                        <Select name="transportMode" required>
                          <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select transport mode" />
                          </SelectTrigger>
                          <SelectContent>
                            {transportModes.map((mode) => (
                              <SelectItem key={mode} value={mode}>
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Hash className="h-4 w-4" />
                          Registration Number
                        </Label>
                        <Input 
                          name="registrationNumber" 
                          placeholder="GT 1234-20"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Car className="h-4 w-4" />
                          Cubic Capacity (cc)
                        </Label>
                        <Input 
                          name="cubicCapacity" 
                          type="number"
                          placeholder="2000"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <MapPin className="h-4 w-4" />
                          Destination From
                        </Label>
                        <Input 
                          name="destinationFrom" 
                          required 
                          placeholder="Starting location"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <MapPin className="h-4 w-4" />
                          Destination To
                        </Label>
                        <Input 
                          name="destinationTo" 
                          required 
                          placeholder="Destination"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Calendar className="h-4 w-4" />
                          Date
                        </Label>
                        <Input 
                          name="date" 
                          required 
                          type="date"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <MapPin className="h-4 w-4" />
                          Distance (km)
                        </Label>
                        <Input 
                          name="distance" 
                          required 
                          type="number"
                          placeholder="Distance in kilometers"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </motion.div>
                  )}

                  {claimType === "teaching" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
                    >
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Calendar className="h-4 w-4" />
                          Date
                        </Label>
                        <Input 
                          name="date" 
                          required 
                          type="date"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Book className="h-4 w-4" />
                          Course Code
                        </Label>
                        <Input 
                          name="courseCode" 
                          required 
                          placeholder="CS-101"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Clock className="h-4 w-4" />
                          Number of Contact Hours
                        </Label>
                        <Input 
                          name="contactHours" 
                          required 
                          type="number"
                          placeholder="2"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Clock className="h-4 w-4" />
                          Start Time
                        </Label>
                        <Input 
                          name="startTime" 
                          required 
                          type="time"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Clock className="h-4 w-4" />
                          End Time
                        </Label>
                        <Input 
                          name="endTime" 
                          required 
                          type="time"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </motion.div>
                  )}

                  {claimType === "thesis" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
                    >
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Book className="h-4 w-4" />
                          Thesis Type
                        </Label>
                        <Select name="thesisType" required>
                          <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select thesis type" />
                          </SelectTrigger>
                          <SelectContent>
                            {thesisTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Award className="h-4 w-4" />
                          Degree
                        </Label>
                        <Select name="degree" required>
                          <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select degree" />
                          </SelectTrigger>
                          <SelectContent>
                            {degrees.map((degree) => (
                              <SelectItem key={degree} value={degree}>
                                {degree}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Hash className="h-4 w-4" />
                          Student Number
                        </Label>
                        <Input 
                          name="studentNumber" 
                          required 
                          placeholder="STD-12345"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <User className="h-4 w-4" />
                          Student Name
                        </Label>
                        <Input 
                          name="studentName" 
                          required 
                          placeholder="John Doe"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label className="flex items-center gap-2 text-gray-700">
                          <Book className="h-4 w-4" />
                          Title of Thesis
                        </Label>
                        <Input 
                          name="thesisTitle" 
                          required 
                          placeholder="Thesis title"
                          className="focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
                
                <motion.div 
                  className="flex flex-col md:flex-row gap-4 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    className="w-full md:w-1/2 border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <Link href="/dashboard">
                      Cancel
                    </Link>
                  </Button>
                  <Button 
                    type="submit" 
                    className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 shadow-md"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Submit Claim"
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="mt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Need help? <Link href="/support" className="text-blue-600 hover:underline">Contact support</Link>
        </motion.div>
      </div>
    </motion.div>
  );
}