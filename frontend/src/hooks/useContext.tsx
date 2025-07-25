import { useEffect, useState } from "react";
import axios from 'axios'
import { BACKEND_URL } from "../config";



export function useContext(){
       const [contents, setContents] = useState([]);


            useEffect(() => {
                  
                const response = axios.get(`${BACKEND_URL}/ap`)
                
            }, [])


        return contents;
    }