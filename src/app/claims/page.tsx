"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const ClaimsPage = () => {
  const [claimDetails, setClaimDetails] = useState({
    idNumber: "",
    fullName: "",
    designation: "",
    claimType: "",
    description: "",
  });

  const handleChange = (e) => {
    setClaimDetails({ ...claimDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Claim Submitted", claimDetails);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Submit a Claim</h1>
      <Separator className="my-4" />
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium">Tutor Identification Number</label>
            <Input type="text" name="idNumber" value={claimDetails.idNumber} onChange={handleChange} required />

            <label className="block text-sm font-medium">Full Name</label>
            <Input type="text" name="fullName" value={claimDetails.fullName} onChange={handleChange} required />

            <label className="block text-sm font-medium">Designation</label>
            <Input type="text" name="designation" value={claimDetails.designation} onChange={handleChange} required />

            <label className="block text-sm font-medium">Type of Claim</label>
            <Input type="text" name="claimType" value={claimDetails.claimType} onChange={handleChange} required />

            <label className="block text-sm font-medium">Description</label>
            <Textarea name="description" value={claimDetails.description} onChange={handleChange} />
            
            <Button type="submit" className="w-full">Submit Claim</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimsPage;