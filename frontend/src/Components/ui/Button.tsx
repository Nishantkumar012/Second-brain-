
import { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
  variant: Variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};

const defaultStyles = "rounded-md flex items-center";

const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-4",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`
        ${variantStyles[props.variant]} 
        ${defaultStyles} 
        ${sizeStyles[props.size]} 
        ${props.fullWidth ? "w-full justify-center" : ""}
        ${props.loading? "opacity-50" : "" }
      `}
      disabled={props.loading}
    >
      {props.startIcon && <div className="pr-2">{props.startIcon}</div>}
      {props.text}
      {props.endIcon && <div className="pl-2">{props.endIcon}</div>}
    </button>
  );
};




// import { ReactElement } from "react";

  
//     type Variants = "primary" | "secondary"
     
//     interface ButtonProps {
        
//        variant: Variants;
//        size: "sm" | "md" | "lg";
//        text: string;
//        startIcon?: ReactElement;
//        endIcon?: ReactElement; 
//        onClick?: () => void;
//        fullWidth?: boolean
//    }

//      const variantStyles = {
//             "primary": "bg-purple-600 text-white",
//             "secondary": "bg-purple-300 text-purple-600"
//      }
       
//       const defaultStyles = "rounded-md flex items-center "

//      const sizeStyles ={
//           "sm": "py-1 px-2",
//           "md": "py-2 px-4",
//           "lg": "py-4"
//      }

//    export const Button = (props: ButtonProps) =>{
        
//         return <button onClick={props.onClick} className={ ` ${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size] }  ${fullWidth ? "w-full justify-center" : ""} `}>
//            {props.startIcon? <div className="pr-2">{props.startIcon}</div>:null} {props.text} {props.endIcon}
//           </button>
//    }


//    <Button variant="primary" size="md" onClick={() => {}} text={"asd"} />