import {Input} from "../Components/ui/Input"
import { Button } from "../Components/ui/Button"
import axios from "axios"
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Signin(){

         const usernameRef = useRef<HTMLInputElement>(null);
         const passwordRef = useRef<HTMLInputElement>(null);      
         const navigate = useNavigate();
         
     async function signin() {
  const username = usernameRef.current?.value;
  const password = passwordRef.current?.value;

  try {
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });

    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    alert("Welcome");
    navigate("/dashboard");

  } catch (err) {
    console.error("Signin failed:", err);
    alert("Signin failed. Please check your credentials or try again later.");
  }
}


      return (
      <div className="h-screen w-screen bg-gray-200 flex
      justify-center items-center">
          <div className="bg-white rounded-xl border min-w-48  p-8">
               <Input ref={usernameRef} placeholder="Username"/>
               <Input ref={passwordRef} placeholder="Password"/>
                 
               <div className="flex justify-center pt-2">
               <Button onClick={signin} variant="primary" text="Signin" size="md" fullWidth={true} loading={false}/>
                </div>  
          </div>
      </div>

)
}