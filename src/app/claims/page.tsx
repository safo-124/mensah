"use client"

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, User, IdCard, Briefcase, Phone, Mail, GraduationCap, Book, MapPin, Banknote } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ClaimData = {
  claimId: string;
  surname: string;
  firstName: string;
  otherName: string;
  gender: string;
  telephone: string;
  email: string;
  ghanaCard: string;
  qualification: string;
  designation: string;
  department: string;
  subjectArea: string;
  studyCenter: string;
  branch: string;
  accountNumber: string;
};

type FormState = {
  success: boolean;
  message: string;
} | null;

const ghanaRegions = [
  "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern", 
  "Greater Accra", "North East", "Northern", "Oti", "Savannah", 
  "Upper East", "Upper West", "Volta", "Western", "Western North"
];

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
];

export default function ClaimsPage() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      try {
        const claimData: ClaimData = {
          claimId: formData.get("claimId") as string,
          surname: formData.get("surname") as string,
          firstName: formData.get("firstName") as string,
          otherName: formData.get("otherName") as string,
          gender: formData.get("gender") as string,
          telephone: formData.get("telephone") as string,
          email: formData.get("email") as string,
          ghanaCard: formData.get("ghanaCard") as string,
          qualification: formData.get("qualification") as string,
          designation: formData.get("designation") as string,
          department: formData.get("department") as string,
          subjectArea: formData.get("subjectArea") as string,
          studyCenter: formData.get("studyCenter") as string,
          branch: formData.get("branch") as string,
          accountNumber: formData.get("accountNumber") as string,
        };
        
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Claim ID */}
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <IdCard className="h-4 w-4" />
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

                  {/* Personal Information Section */}
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <User className="h-4 w-4" />
                        Surname
                      </Label>
                      <Input 
                        name="surname" 
                        required 
                        placeholder="Doe"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <User className="h-4 w-4" />
                        First Name
                      </Label>
                      <Input 
                        name="firstName" 
                        required 
                        placeholder="John"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <User className="h-4 w-4" />
                        Other Name
                      </Label>
                      <Input 
                        name="otherName" 
                        placeholder="Kwame"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <User className="h-4 w-4" />
                        Gender
                      </Label>
                      <Select name="gender" required>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genders.map((gender) => (
                            <SelectItem key={gender.value} value={gender.value}>
                              {gender.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <Phone className="h-4 w-4" />
                        Telephone Number
                      </Label>
                      <Input 
                        name="telephone" 
                        required 
                        type="tel"
                        placeholder="0244123456"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      <Input 
                        name="email" 
                        required 
                        type="email"
                        placeholder="john.doe@example.com"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <IdCard className="h-4 w-4" />
                        Ghana Card Number
                      </Label>
                      <Input 
                        name="ghanaCard" 
                        required 
                        placeholder="GHA-123456789-1"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Professional Information Section */}
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <GraduationCap className="h-4 w-4" />
                        Highest Qualification
                      </Label>
                      <Input 
                        name="qualification" 
                        required 
                        placeholder="PhD, MPhil, etc."
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <Briefcase className="h-4 w-4" />
                        Designation
                      </Label>
                      <Input 
                        name="designation" 
                        required 
                        placeholder="Senior Lecturer"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <Briefcase className="h-4 w-4" />
                        Department
                      </Label>
                      <Input 
                        name="department" 
                        required 
                        placeholder="Computer Science"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <Book className="h-4 w-4" />
                        Subject Area
                      </Label>
                      <Input 
                        name="subjectArea" 
                        required 
                        placeholder="Data Structures"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <MapPin className="h-4 w-4" />
                        Study Center
                      </Label>
                      <Input 
                        name="studyCenter" 
                        required 
                        placeholder="Accra Main Campus"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <MapPin className="h-4 w-4" />
                        Branch (Region)
                      </Label>
                      <Select name="branch" required>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {ghanaRegions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <Banknote className="h-4 w-4" />
                        Account Number
                      </Label>
                      <Input 
                        name="accountNumber" 
                        required 
                        type="number"
                        placeholder="1234567890"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
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