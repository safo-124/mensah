"use client"

import { User, Mail, Phone, MapPin, Shield, ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

type FormState = {
  success: boolean;
  message: string;
} | null;

const studyCenters = [
  { id: "accra", name: "Accra Main Campus" },
  { id: "kumasi", name: "Kumasi Campus" },
  { id: "mampong", name: "Mampong Campus" },
  { id: "winneba", name: "Winneba Campus" }
];

export default function CreateCoordinatorPage() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (prevState: FormState, formData: FormData) => {
      try {
        const coordinatorData = {
          firstName: formData.get("firstName") as string,
          lastName: formData.get("lastName") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          studyCenter: formData.get("studyCenter") as string,
          role: "coordinator" as const
        };
        
        console.log("Coordinator Created", coordinatorData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return { 
          success: true, 
          message: "Coordinator created successfully!" 
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to create coordinator. Please try again.";
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
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Coordinator
          </h1>
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
                <Shield className="h-5 w-5 text-blue-500" />
                <span>Coordinator Information</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        Last Name
                      </Label>
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
                      <Label className="flex items-center gap-2 text-gray-700">
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
                      <Label className="flex items-center gap-2 text-gray-700">
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
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <MapPin className="h-4 w-4" />
                        Assigned Study Center
                      </Label>
                      <Select name="studyCenter" required>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select study center" />
                        </SelectTrigger>
                        <SelectContent>
                          {studyCenters.map((center) => (
                            <SelectItem key={center.id} value={center.id}>
                              {center.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
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
                        Create Coordinator
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