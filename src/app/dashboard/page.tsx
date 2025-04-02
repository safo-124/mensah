"use client"

import { LayoutDashboard, FileText, CheckCircle, User, ChevronDown, Menu, X, Clock, AlertCircle, DollarSign, Users, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

type UserRole = 'lecturer' | 'coordinator' | 'registry';

interface SidebarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface StaffCounts {
  coordinators: number;
  lecturers: number;
  accraLecturers: number;
  kumasiLecturers: number;
  mampongLecturers: number;
  winnebaLecturers: number;
}

const Sidebar = ({ role, setRole, isOpen, setIsOpen }: SidebarProps) => {
  const baseMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  ];

  const roleSpecificItems = [
    ...(role === "lecturer" 
      ? [{ label: "Submit Claim", icon: FileText, href: "/claims" }] 
      : []),
    ...(role !== "lecturer" 
      ? [{ label: "Approvals", icon: CheckCircle, href: "/approvals" }] 
      : []),
    ...(role === "registry" 
      ? [
          { label: "Create Coordinator", icon: Users, href: "/create/coordinator" },
          { label: "Create Lecturer", icon: Users, href: "/create/lecturer" }
        ]
      : role === "coordinator"
        ? [{ label: "Create Lecturer", icon: Users, href: "/create/lecturer" }]
        : [])
  ];

  const menuItems = [...baseMenuItems, ...roleSpecificItems];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 bg-uew-blue text-white p-6 w-72 h-screen z-50 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Image 
                  src="/uew-logo-white.png" 
                  alt="UEW Logo"
                  width={40}
                  height={40}
                  className="h-8 w-auto"
                />
                <h2 className="text-xl font-bold">
                  UEW Claims
                </h2>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map(({ label, icon: Icon, href }) => (
                <Link 
                  key={label} 
                  href={href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-uew-dark-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 text-uew-gold" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4 p-3 bg-uew-dark-blue rounded-lg">
              <div className="p-2 rounded-full bg-uew-gold">
                <User className="w-4 h-4 text-uew-blue" />
              </div>
              <div>
                <p className="text-sm font-medium">Current Role</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto text-white hover:bg-transparent">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-uew-blue border-uew-dark-blue">
                    {(['lecturer', 'coordinator', 'registry'] as UserRole[]).map((r) => (
                      <DropdownMenuItem 
                        key={r} 
                        onClick={() => setRole(r)}
                        className={`flex items-center gap-2 ${role === r ? 'bg-uew-dark-blue' : 'hover:bg-uew-dark-blue'}`}
                      >
                        <User className="w-4 h-4" />
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="p-3 bg-uew-dark-blue rounded-lg">
              <p className="text-xs text-uew-gold mb-1">System Status</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [staffCounts, setStaffCounts] = useState<StaffCounts>({
    coordinators: 0,
    lecturers: 0,
    accraLecturers: 0,
    kumasiLecturers: 0,
    mampongLecturers: 0,
    winnebaLecturers: 0
  });

  // Get role from localStorage or default to 'lecturer'
  const [role, setRole] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('userRole') as UserRole) || 'lecturer';
    }
    return 'lecturer';
  });

  // Persist role to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', role);
    }
  }, [role]);

  // Simulate fetching staff counts from API
  useEffect(() => {
    const fetchStaffCounts = async () => {
      // In a real app, you would fetch this from your API
      const mockData: StaffCounts = {
        coordinators: 12,
        lecturers: 85,
        accraLecturers: 35,
        kumasiLecturers: 20,
        mampongLecturers: 15,
        winnebaLecturers: 15
      };
      setStaffCounts(mockData);
    };

    fetchStaffCounts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(78), 500);
    return () => clearTimeout(timer);
  }, []);

  /*const getCoordinatorCenterCount = () => {
    // In a real app, you would get the coordinator's assigned center from their profile
    const coordinatorCenter = "accra"; // Example: Accra is the assigned center
    switch (coordinatorCenter) {
      case "accra": return staffCounts.accraLecturers;
      case "kumasi": return staffCounts.kumasiLecturers;
      case "mampong": return staffCounts.mampongLecturers;
      case "winneba": return staffCounts.winnebaLecturers;
      default: return 0;
    }
  };*/

  const stats = [
    { title: "Total Claims", value: "120", icon: FileText, trend: "↑ 12%", positive: true },
    ...(role !== "lecturer" 
      ? [{ title: "Pending Approvals", value: "15", icon: Clock, trend: "↓ 3%", positive: false }] 
      : []),
    { title: "Approved Claims", value: "90", icon: CheckCircle, trend: "↑ 8%", positive: true },
    { title: "Total Amount", value: "₵12,450", icon: DollarSign, trend: "↑ 15%", positive: true },
    ...(role === "registry" 
      ? [ 
          { title: "Rejected Claims", value: "5", icon: AlertCircle, trend: "↓ 2%", positive: false },
          { title: "Total Coordinators", value: staffCounts.coordinators, icon: Users, trend: "", positive: true },
          { title: "Total Lecturers", value: staffCounts.lecturers, icon: Users, trend: "", positive: true }
        ]
      : role === "coordinator"
        ? [{ title: "Lecturers in Center", /*value: getCoordinatorCenterCount(),*/ icon: Users, trend: "", positive: true }]
        : [])
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {!isMobile && (
        <div className="w-72 bg-uew-blue text-white p-6 hidden md:flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Image 
                src="/uew-logo-white.png" 
                alt="UEW Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <h2 className="text-xl font-bold">
                UEW Claims
              </h2>
            </div>
            
            <nav className="space-y-2">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-3 p-3 rounded-lg bg-uew-dark-blue transition-colors"
              >
                <LayoutDashboard className="w-5 h-5 text-uew-gold" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              
              {role === "lecturer" && (
                <Link 
                  href="/claims"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-uew-dark-blue transition-colors"
                >
                  <FileText className="w-5 h-5 text-uew-gold" />
                  <span className="text-sm font-medium">Submit Claim</span>
                </Link>
              )}
              
              {role !== "lecturer" && (
                <Link 
                  href="/approvals"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-uew-dark-blue transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-uew-gold" />
                  <span className="text-sm font-medium">Approvals</span>
                </Link>
              )}
              
              {role === "registry" && (
                <>
                  <Link 
                    href="/create/coordinator"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-uew-dark-blue transition-colors"
                  >
                    <Users className="w-5 h-5 text-uew-gold" />
                    <span className="text-sm font-medium">Create Coordinator</span>
                  </Link>
                  <Link 
                    href="/create/lecturer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-uew-dark-blue transition-colors"
                  >
                    <Users className="w-5 h-5 text-uew-gold" />
                    <span className="text-sm font-medium">Create Lecturer</span>
                  </Link>
                </>
              )}
              
              {role === "coordinator" && (
                <Link 
                  href="/create/lecturer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-uew-dark-blue transition-colors"
                >
                  <Users className="w-5 h-5 text-uew-gold" />
                  <span className="text-sm font-medium">Create Lecturer</span>
                </Link>
              )}
            </nav>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4 p-3 bg-uew-dark-blue rounded-lg">
              <div className="p-2 rounded-full bg-uew-gold">
                <User className="w-4 h-4 text-uew-blue" />
              </div>
              <div>
                <p className="text-sm font-medium">Current Role</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto text-white hover:bg-transparent">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-uew-blue border-uew-dark-blue">
                    {(['lecturer', 'coordinator', 'registry'] as UserRole[]).map((r) => (
                      <DropdownMenuItem 
                        key={r} 
                        onClick={() => setRole(r)}
                        className={`flex items-center gap-2 ${role === r ? 'bg-uew-dark-blue' : 'hover:bg-uew-dark-blue'}`}
                      >
                        <User className="w-4 h-4" />
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="p-3 bg-uew-dark-blue rounded-lg">
              <p className="text-xs text-uew-gold mb-1">System Status</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-4">
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(true)}
                  className="md:hidden"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              )}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Welcome back, <span className="text-uew-blue">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                </h1>
                <p className="text-sm text-gray-500">
                  {role === "lecturer" 
                    ? "Your recent claims activity" 
                    : role === "coordinator" 
                      ? "Department claims awaiting your review" 
                      : "Registry claims processing"}
                </p>
              </motion.div>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            Active
          </Badge>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={`${stat.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.positive ? 'bg-blue-50' : 'bg-orange-50'}`}>
                      <stat.icon className={`w-5 h-5 ${stat.positive ? 'text-blue-600' : 'text-orange-600'}`} />
                    </div>
                  </div>
                  {stat.trend && (
                    <div className={`flex items-center mt-4 text-sm ${stat.positive ? 'text-green-600' : 'text-orange-600'}`}>
                      {stat.trend} <span className="text-gray-500 ml-1">vs last month</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Claim Processing Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completion rate</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Submitted</p>
                      <p className="text-xl font-bold">120</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Approved</p>
                      <p className="text-xl font-bold">90</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pending</p>
                      <p className="text-xl font-bold">30</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {role === "lecturer" && (
                  <Button className="w-full bg-uew-blue hover:bg-uew-dark-blue" asChild>
                    <Link href="/claims">
                      <FileText className="w-4 h-4 mr-2" />
                      Submit New Claim
                    </Link>
                  </Button>
                )}
                
                {role !== "lecturer" && (
                  <Button variant="outline" className="w-full border-uew-blue text-uew-blue hover:bg-uew-light-blue" asChild>
                    <Link href="/approvals">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Review Approvals
                    </Link>
                  </Button>
                )}
                
                {(role === "registry" || role === "coordinator") && (
                  <Button variant="outline" className="w-full border-uew-blue text-uew-blue hover:bg-uew-light-blue" asChild>
                    <Link href={role === "registry" ? "/create/coordinator" : "/create/lecturer"}>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      {role === "registry" ? "Create Coordinator" : "Create Lecturer"}
                    </Link>
                  </Button>
                )}
                
                <Button variant="outline" className="w-full">
                  <DollarSign className="w-4 h-4 mr-2" />
                  View Payment History
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <Sidebar role={role} setRole={setRole} isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* UEW Color Variables */}
      <style jsx global>{`
        :root {
          --uew-blue: #0056B3;
          --uew-dark-blue: #003366;
          --uew-light-blue: #E6F0FA;
          --uew-gold: #FFD700;
        }
        .bg-uew-blue { background-color: var(--uew-blue); }
        .bg-uew-dark-blue { background-color: var(--uew-dark-blue); }
        .bg-uew-light-blue { background-color: var(--uew-light-blue); }
        .bg-uew-gold { background-color: var(--uew-gold); }
        .text-uew-blue { color: var(--uew-blue); }
        .text-uew-dark-blue { color: var(--uew-dark-blue); }
        .text-uew-gold { color: var(--uew-gold); }
        .border-uew-blue { border-color: var(--uew-blue); }
      `}</style>
    </div>
  );
};

export default DashboardPage;