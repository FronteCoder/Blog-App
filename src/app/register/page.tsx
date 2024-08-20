"use client"
import { registerUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Register() {
    const [registerForm,setRegisterForm]=useState({
      username:'',
      email:'',
      password:''
    })
    async function handleRegister(){
      const result =await registerUser(registerForm);
      console.log(result);
      if(result?.success){
        setRegisterForm({
          username:'',
          email:'',
          password:''
        });
        router.push('/login');
      }
    }
    const router=useRouter();
    return (
        <>
          <div className="min-h-screen bg-slate-800 flex justify-center items-center">
            <Card className="m-5 p-6">
              <CardHeader>
                <h2 className="font-bold text-center">Register User</h2>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Label htmlFor="username">User Name:</Label>
                <Input id="username" placeholder="User Name" value={registerForm.username} onChange={(event)=>{
                  setRegisterForm({...registerForm,username:event.target.value})
                }} />
                <Label htmlFor="email">Email:</Label>
                <Input id="email" placeholder="Email" value={registerForm.email} onChange={(event)=>{
                  setRegisterForm({...registerForm,email:event.target.value})
                }} />
                <Label htmlFor="password">Password:</Label>
                <Input id="password" type="password" placeholder="Password" value={registerForm.password} onChange={(event)=>{
                  setRegisterForm({...registerForm,password:event.target.value})
                }} />
              </CardContent>
              <CardFooter className="flex gap-2">
               <Button onClick={()=>{handleRegister()}}>
                Create User
               </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      );
}
