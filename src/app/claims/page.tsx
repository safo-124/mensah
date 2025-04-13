"use client"

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Car, BookOpen, GraduationCap, Clock, Calendar, MapPin, Hash, User, Book, Award, Users, File } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ClaimType = "teaching" | "thesis";

type TeachingClaim = {
  claimType: "teaching";
  date: string;
  courseCode: string;
  contactHours: string;
  startTime: string;
  endTime: string;
  isTransportation: boolean;
  transportMode?: "public" | "private";
  registrationNumber?: string;
  cubicCapacity?: string;
  from?: string;
  to?: string;
  distance?: string;
};

type ThesisClaim = {
  claimType: "thesis";
  thesisType: "supervision" | "examination";
  degree: "PhD" | "MPhil" | "MA" | "Ed" | "PGDE";
  courseCode: string;
  date: string;
  studentNumbers: string[];
  studentNames: string[];
  thesisTitles: string[];
};

type ClaimData = {
  claimId: string;
} & (TeachingClaim | ThesisClaim);

type FormState = {
  success: boolean;
  message: string;
} | null;

const degrees = ["PhD", "MPhil", "MA", "Ed", "PGDE"] as const;
const transportModes = ["public", "private"] as const;
const thesisTypes = ["supervision", "examination"] as const;

