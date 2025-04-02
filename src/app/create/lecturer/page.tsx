"use client"

import { User, Mail, Phone, GraduationCap, MapPin, Briefcase, ArrowLeft, CheckCircle, Shield, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

enum UserRole {
  REGISTRY = 'registry',
  COORDINATOR = 'coordinator'
}

type FormState = {
  success: boolean;
  message: string;
} | null;

const departments = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Economics"
] as const;

const studyCenters = [
  "Accra Main Campus",
  "Kumasi Campus",
  "Mampong Campus",
  "Winneba Campus"
] as const;

export default function CreateLecturerPage() {
  // In a real app, this would come from auth context
  const currentUserRole: UserRole = UserRole.REGISTRY; // Change to test different roles
  const coordinatorStudyCenter = "Accra Main Campus"; // Would come from user data

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      try {
        const lecturerData = {
          firstName: formData.get("firstName") as string,
          lastName: formData.get("lastName") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          department: formData.get("department") as string,
          studyCenter: currentUserRole === UserRole.REGISTRY
            ? coordinatorStudyCenter 
            : formData.get("studyCenter") as string,
          qualification: formData.get("qualification") as string,
          role: "lecturer"
        };
        
        console.log("Lecturer Created", lecturerData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return { 
          success: true, 
          message: "Lecturer created successfully!" 
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to create lecturer. Please try again.";
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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <motion.div whileHover={{ x: -5 }}>
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </motion.div>
          
          <Badge variant="outline" className="flex items-center gap-2">
            {currentUserRole === UserRole.REGISTRY ? (
              <>
                <Shield className="h-3 w-3" />
                Registry Admin
              </>
            ) : (
              <>
                <UserCog className="h-3 w-3" />
                Center Coordinator
              </>
            )}
          </Badge>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <User className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {currentUserRole === UserRole.REGISTRY ? "Register New Lecturer" : "Add Lecturer to Your Center"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {currentUserRole === UserRole.REGISTRY 
                ? "Fill in the lecturer details for university records" 
                : `Add a new lecturer to ${coordinatorStudyCenter}`}
            </p>
          </div>
        </motion.div>
        
        <Separator className="my-6 bg-blue-100" />
        
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-lg border-blue-100">
            <CardHeader className="border-b border-blue-50">
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                <span>Lecturer Details</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information Section */}
                  <div className="md:col-span-2">
                    <h3 className="font-medium flex items-center gap-2 text-gray-700 mb-4">
                      <User className="h-4 w-4" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <div className="space-y-2">
                          <Label>First Name</Label>
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
                          <Label>Last Name</Label>
                          <Input 
                            name="lastName" 
                            required 
                            placeholder="Doe"
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </Label>
                          <Input 
                            name="email" 
                            required 
                            type="email"
                            placeholder="john.doe@uew.edu.gh"
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </Label>
                          <Input 
                            name="phone" 
                            required 
                            type="tel"
                            placeholder="0244123456"
                            className="focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Academic Information Section */}
                  <div className="md:col-span-2">
                    <h3 className="font-medium flex items-center gap-2 text-gray-700 mb-4">
                      <GraduationCap className="h-4 w-4" />
                      Academic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
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
                          <Label className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            Department
                          </Label>
                          <Select name="department" required>
                            <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </motion.div>
                      
                      {/* Study Center Field - Different for each role */}
                      <motion.div whileHover={{ scale: 1.01 }} className="md:col-span-2">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Study Center
                          </Label>
                          {currentUserRole === UserRole.REGISTRY ? (
                            <Select name="studyCenter" required>
                              <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                                <SelectValue placeholder="Select study center" />
                              </SelectTrigger>
                              <SelectContent>
                                {studyCenters.map((center) => (
                                  <SelectItem key={center} value={center}>
                                    {center}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="flex items-center gap-3">
                              <Input 
                                name="studyCenter" 
                                readOnly 
                                value={coordinatorStudyCenter}
                                className="bg-gray-100 focus:ring-2 focus:ring-blue-500"
                              />
                              <Badge variant="secondary" className="whitespace-nowrap">
                                Your Center
                              </Badge>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
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
                        Creating...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        {currentUserRole === UserRole.REGISTRY ? "Register Lecturer" : "Add Lecturer"}
                      </span>
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