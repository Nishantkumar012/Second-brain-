import { BACKEND_URL } from "../../config";
import {CrossIcon} from "../../icons/CrossIcon"
import {Button} from "./Button"
import { Input } from "./Input"
import { useRef, useState } from "react";
import axios from "axios"

  
 enum ContentType {
       Youtube = "youtube",
       Twitter = "twitter"
 }

//@ts-ignore

export function CreateContentModel({open, onClose}) {
      const titleRef = useRef<HTMLInputElement>(null);
const linkRef = useRef<HTMLInputElement>(null);
const [type, setType] = useState(ContentType.Youtube);

// async function addContent() {
//   const title = titleRef.current?.value;
//   const link = linkRef.current?.value;

//   const token = localStorage.getItem("token");
//    console.log(token);  

//   if (!token) {
//     alert("You are not logged in.");
//     return;
//   }

//   try {
//     await axios.post(
//       `${BACKEND_URL}/api/v1/content`,
//       {
//         title,
//         link,
//         type,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
    

//     alert("Content added");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to add content.");
//   }
// }

   async function addContent() {
  const title = titleRef.current?.value;
  const link = linkRef.current?.value;
  const type = "video"; 

  const token = localStorage.getItem("token");
  console.log("Token:", token);  

  if (!token) {
    alert("You are not logged in.");
    return;
  }

  // 👇 Define the payload
  const payload = {
    title,
    link,
    type,
  };

  // 👇 Log the payload before sending it
  console.log("Payload:", payload);
  console.log("Backend URL:", `${BACKEND_URL}/api/v1/content`);


  try {
    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Content added");
  }  catch (err) {
  if (axios.isAxiosError(err)) {
    console.error("Axios error:", err.response?.data || err.message);
  } else {
    console.error("Unexpected error:", err);
  }
  alert("Failed to add content.");
}
}



    return (
       <div>

         {open &&
            
            <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-70 flex justify-center ">
          {/* Modal content goes here */}
        </div>

           <div className="w-screen h-screen  fixed top-0 left-0  flex justify-center ">
                <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">

                        <CrossIcon size="lg"/>
                        </div>
                    </div>
                     <div>
                        
                        <Input ref={titleRef} placeholder={"Title"}/>
                        <Input ref={linkRef} placeholder={"Link"}/> 

                    </div>    
                    <div>

                        <h1>Type</h1>
                        <div className="flex gap-4 pb-2 justify-center">

                        <Button variant={type === ContentType.Youtube ? "primary" : "secondary"} text="Youtube" size="md" onClick={() => {
                            setType(ContentType.Youtube)
                        }}/>
                        <Button  variant={type === ContentType.Twitter ? "primary" : "secondary"} text="Twitter" size="md" onClick={() => {
                            setType(ContentType.Twitter)
                        }}/> 
                        </div>
                    </div>               
                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" size="md" text="Submit"/>
                    </div>
                </span>
             </div>   
            </div>
           
           
           
        </div>}
       </div> 
  )
}

