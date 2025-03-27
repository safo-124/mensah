// app/claims/page.tsx
"use client"

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, User, IdCard, Briefcase, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const claimTypes = [
  { value: "travel", label: "Travel Expenses" },
  { value: "material", label: "Teaching Materials" },
  { value: "conference", label: "Conference Fees" },
  { value: "research", label: "Research Costs" },
  { value: "other", label: "Other" },
];

export default function ClaimsPage() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        const claimData = {
          idNumber: formData.get("idNumber"),
          fullName: formData.get("fullName"),
          designation: formData.get("designation"),
          claimType: formData.get("claimType"),
          description: formData.get("description"),
        };
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { 
          success: true, 
          message: "Claim submitted successfully!" 
        };
      } catch (error) {
        return { 
          success: false, 
          message: "Failed to submit claim. Please try again." 
        };
      }
    },
    null
  );

  useEffect(() => {
    if (state?.message) {
      const notification = new Notification(state.message, {
        body: state.success ? "Your claim is being processed" : "Please check your details",
        icon: state.success ? "/success-icon.png" : "/error-icon.png"
      });
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
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>Claim Information</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <IdCard className="h-4 w-4" />
                        Tutor ID Number
                      </Label>
                      <Input 
                        name="idNumber" 
                        required 
                        placeholder="T-123456"
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-gray-700">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input 
                        name="fullName" 
                        required 
                        placeholder="John Doe"
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
                        <FileText className="h-4 w-4" />
                        Claim Type
                      </Label>
                      <Select name="claimType" required>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select claim type" />
                        </SelectTrigger>
                        <SelectContent>
                          {claimTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div whileHover={{ scale: 1.01 }}>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Detailed Description</Label>
                    <Textarea 
                      name="description" 
                      placeholder="Provide complete details about your claim including dates, amounts, and purpose..."
                      rows={5}
                      className="focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                    />
                  </div>
                </motion.div>
                
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