"use client";

import { Logout } from "@/actions";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <>
      <Button
        onClick={async() => {
          await Logout();
        }} className=" m-5 text-black bg-white  pr-5 pl-5"
      >
        Logout
      </Button>
    </>
  );
}
