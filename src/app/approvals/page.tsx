"use client"

import React, { useState, useEffect, useRef } from "react";
import { FileText, CheckCircle, XCircle, Search, Filter, Menu, LayoutDashboard, User, ChevronDown, X, Users, Clock, Calendar, MapPin, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

type UserRole = 'lecturer' | 'coordinator' | 'registry';
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

// Sidebar Component
const Sidebar = ({ role, setRole, isOpen, setIsOpen }: { 
  role: UserRole; 
  setRole: (role: UserRole) => void; 
  isOpen: boolean; 
  setIsOpen: (isOpen: boolean) => void 
}) => {
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
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 bg-blue-600 text-white p-6 w-72 h-screen z-50 shadow-2xl flex flex-col justify-between md:hidden"
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
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4 p-3 bg-blue-700 rounded-lg">
                <div className="p-2 rounded-full bg-yellow-400">
                  <User className="w-4 h-4 text-blue-600" />
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
                    <DropdownMenuContent className="w-48 bg-blue-600 border-blue-700">
                      {(['lecturer', 'coordinator', 'registry'] as UserRole[]).map((r) => (
                        <DropdownMenuItem 
                          key={r} 
                          onClick={() => setRole(r)}
                          className={`flex items-center gap-2 ${role === r ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                        >
                          <User className="w-4 h-4" />
                          {r.charAt(0).toUpperCase() + r.slice(1)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="p-3 bg-blue-700 rounded-lg">
                <p className="text-xs text-yellow-400 mb-1">System Status</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">All systems operational</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-72 bg-blue-600 text-white p-6 h-screen flex-col justify-between sticky top-0">
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
            {menuItems.map(({ label, icon: Icon, href }) => (
              <Link 
                key={label} 
                href={href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  typeof window !== 'undefined' && window.location.pathname === href
                    ? 'bg-blue-700'
                    : 'hover:bg-blue-700'
                }`}
              >
                <Icon className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4 p-3 bg-blue-700 rounded-lg">
            <div className="p-2 rounded-full bg-yellow-400">
              <User className="w-4 h-4 text-blue-600" />
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
                <DropdownMenuContent className="w-48 bg-blue-600 border-blue-700">
                  {(['lecturer', 'coordinator', 'registry'] as UserRole[]).map((r) => (
                    <DropdownMenuItem 
                      key={r} 
                      onClick={() => setRole(r)}
                      className={`flex items-center gap-2 ${role === r ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                    >
                      <User className="w-4 h-4" />
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="p-3 bg-blue-700 rounded-lg">
            <p className="text-xs text-yellow-400 mb-1">System Status</p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Component for the printable content
const PrintableContent = React.forwardRef<HTMLDivElement, { 
  claims: TeachingClaim[]; 
  role: UserRole;
  searchTerm: string;
  filterStatus: ClaimStatus | "all";
  filterMonth: string;
  filterYear: string;
  filterStudyCenter: string;
}>(({ claims, role, searchTerm, filterStatus, filterMonth, filterYear, filterStudyCenter }, ref) => {
  // Filter claims (same logic as in main component)
  const filteredClaims = claims.filter(claim => {
    if (role === "coordinator") {
      const coordinatorStudyCenter = "Accra Main Campus";
      if (claim.studyCenter !== coordinatorStudyCenter) return false;
    }
    
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || claim.status === filterStatus;
    const matchesMonth = filterMonth === "all" || claim.month === filterMonth;
    const matchesYear = filterYear === "all" || claim.year === filterYear;
    const matchesStudyCenter = 
      role !== "registry" || 
      filterStudyCenter === "all" || 
      claim.studyCenter === filterStudyCenter;
    
    return matchesSearch && matchesStatus && matchesMonth && matchesYear && matchesStudyCenter;
  });

  return (
    <div ref={ref} className="p-6 print:p-0">
      <div className="print:hidden">
        <h1 className="text-2xl font-bold mb-2">Teaching Claims Report</h1>
        <p className="text-gray-600 mb-6">Generated on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Header with University Logo for print */}
      <div className="hidden print:flex justify-between items-center mb-6 border-b pb-4">
        <div className="flex items-center gap-3">
          <img
            src="/uew-logo.png" 
            alt="UEW Logo"
            className="h-16 w-auto"
          />
          <div>
            <h2 className="text-xl font-bold">University of Education, Winneba</h2>
            <p className="text-sm">Teaching Claims Management System</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">Generated: {new Date().toLocaleString()}</p>
          <p className="text-sm">Role: {role.charAt(0).toUpperCase() + role.slice(1)}</p>
        </div>
      </div>

      {/* Filters summary */}
      <div className="mb-6 hidden print:block">
        <h3 className="font-semibold mb-2">Report Filters:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <p><span className="font-medium">Status:</span> {filterStatus === "all" ? "All" : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}</p>
          <p><span className="font-medium">Month:</span> {filterMonth === "all" ? "All" : filterMonth}</p>
          <p><span className="font-medium">Year:</span> {filterYear === "all" ? "All" : filterYear}</p>
          {role === "registry" && (
            <p><span className="font-medium">Study Center:</span> {filterStudyCenter === "all" ? "All" : filterStudyCenter}</p>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 hidden print:grid">
        <div className="border rounded-lg p-4 bg-blue-50">
          <h3 className="text-sm font-medium text-blue-600">Pending Approval</h3>
          <p className="text-2xl font-bold">{claims.filter(c => c.status === "pending").length}</p>
        </div>
        <div className="border rounded-lg p-4 bg-green-50">
          <h3 className="text-sm font-medium text-green-600">Approved Claims</h3>
          <p className="text-2xl font-bold">{claims.filter(c => c.status === "approved").length}</p>
        </div>
        <div className="border rounded-lg p-4 bg-red-50">
          <h3 className="text-sm font-medium text-red-600">Rejected Claims</h3>
          <p className="text-2xl font-bold">{claims.filter(c => c.status === "rejected").length}</p>
        </div>
      </div>

      {/* Claims table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-1">Serial No.</th>
              {role === "registry" && <th className="text-left py-2 px-1">Study Center</th>}
              <th className="text-left py-2 px-1">Claim ID</th>
              <th className="text-left py-2 px-1">Month/Year</th>
              <th className="text-left py-2 px-1">Date</th>
              <th className="text-left py-2 px-1">Course Code</th>
              <th className="text-left py-2 px-1">Course Title</th>
              <th className="text-left py-2 px-1">Time</th>
              <th className="text-left py-2 px-1">Hours</th>
              <th className="text-left py-2 px-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.map((claim) => (
              <tr key={claim.id} className="border-b">
                <td className="py-2 px-1">{claim.serialNumber}</td>
                {role === "registry" && <td className="py-2 px-1">{claim.studyCenter}</td>}
                <td className="py-2 px-1">{claim.id}</td>
                <td className="py-2 px-1">{claim.month} {claim.year}</td>
                <td className="py-2 px-1">
                  {new Date(claim.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="py-2 px-1">{claim.courseCode}</td>
                <td className="py-2 px-1">{claim.courseTitle}</td>
                <td className="py-2 px-1">{claim.startTime} - {claim.endTime}</td>
                <td className="py-2 px-1">{claim.hours} hrs</td>
                <td className="py-2 px-1">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    claim.status === "approved" 
                      ? "bg-green-100 text-green-800" 
                      : claim.status === "rejected" 
                        ? "bg-red-100 text-red-800" 
                        : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer for print */}
      <div className="hidden print:block mt-8 pt-4 border-t text-sm text-gray-500">
        <p>University of Education, Winneba - Teaching Claims Management System</p>
        <p>This report was generated automatically on {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
});

PrintableContent.displayName = 'PrintableContent';

// Approvals Page Component
const ApprovalsPage = () => {
  const [role, setRole] = useState<UserRole>("coordinator");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<ClaimStatus | "all">("all");
  const [filterMonth, setFilterMonth] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("all");
  const [filterStudyCenter, setFilterStudyCenter] = useState<string>("all");
  const [claims, setClaims] = useState<TeachingClaim[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  const studyCenters = [
    "Accra Main Campus", 
    "Kumasi Campus", 
    "Mampong Campus", 
    "Winneba Campus"
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = ["2023", "2022", "2021"];

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
    documentTitle: `UEW_Teaching_Claims_Report_${new Date().toISOString().slice(0, 10)}`
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Simulate API fetch with teaching claims data
    const fetchClaims = () => {
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
          remarks: "Regular teaching hours",
          status: "pending"
        },
        {
          id: "TCL-2023-002",
          serialNumber: "SN002",
          studyCenter: "Kumasi Campus",
          lecturer: "Prof. Ama Boateng",
          department: "Mathematics",
          month: "October",
          year: "2023",
          date: "2023-10-12",
          courseCode: "MATH202",
          courseTitle: "Advanced Calculus",
          startTime: "10:00",
          endTime: "12:00",
          hours: 2,
          assignedStatus: "completed",
          remarks: "Extra tutorial session",
          status: "pending"
        },
        {
          id: "TCL-2023-003",
          serialNumber: "SN003",
          studyCenter: "Accra Main Campus",
          lecturer: "Dr. Yaw Asare",
          department: "Physics",
          month: "September",
          year: "2023",
          date: "2023-09-28",
          courseCode: "PHY301",
          courseTitle: "Quantum Mechanics",
          startTime: "14:00",
          endTime: "16:00",
          hours: 2,
          assignedStatus: "unassigned",
          remarks: "Makeup class",
          status: "approved"
        },
        {
          id: "TCL-2023-004",
          serialNumber: "SN004",
          studyCenter: "Mampong Campus",
          lecturer: "Dr. Efua Coleman",
          department: "Chemistry",
          month: "September",
          year: "2023",
          date: "2023-09-20",
          courseCode: "CHEM101",
          courseTitle: "General Chemistry",
          startTime: "09:00",
          endTime: "11:00",
          hours: 2,
          assignedStatus: "completed",
          remarks: "Practical session",
          status: "rejected"
        },
        {
          id: "TCL-2023-005",
          serialNumber: "SN005",
          studyCenter: "Winneba Campus",
          lecturer: "Prof. Kofi Ansah",
          department: "Biology",
          month: "August",
          year: "2023",
          date: "2023-08-15",
          courseCode: "BIO201",
          courseTitle: "Cell Biology",
          startTime: "13:00",
          endTime: "15:00",
          hours: 2,
          assignedStatus: "assigned",
          remarks: "Guest lecture",
          status: "pending"
        },
      ];
      setClaims(mockClaims);
    };

    fetchClaims();
  }, []);

  // Filter claims based on role, search term, status, month, year, and study center
  const filteredClaims = claims.filter(claim => {
    // Filter by role - coordinators only see their study center
    if (role === "coordinator") {
      // In a real app, you would get the coordinator's study center from their profile
      const coordinatorStudyCenter = "Accra Main Campus"; // Example
      if (claim.studyCenter !== coordinatorStudyCenter) return false;
    }
    
    // Filter by search term
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = filterStatus === "all" || claim.status === filterStatus;
    
    // Filter by month
    const matchesMonth = filterMonth === "all" || claim.month === filterMonth;
    
    // Filter by year
    const matchesYear = filterYear === "all" || claim.year === filterYear;
    
    // Filter by study center (only for registry)
    const matchesStudyCenter = 
      role !== "registry" || 
      filterStudyCenter === "all" || 
      claim.studyCenter === filterStudyCenter;
    
    return matchesSearch && matchesStatus && matchesMonth && matchesYear && matchesStudyCenter;
  });

  const handleApprove = (claimId: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: "approved" } : claim
    ));
  };

  const handleReject = (claimId: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: "rejected" } : claim
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} setRole={setRole} isOpen={isOpen} setIsOpen={setIsOpen} />
      
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
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Teaching Claims Approvals
                </h1>
                <p className="text-sm text-gray-500">
                  {role === "coordinator" 
                    ? "Claims from your study center awaiting review" 
                    : "All teaching claims requiring approval"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
          <Button 
              variant="outline" 
              onClick={(e) => {
                e.preventDefault();  // Prevent default button behavior
                handlePrint();       // Call the print function
              }}
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Report</span>
            </Button>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
              {filteredClaims.length} {filteredClaims.length === 1 ? "Claim" : "Claims"}
            </Badge>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Hidden printable content */}
        <div className="hidden">
          <PrintableContent 
            ref={printRef}
            claims={filteredClaims}
            role={role}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            filterMonth={filterMonth}
            filterYear={filterYear}
            filterStudyCenter={filterStudyCenter}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Teaching Claims Review</CardTitle>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search claims..."
                      className="pl-9 w-full sm:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        {filterStatus === "all" ? "All Status" : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                        All Status
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterStatus("approved")}>
                        Approved
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterStatus("rejected")}>
                        Rejected
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {filterMonth === "all" ? "All Months" : filterMonth}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setFilterMonth("all")}>
                        All Months
                      </DropdownMenuItem>
                      {months.map(month => (
                        <DropdownMenuItem key={month} onClick={() => setFilterMonth(month)}>
                          {month}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {filterYear === "all" ? "All Years" : filterYear}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setFilterYear("all")}>
                        All Years
                      </DropdownMenuItem>
                      {years.map(year => (
                        <DropdownMenuItem key={year} onClick={() => setFilterYear(year)}>
                          {year}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {role === "registry" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {filterStudyCenter === "all" ? "All Centers" : filterStudyCenter}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setFilterStudyCenter("all")}>
                          All Centers
                        </DropdownMenuItem>
                        {studyCenters.map(center => (
                          <DropdownMenuItem key={center} onClick={() => setFilterStudyCenter(center)}>
                            {center}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serial No.</TableHead>
                    {role === "registry" && <TableHead>Study Center</TableHead>}
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Month/Year</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Assigned Status</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.length > 0 ? (
                    filteredClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.serialNumber}</TableCell>
                        {role === "registry" && <TableCell>{claim.studyCenter}</TableCell>}
                        <TableCell>{claim.id}</TableCell>
                        <TableCell>{claim.month} {claim.year}</TableCell>
                        <TableCell>
                          {new Date(claim.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>{claim.courseCode}</TableCell>
                        <TableCell>{claim.courseTitle}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span>{claim.startTime} - {claim.endTime}</span>
                          </div>
                        </TableCell>
                        <TableCell>{claim.hours} hrs</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate">{claim.remarks}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              asChild
                              className="hover:bg-gray-100"
                            >
                              <Link href={`/claims/${claim.id}`}>
                                <FileText className="h-4 w-4 text-blue-600" />
                              </Link>
                            </Button>
                            {claim.status === "pending" && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleApprove(claim.id)}
                                  className="hover:bg-green-50"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleReject(claim.id)}
                                  className="hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4 text-red-600" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={role === "registry" ? 13 : 12} className="h-24 text-center">
                        No claims found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {claims.filter(c => c.status === "pending").length}
              </div>
              <p className="text-xs text-blue-500 mt-1">
                Requires your immediate attention
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Approved Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {claims.filter(c => c.status === "approved").length}
              </div>
              <p className="text-xs text-green-500 mt-1">
                Ready for payment processing
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Rejected Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {claims.filter(c => c.status === "rejected").length}
              </div>
              <p className="text-xs text-red-500 mt-1">
                Requires follow-up with lecturers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Menu Button (shown only on mobile) */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 md:hidden rounded-full w-12 h-12 bg-blue-600 text-white shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default ApprovalsPage;