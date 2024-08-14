import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import HashLoader from "react-spinners/HashLoader";
import Write from "../../components/Type/Write";

export const LoadingScreen0=()=>{
    const theme = useContext(ThemeContext)
    
    return(
        
            
            <>
                <div style={{fontFamily:"Caudex"}} className="flex flex-col justify-evenly w-screen h-5/6 items-center">
                    <p className="text-lg " > Generating Chapters . . . </p>
                    <img src={theme.theme=='dark'?"/loader1.webp":"/loader3.gif"} alt="" className="w-96 rounded-lg" />
                    <p className="text-xs text-gray-500 w-96   flex flex-row items-center justify-evenly ">This may take a while <HashLoader color="gray" size={10} /> Keep surfing </p>
                </div>
            </>
    )
}
export const LoadingScreen1=()=>{
    const theme = useContext(ThemeContext)
    
    return(
        
            
            <>
                <div className="flex flex-col justify-evenly w-screen h-5/6 items-center">
                    <p className="text-lg " >Generating Lessons . . . </p>
                    <img src={theme.theme=='dark'?"/loader4.gif":"/loader8.gif"} alt="" className="w-96 rounded-lg" />
                    <p className="text-xs text-gray-500 w-96   flex flex-row items-center justify-evenly ">This may take a while <HashLoader color="gray" size={10} /> Keep surfing </p>
                </div>
            </>
    )
}
export default LoadingScreen0;
