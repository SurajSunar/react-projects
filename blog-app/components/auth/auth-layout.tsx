"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Loginform from "./login-form";
import Registerform from "./register-form";

const AuthLayout = () => {
  const [tab, setTab] = useState("login");
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md p-5 border bg-card rounded">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Loginform />
          </TabsContent>
          <TabsContent value="register">
            <Registerform onSuccess={() => setTab("login")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthLayout;
