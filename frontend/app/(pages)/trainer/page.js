"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Trainer = ({ params }) => {
  const router = useRouter();
  const postId = params.trainerId;

  useEffect(() => {
    if (postId === undefined) {
      router.push("/trainer/1");
    }
  }, []);
};

export default Trainer;
