import { fetchData } from "@/actions";
import { Button } from "@/components/ui/button";
import LogoutButton from "./logout/page";
import { redirect } from "next/navigation";

async function fetchDetails(){
  const result=await fetchData();
if(result?.success){
  return result?.data};
  redirect('/login')
}

export default async function Home() {
   const tokenData=await fetchDetails();
  return (
      <>
      <div className="min-h-screen bg-gradient-to-r from from-blue-500 to-blue-700 flex flex-col justify-center items-center">
        <h2 className="text-4xl font-semibold text-white text-center">
          Welcome to Home Page.
        </h2>
        <ul className="m-5 p-3 font-extrabold text-white">
          <li>{tokenData?.username}</li>
          <li>{tokenData?.email}</li>
        </ul>
        <LogoutButton/>
      </div>
      </>
  );
}
