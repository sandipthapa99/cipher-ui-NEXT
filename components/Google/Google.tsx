import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";

const Google = () => {
    return (
        <div>
            <Link href={"/"}>
                <a>
                    <button className={`social-btn`}>
                        <Image
                            src={"/illustrations/google.svg"}
                            height={24}
                            width={24}
                            className=""
                            alt="icon"
                        />
                        <GoogleLogin
                            type="standard"
                            width="600px"
                            logo_alignment="center"
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                            useOneTap
                        />
                    </button>
                </a>
            </Link>
        </div>
    );
};
export default Google;
