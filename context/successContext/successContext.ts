import { createContext, useContext } from "react"

interface SuccessContext {
    showSuccessModal:boolean,
    setShowSuccessModal:Function
}

export const successContext = createContext<SuccessContext>({
    
} as SuccessContext)

 export const useSuccessContext = () => useContext(successContext)