"use client";

import { useEffect } from "react";
import { account } from "@/lib/appwrite";

export default function TestAppwrite() {
  useEffect(() => {
    account
      .get()
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  }, []);

  return null;
}