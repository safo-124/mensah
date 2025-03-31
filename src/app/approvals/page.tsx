"use client"

import { FileText, CheckCircle, XCircle, Search, Filter, Menu, LayoutDashboard, User, ChevronDown, X, Users } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type UserRole = 'lecturer' | 'coordinator' | 'registry';
type ClaimStatus = 'pending' | 'approved' | 'rejected';

interface Claim {
  id: string;
  lecturer: string;
  department: string;
  claimType: string;
  amount: number;
  dateSubmitted: string;
  status: ClaimStatus;
  documents: number;
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
            className="fixed inset-y-0 left-0 bg-uew-blue text-white p-6 w-72 h-screen z-50 shadow-2xl flex flex-col justify-between md:hidden"
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

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-72 bg-uew-blue text-white p-6 h-screen flex-col justify-between sticky top-0">
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
                    ? 'bg-uew-dark-blue'
                    : 'hover:bg-uew-dark-blue'
                }`}
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
      </div>
    </>
  );
};

// Approvals Page Component
const ApprovalsPage = () => {
  const [role, setRole] = useState<UserRole>("coordinator");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<ClaimStatus | "all">("all");
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Simulate API fetch
    const fetchClaims = () => {
      const mockClaims: Claim[] = [
        {
          id: "CLM-2023-001",
          lecturer: "Dr. Kwame Mensah",
          department: "Computer Science",
          claimType: "Research Grant",
          amount: 2500,
          dateSubmitted: "2023-10-15",
          status: "pending",
          documents: 3
        },
        {
          id: "CLM-2023-002",
          lecturer: "Prof. Ama Boateng",
          department: "Mathematics",
          claimType: "Conference Travel",
          amount: 3200,
          dateSubmitted: "2023-10-12",
          status: "pending",
          documents: 2
        },
        {
          id: "CLM-2023-003",
          lecturer: "Dr. Yaw Asare",
          department: "Physics",
          claimType: "Equipment Purchase",
          amount: 4500,
          dateSubmitted: "2023-10-10",
          status: "approved",
          documents: 4
        },
        {
          id: "CLM-2023-004",
          lecturer: "Dr. Efua Coleman",
          department: "Chemistry",
          claimType: "Workshop Attendance",
          amount: 1800,
          dateSubmitted: "2023-10-08",
          status: "rejected",
          documents: 3
        },
        {
          id: "CLM-2023-005",
          lecturer: "Prof. Kofi Ansah",
          department: "Biology",
          claimType: "Research Grant",
          amount: 3000,
          dateSubmitted: "2023-10-05",
          status: "pending",
          documents: 5
        },
      ];
      setClaims(mockClaims);
    };

    fetchClaims();
  }, []);

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.lecturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || claim.status === filterStatus;
    
    return matchesSearch && matchesFilter;
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
                  Claims Approvals
                </h1>
                <p className="text-sm text-gray-500">
                  {role === "coordinator" 
                    ? "Department claims awaiting your review" 
                    : "All claims requiring registry approval"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
              {filteredClaims.length} {filteredClaims.length === 1 ? "Claim" : "Claims"}
            </Badge>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Claims Review</CardTitle>
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
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Lecturer</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.length > 0 ? (
                    filteredClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>{claim.lecturer}</TableCell>
                        <TableCell>{claim.department}</TableCell>
                        <TableCell>{claim.claimType}</TableCell>
                        <TableCell>₵{claim.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          {new Date(claim.dateSubmitted).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
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
                                <FileText className="h-4 w-4 text-uew-blue" />
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
                      <TableCell colSpan={8} className="h-24 text-center">
                        No claims found.
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
        className="fixed bottom-4 right-4 z-40 md:hidden rounded-full w-12 h-12 bg-uew-blue text-white shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </Button>

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

export default ApprovalsPage;