import React from "react";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { genDate } from "../../data/utils";
import { Button } from "antd";

export default function SignoutPage() {
  const { auth } = useAuth();
  const logout = useLogout();
  const todayDate = genDate();

  return (
    <main className="justify-center items-center">
      <div className="">
        <p>Hello {auth.user},</p>
        <p className="btn btn-yellow my-2">
          {todayDate.day + ", " + todayDate.date + " " + todayDate.month}
        </p>
      </div>
      <Button danger onClick={() => logout()}>
        Sign Out
      </Button>
    </main>
  );
}
