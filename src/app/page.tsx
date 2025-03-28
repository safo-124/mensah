"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { User,  FileText, CheckCircle,  ArrowRight, Home, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

const UEWLandingPage = () => {
  const [role, setRole] = useState("lecturer");
  const [isHovered, setIsHovered] = useState(false);

  // UEW-specific features
  const features = [
    {
      title: "Expense Claims",
      description: "Submit teaching and research expense claims",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Approval Workflow",
      description: "Departmental approval process",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Payment Tracking",
      description: "Monitor claim status through to payment",
      icon: ClipboardList,
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* University Header */}
      <header className="bg-blue-800 text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full">
              <Image 
                src="/uew-logo.png" 
                alt="UEW Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">University of Education, Winneba</h1>
              <p className="text-sm opacity-90">Staff Claims Portal</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            UEW <span className="text-blue-800">Claims Management</span> System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Submit, track, and manage your expense claims with our dedicated portal
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`mb-4 p-3 rounded-lg bg-opacity-20 ${feature.color.replace('text', 'bg')} w-fit`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Role Selection */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto mb-12"
        >
          <Card>
            <CardHeader className="bg-blue-800 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-center gap-2">
                <User className="w-5 h-5" />
                Select Your Role
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lecturer">Lecturer</SelectItem>
                    <SelectItem value="coordinator">Coordinator</SelectItem>
                    <SelectItem value="registry">Registry Staff</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex flex-col space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Link href="/dashboard" passHref>
                      <Button 
                        size="lg" 
                        className="w-full bg-blue-800 hover:bg-blue-900 flex items-center justify-between"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <span className="flex items-center gap-2">
                          <Home className="w-5 h-5" />
                          Go to Dashboard
                        </span>
                        <motion.div
                          animate={{ x: isHovered ? 5 : 0 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </Button>
                    </Link>
                  </motion.div>

                  {role === "lecturer" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link href="/claims" passHref>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full border-blue-800 text-blue-800 hover:bg-blue-50 flex items-center gap-2"
                        >
                          <FileText className="w-5 h-5" />
                          Submit New Claim
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-600 text-sm border-t border-gray-200 pt-8"
        >
          <div className="flex flex-col items-center gap-4 mb-4">
            <Image 
              src="/uew-logo.png" 
              alt="UEW Logo"
              width={120}
              height={120}
              className="h-12 w-auto"
            />
            <p>© {new Date().getFullYear()} University of Education, Winneba</p>
          </div>
          <p className="text-xs text-gray-500">
            For technical support, contact: ICT Directorate | Ext: 1234
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UEWLandingPage;