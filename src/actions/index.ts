"use server";
import connectToDB from "@/database";
import { User } from "@/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function registerUser(formData: any) {
  
  await connectToDB();
  try {
    const { email, username, password } = formData;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return {
        success: false,
        message: "Can't Register User as User already exists",
      };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    const action = newUser.save();
    if (action) {
      return {
        success: true,
        message: "User Created Successfully",
        data: JSON.parse(JSON.stringify(newUser)),
      };
    } else {
      return {
        success: false,
        message: "User Creation Failed.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong.",
      error: error,
    };
  }
}
export async function loginUser(formData: any) {
  await connectToDB();
  try {
    const { email, password } = formData;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return {
        success: false,
        message: "User doesn't exist.Please register the user.",
      };
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return {
        success: false,
        message: "Password is incorrect",
      };
    }
    const createdTokenData = {
      id: checkUser._id,
      username: checkUser.username,
      email: checkUser.email,
    };
    const token = jwt.sign(createdTokenData, "acchabaccha", {
      expiresIn: "1d",
    });
    const getCookies = cookies();
    getCookies.set("token", token);
    return {
      success: true,
      message: "Login successful.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
      error: error,
    };
  }
}
export async function fetchData(){
  await connectToDB();
  try {
    const getCookies=cookies()
    const token=getCookies.get("token")?.value||""
    if(!token){
      return{
        success:false,
        message:"Data can't be fetched."
      }
    }
    const tokenData=jwt.verify(token,'acchabaccha')
    return{
    success:true,
    message:"success",
    data:JSON.parse(JSON.stringify(tokenData))
    }
  } catch (error) {
    return{
      success:false,
      message:"Something went wrong"
    }
  }
}
export async function Logout(){
  const getCookies=cookies();
      getCookies.set("token","");
}