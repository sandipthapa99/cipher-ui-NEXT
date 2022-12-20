import { faArrowLeftLong } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { OnBoardingLayoutProps } from "types/OnBoardingLayoutProps";

import meta from "../staticData/siteMetaData.json";

const OnBoardingLayout = ({
    children,
    topLeftText,
    topRightText,
    welcomeText,
    headerText,
    redirectionLink,
    currentPage,
    mainImg,
    title,
    description,
    keywords,
    ogUrl,
}: OnBoardingLayoutProps) => {
    return (
        <>
            <Head>
                <title>{!title ? meta.title : title}</title>
                <meta
                    name="description"
                    content={!description ? meta.description : description}
                />
                <meta
                    property="og:title"
                    content={!title ? meta.title : title}
                />
                <meta
                    property="og:description"
                    content={!description ? meta.description : description}
                />
                <meta property="og:url" content={!ogUrl ? "" : ``} />
                {/* <meta
                    property="og:image"
                    content={!ogImage ? cipherOgImage : ogImage}
                /> */}
                <meta name="twitter:url" content={!ogUrl ? "" : ``} />
                <meta
                    name="twitter:title"
                    content={!title ? meta.title : title}
                />
                <meta
                    name="twitter:description"
                    content={!description ? meta.description : description}
                />
                <meta
                    name="keywords"
                    content={!keywords ? meta.keywords : keywords}
                />
                <meta name="robots" content="index, follow" />
            </Head>
            <div className="login-layout-wrapper">
                <div className="login-layout-wrapper__left">
                    <div className="brand-logo">
                        <Link href="/">
                            <a>
                                <Image
                                    src="/logo/homaale-logo_svg.svg"
                                    alt="Logo"
                                    width={190}
                                    height={55}
                                    priority
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="main-img d-flex w-100 h-100 justify-content-center align-items-center">
                        <Image
                            src={mainImg}
                            alt="Logo"
                            width={564}
                            height={500}
                            priority
                        />
                    </div>
                </div>

                <div className="login-layout-wrapper__right">
                    <Link href="/">
                        <a>
                            <FontAwesomeIcon
                                icon={faArrowLeftLong}
                                className="backarrow"
                            />
                        </a>
                    </Link>
                    <div className="redirection-text">
                        <p>
                            {topLeftText}
                            <span>
                                <Link href={redirectionLink}>
                                    <a>{topRightText}</a>
                                </Link>
                            </span>
                        </p>
                    </div>
                    <div className={`form-wrapper ${currentPage}`}>
                        <div className="form-content">
                            <p className="welcome-text">{welcomeText}</p>
                            <p className="login-text">{headerText}</p>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OnBoardingLayout;
