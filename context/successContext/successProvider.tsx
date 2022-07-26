import {ReactNode, useState } from "react"
import {successContext} from './successContext'
interface Props {
	children: ReactNode;
}

const SuccessProvider = ({children}:Props) => {
    const [showSuccessModal,  setShowSuccessModal] = useState(false)

const value = {
    showSuccessModal,
    setShowSuccessModal
}
return <successContext.Provider value={value}>{children}</successContext.Provider>
}
export default SuccessProvider