export default function ClaimsPage() {
  const [claimType, setClaimType] = useState<ClaimType>("teaching");
  const [studentCount, setStudentCount] = useState(1);
  const [isTransportation, setIsTransportation] = useState(false);
  const [thesisType, setThesisType] = useState<"supervision" | "examination">("supervision");

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      try {
        const baseData = {
          claimId: formData.get("claimId") as string,
          claimType: formData.get("claimType") as ClaimType,
        };

        let claimData: ClaimData;

        if (baseData.claimType === "teaching") {
          claimData = {
            ...baseData,
            claimType: "teaching",
            date: formData.get("date") as string,
            courseCode: formData.get("courseCode") as string,
            contactHours: formData.get("contactHours") as string,
            startTime: formData.get("startTime") as string,
            endTime: formData.get("endTime") as string,
            isTransportation: formData.get("isTransportation") === "on",
            transportMode: formData.get("transportMode") as "public" | "private" | undefined,
            registrationNumber: formData.get("registrationNumber") as string | undefined,
            cubicCapacity: formData.get("cubicCapacity") as string | undefined,
            from: formData.get("from") as string | undefined,
            to: formData.get("to") as string | undefined,
            distance: formData.get("distance") as string | undefined,
          };
        } else {
          const studentNumbers = [];
          const studentNames = [];
          const thesisTitles = [];
          
          const currentThesisType = formData.get("thesisType") as "supervision" | "examination";
          const count = currentThesisType === "supervision" ? studentCount : 1;
          
          for (let i = 0; i < count; i++) {
            studentNumbers.push(formData.get(`studentNumber-${i}`) as string);
            studentNames.push(formData.get(`studentName-${i}`) as string);
            thesisTitles.push(formData.get(`thesisTitle-${i}`) as string);
          }
          
          claimData = {
            ...baseData,
            claimType: "thesis",
            thesisType: currentThesisType,
            degree: formData.get("degree") as "PhD" | "MPhil" | "MA" | "Ed" | "PGDE",
            courseCode: formData.get("courseCode") as string,
            date: formData.get("date") as string,
            studentNumbers,
            studentNames,
            thesisTitles,
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

  const addStudentField = () => {
    if (thesisType === "supervision" && studentCount < 10) {
      setStudentCount(studentCount + 1);
    }
  };

  const removeStudentField = () => {
    if (studentCount > 1) {
      setStudentCount(studentCount - 1);
    }
  };

  const handleThesisTypeChange = (value: "supervision" | "examination") => {
    setThesisType(value);
    if (value === "examination") {
      setStudentCount(1);
    }
  };

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
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <Hash className="h-4 w-4" />
                        Claim ID
                      </Label>
                      <Input 
                        name="claimId" 
                        required 
                        type="text"
                        title="Enter a unique claim identifier"
                        placeholder="CL-2023-001"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>

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
                        defaultValue="teaching"
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select claim type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="teaching">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              Teaching Claim
                            </div>
                          </SelectItem>
                          <SelectItem value="thesis">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4" />
                              Thesis/Project Claim
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  {claimType === "teaching" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 pt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2 text-gray-700">
                            <Calendar className="h-4 w-4" />
                            Date
                          </Label>
                          <Input 
                            name="date" 
                            required 
                            type="date"
                            title="Select the date of the teaching activity"
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
                            type="text"
                            title="Enter the course code"
                            placeholder="CS-101"
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2 text-gray-700">
                            <Clock className="h-4 w-4" />
                            Contact Hours
                          </Label>
                          <Input 
                            name="contactHours" 
                            required 
                            type="number"
                            min="1"
                            title="Enter the number of contact hours"
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
                            title="Select the start time"
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
                            title="Select the end time"
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <input
                        
                            type="checkbox"
                            id="isTransportation"
                            name="isTransportation"
                            checked={isTransportation}
                            onChange={(e) => setIsTransportation(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <Label htmlFor="isTransportation" className="flex items-center gap-2 text-gray-700">
                            <Car className="h-4 w-4" />
                            Include Transportation Claim
                          </Label>
                        </div>
                      </div>

                      {isTransportation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-blue-100 rounded-lg"
                        >
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-gray-700">
                              <Car className="h-4 w-4" />
                              Transport Mode
                            </Label>
                            <Select 
                              name="transportMode" 
                              required
                            
                            >
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
                              type="text"
                              title="Enter vehicle registration number"
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
                              min="0"
                              title="Enter vehicle engine capacity in cubic centimeters"
                              placeholder="2000"
                              className="focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-gray-700">
                              <MapPin className="h-4 w-4" />
                              From
                            </Label>
                            <Input 
                              name="from" 
                              type="text"
                              title="Enter starting location"
                              placeholder="Starting location"
                              className="focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-gray-700">
                              <MapPin className="h-4 w-4" />
                              To
                            </Label>
                            <Input 
                              name="to" 
                              type="text"
                              title="Enter destination"
                              placeholder="Destination"
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
                              type="number"
                              min="0"
                              step="0.1"
                              title="Enter distance in kilometers"
                              placeholder="Distance in kilometers"
                              className="focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {claimType === "thesis" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 pt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2 text-gray-700">
                            <Book className="h-4 w-4" />
                            Thesis/Project Type
                          </Label>
                          <Select 
                            name="thesisType" 
                            required
                          
                            onValueChange={handleThesisTypeChange}
                            defaultValue="supervision"
                          >
                            <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                              <SelectValue placeholder="Select type" />
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
                          <Select 
                            name="degree" 
                            required
                          
                          >
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
                            <Book className="h-4 w-4" />
                            Course Code
                          </Label>
                          <Input 
                            name="courseCode" 
                            required 
                            type="text"
                            title="Enter the course code"
                            placeholder="CS-101"
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
                            title="Select the date of the thesis activity"
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <Separator className="my-4 bg-blue-100" />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Students {thesisType === "supervision" ? "(Max 10)" : ""}
                          </h3>
                          {thesisType === "supervision" && (
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={removeStudentField}
                                disabled={studentCount <= 1}
                                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                Remove
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addStudentField}
                                disabled={studentCount >= 10}
                                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                Add Student
                              </Button>
                            </div>
                          )}
                        </div>

                        {Array.from({ length: thesisType === "supervision" ? studentCount : 1 }).map((_, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-blue-100 rounded-lg">
                            <div className="space-y-2">
                              <Label className="flex items-center gap-2 text-gray-700">
                                <Hash className="h-4 w-4" />
                                Student Number
                              </Label>
                              <Input 
                                name={`studentNumber-${index}`}
                                required 
                                type="text"
                                title={`Enter student ${index + 1}'s number`}
                                placeholder={`STD-${index + 1}`}
                                className="focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="flex items-center gap-2 text-gray-700">
                                <User className="h-4 w-4" />
                                Student Name
                              </Label>
                              <Input 
                                name={`studentName-${index}`}
                                required 
                                type="text"
                                title={`Enter student ${index + 1}'s name`}
                                placeholder="John Doe"
                                className="focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="flex items-center gap-2 text-gray-700">
                                <File className="h-4 w-4" />
                                Thesis/Project Title
                              </Label>
                              <Input 
                                name={`thesisTitle-${index}`}
                                required 
                                type="text"
                                title={`Enter thesis/project title for student ${index + 1}`}
                                placeholder="Thesis/Project title"
                                className="focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        ))}
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