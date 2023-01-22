import {
    faArrowDown,
    faArrowUp,
    faFileInvoiceDollar,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMyWallet } from "hooks/use-wallet";
import { useRouter } from "next/router";

export const MyEarnings = () => {
    const { data: myWallet } = useMyWallet();
    const router = useRouter();

    return (
        <div className="whole-earning-cont">
            <div className="whole-cont-earning">
                <p className="m-0 current-balance">Current Balance</p>
                <p className="current-amount">
                    {myWallet?.length !== 0 && myWallet
                        ? `${myWallet[0].available_balance}  ${myWallet[0].currency} `
                        : "0 "}
                </p>
                <div className="d-flex align-items-center justify-content-between lower-transaction">
                    <p className="m-0 latest-transaction">Latest Transaction</p>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <p className="m-0 weekly-points">
                            {myWallet?.length !== 0 && myWallet
                                ? `${myWallet[0].last_received}`
                                : "0 "}
                        </p>
                        <FontAwesomeIcon
                            icon={faArrowUp}
                            style={{ fontSize: "16px" }}
                            color={"#38C675"}
                        />
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <p className="m-0 weekly-points">
                            {myWallet?.length !== 0 && myWallet
                                ? `${myWallet[0].last_paid}`
                                : "0 "}
                        </p>
                        <FontAwesomeIcon
                            icon={faArrowDown}
                            style={{ fontSize: "16px" }}
                            color="#FE5050"
                        />
                    </div>
                </div>
                <div className="div-invoice">
                    <FontAwesomeIcon
                        icon={faFileInvoiceDollar}
                        style={{ fontSize: "24px", cursor: "pointer" }}
                        color="#fff"
                        onClick={() => router.push("/my-Earnings")}
                    />
                </div>
            </div>
        </div>
    );
};
