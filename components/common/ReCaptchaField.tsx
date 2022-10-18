import { ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import type { ReCaptchaProps } from "types/reCaptchaProps";
// import {
//     checkFormGroup,
//     RECAPTCHA_SITE_KEY,
//     setCaptchaRef,
// } from "utils/helpers";

const ReCaptchaField = ({ handleChange, name, error }: ReCaptchaProps) => {
    return (
        // <div className={checkFormGroup(error)}>
        //     <div
        //         className={
        //             error
        //                 ? "recaptcha-form-control is-invalid"
        //                 : "recaptcha-form-control"
        //         }
        //     >
        //         <ReCAPTCHA
        //             ref={(r) => setCaptchaRef(r)}
        //             sitekey={`${RECAPTCHA_SITE_KEY}`}
        //             onChange={handleChange}
        //         />
        //     </div>
        //     <ErrorMessage
        //         name={`${name}`}
        //         component="span"
        //         className="invalid-feedback"
        //     />
        // </div>
        "Use new version"
    );
};

export default ReCaptchaField;
