"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import BlogStatusCard from "@/components/Card/BlogStatusCard";
const StatusCard = ({ Blog }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        variant="icon"
        size="default"
        className="lg:hidden pr-4 py-2 underline"
        onClick={() => setShow((prev) => !prev)}
      >
        Stats
      </Button>
    
    </>
  );
};

export default StatusCard;
