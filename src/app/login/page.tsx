"use client"
import { loginUser} from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {
    const [LoginForm,setLoginForm]=useState({
      email:'',
      password:''
    })
    async function handleLogin(){
      const result =await loginUser(LoginForm);
      console.log(result);
      if(result?.success){
        router.push('/');
      }
    }
    
    const router=useRouter();
    return (
        <>
          <div className="min-h-screen bg-slate-800 flex justify-center items-center">
            <Card className="m-5 p-6">
              <CardHeader>
                <h2 className="font-bold text-center">Login User</h2>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Label htmlFor="email">Email:</Label>
                <Input id="email" placeholder="Email" value={LoginForm.email} onChange={(event)=>{
                  setLoginForm({...LoginForm,email:event.target.value})
                }} />
                <Label htmlFor="password">Password:</Label>
                <Input id="password" type="password" placeholder="Password" value={LoginForm.password} onChange={(event)=>{
                  setLoginForm({...LoginForm,password:event.target.value})
                }} />
              </CardContent>
              <CardFooter className="flex gap-2">
               <Button onClick={()=>{handleLogin()}}>
                Login
               </Button>
               <Button onClick={()=>{
                router.push('/register');
               }}>
                Register User
               </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      );
}
