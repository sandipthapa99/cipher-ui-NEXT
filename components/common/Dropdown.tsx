import { Skeleton } from "@mantine/core";
import { ChevronRight } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import parse from "html-react-parser";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { useCallback, useEffect, useRef } from "react";
import type { DropdownSubMenu } from "types/DropDownProps";
import { axiosClient } from "utils/axiosClient";

interface DropdownProps {
    children?: ReactNode;
}
export const Dropdown = ({ children }: DropdownProps) => {
    const [menu, setMenu] = useState<DropdownSubMenu>([]); //available menu
    const [subMenu, setSubMenu] = useState<DropdownSubMenu>([]);
    const [nestedMenu, setNestedMenu] = useState<DropdownSubMenu>([]);
    const [prevIndex, setPrevIndex] = useState();
    const dropdownContainer = useRef<HTMLDivElement | null>(null);
    const [isSubMenuOpened, setIsSubMenuOpened] = useState(false);
    const [isNestedSubMenuOpened, setIsNestedSubMenuOpened] = useState(false);

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const [callApi, setCallApi] = useState(false);

    const toggleDropdown = () => {
        setIsMenuOpened(!isMenuOpened);
        setCallApi(true);
    };

    //function to make dropdown disappear after clicking outside of the dropdown container
    const handleBodyClick = useCallback(
        (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (
                dropdownContainer.current &&
                isMenuOpened &&
                !dropdownContainer.current?.contains(target)
            ) {
                setIsMenuOpened(false);
            }
        },
        [isMenuOpened, setIsMenuOpened]
    );

    /**
     * Hook that detect clicks outside of the passed ref
     */
    const useOutsideAlerter = (ref: any) => {
        useEffect(() => {
            /**
             * Detect if clicked on outside of dropdown component
             */
            const handleClickOutside = (event: any) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsMenuOpened(false);
                    setIsSubMenuOpened(false);
                    setIsNestedSubMenuOpened(false);
                }
            };

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    };

    useEffect(() => {
        document.body.addEventListener("mousedown", handleBodyClick);
        return () => {
            document.body.removeEventListener("mousedown", handleBodyClick);
        };
    }, [handleBodyClick]);

    const { isLoading } = useQuery(
        ["nested-category"],
        () =>
            axiosClient
                .get<DropdownSubMenu>(urls.category.list)
                .then(({ data }) => {
                    setMenu(data?.slice(0, 10));
                }),
        {
            enabled: callApi,
            staleTime: Infinity,
        }
    );

    const renderNestedSubMenus = nestedMenu.map((sub: any, index) => {
        if (sub?.child.length > 0) {
            return (
                <li
                    key={index}
                    className="dropdown-menu-items d-flex justify-space-between"
                >
                    <Link href={`/category/${sub.slug}`}>
                        <a
                            onClick={() => {
                                setIsMenuOpened(false);
                                setIsSubMenuOpened(false);
                                setIsNestedSubMenuOpened(false);
                            }}
                            className="dropdown-menu-item-link d-flex gap-4"
                        >
                            {" "}
                            {`${sub.name}`}{" "}
                        </a>
                    </Link>
                </li>
            );
        }
        return (
            <li className="dropdown-menu-items" key={index}>
                <Link href={`/category/${sub.slug}`} passHref>
                    <a
                        onClick={() => {
                            setIsMenuOpened(false);
                            setIsSubMenuOpened(false);
                            setIsNestedSubMenuOpened(false);
                        }}
                        className="dropdown-menu-item-link d-flex gap-4"
                    >
                        {" "}
                        {`${sub.name}`}{" "}
                    </a>
                </Link>
            </li>
        );
    });

    const renderSubMenus = subMenu.map((sub: any, index: any) => {
        if (sub?.child.length > 0) {
            const onHandleDropdown = () => {
                const subMenuItems = sub?.child;
                setNestedMenu(subMenuItems);

                if (subMenu.indexOf(sub) === index) {
                    setIsNestedSubMenuOpened((prev) => !prev);
                    setPrevIndex(index);
                }
                if (prevIndex !== index) {
                    setIsNestedSubMenuOpened(true);
                }
            };
            return (
                <li
                    key={index}
                    className="dropdown-menu-items d-flex justify-space-between"
                >
                    <Link href={`/category/${sub.slug}`}>
                        <a
                            onClick={() => {
                                setIsMenuOpened(false);
                                setIsSubMenuOpened(false);
                                setIsNestedSubMenuOpened(false);
                            }}
                            onMouseOver={onHandleDropdown}
                            className="dropdown-menu-item-link d-flex gap-4"
                        >
                            {" "}
                            {`${sub.name}`}{" "}
                            {sub?.child?.length > 0
                                ? `(${sub?.child?.length})`
                                : ""}
                        </a>
                    </Link>
                    <ChevronRight className="svg-icon" />
                </li>
            );
        }
        return (
            <li className="dropdown-menu-items" key={index}>
                <Link href={`/category/${sub.slug}`} passHref>
                    <a
                        onClick={() => {
                            setIsMenuOpened(false);
                            setIsSubMenuOpened(false);
                            setIsNestedSubMenuOpened(false);
                        }}
                        className="dropdown-menu-item-link d-flex gap-4"
                    >
                        {" "}
                        {`${sub.name}`}
                        {sub?.child?.length > 0
                            ? `(${sub?.child?.length})`
                            : ""}
                    </a>
                </Link>
            </li>
        );
    });

    const renderMenus = menu.map((item: any, index: any) => {
        const onHandleDropdown = () => {
            const subMenuItems = item?.child;
            setSubMenu(subMenuItems);
            //reseting nested menu
            setNestedMenu([]);
            setIsNestedSubMenuOpened(false);
            if (menu.indexOf(item) === index) {
                setIsSubMenuOpened((prev) => !prev);
                setPrevIndex(index);
            }
            if (prevIndex !== index) {
                setIsSubMenuOpened(true);
            }
        };
        return (
            <li
                key={index}
                className="dropdown-menu-items d-flex justify-space-between"
            >
                <Link href={`/category/${item.slug}`}>
                    <a
                        onMouseOver={onHandleDropdown}
                        onClick={() => {
                            setIsMenuOpened(false);
                            setIsSubMenuOpened(false);
                            setIsNestedSubMenuOpened(false);
                        }}
                        className="dropdown-menu-item-link d-flex gap-4"
                    >
                        <div className="image-wrapper">
                            <figure className="d-flex align-items-center justify-content-center thumbnail-icon">
                                {item?.icon
                                    ? parse(item?.icon)
                                    : parse(
                                          `<svg width="464" height="464" viewBox="0 0 464 464" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M144 0C170.5 0 192 21.49 192 48V144C192 170.5 170.5 192 144 192H48C21.49 192 0 170.5 0 144V48C0 21.49 21.49 0 48 0H144ZM144 48H48V144H144V48ZM144 256C170.5 256 192 277.5 192 304V400C192 426.5 170.5 448 144 448H48C21.49 448 0 426.5 0 400V304C0 277.5 21.49 256 48 256H144ZM144 304H48V400H144V304ZM256 48C256 21.49 277.5 0 304 0H400C426.5 0 448 21.49 448 48V144C448 170.5 426.5 192 400 192H304C277.5 192 256 170.5 256 144V48ZM304 144H400V48H304V144ZM352 240C365.3 240 376 250.7 376 264V328H440C453.3 328 464 338.7 464 352C464 365.3 453.3 376 440 376H376V440C376 453.3 365.3 464 352 464C338.7 464 328 453.3 328 440V376H264C250.7 376 240 365.3 240 352C240 338.7 250.7 328 264 328H328V264C328 250.7 338.7 240 352 240Z"/>
                                  </svg>`
                                      )}
                            </figure>
                        </div>
                        {item.name}
                    </a>
                </Link>
                {item?.child.length > 0 && (
                    <ChevronRight className="svg-icon angle-right" />
                )}
            </li>
        );
    });

    useOutsideAlerter(dropdownContainer); //this will detect if user clicked outside this component
    return (
        <div className="dropdown-menu-container" ref={dropdownContainer}>
            <div className="btn-content" onClick={toggleDropdown} role="button">
                {children && <>{children}</>}
            </div>

            <div className={`dropdown ${isMenuOpened ? "arrow" : ""}`}>
                {isMenuOpened && (
                    <div className="dropdown-menu-items item-wrapper">
                        <p className="all-category">All Category</p>{" "}
                        {!isLoading && renderMenus}
                        {isLoading && (
                            <div className="px-3">
                                <Skeleton
                                    height={10}
                                    radius="xl"
                                    mb={20}
                                    mt={10}
                                />
                                <Skeleton height={10} radius="xl" mb={20} />
                                <Skeleton height={10} radius="xl" mb={20} />
                                <Skeleton height={10} radius="xl" mb={20} />
                                <Skeleton height={10} radius="xl" mb={20} />
                                <Skeleton height={10} radius="xl" mb={20} />
                                <Skeleton height={10} radius="xl" mb={20} />
                                <Skeleton height={10} radius="xl" mb={20} />
                            </div>
                        )}
                        {/*View All  */}
                        <li className="dropdown-menu-items d-flex justify-space-between">
                            <Link href="/category">
                                <a
                                    className="dropdown-menu-item-link fw-2"
                                    style={{
                                        color: "#3EAEFF",
                                    }}
                                >
                                    View More
                                </a>
                            </Link>
                        </li>
                    </div>
                )}

                {isMenuOpened &&
                    isSubMenuOpened &&
                    (renderSubMenus.length > 0 ? (
                        <div className="dropdown-menu-items sub-menu">
                            {renderSubMenus}
                        </div>
                    ) : (
                        ""
                    ))}

                {isMenuOpened && isSubMenuOpened && isNestedSubMenuOpened && (
                    <div className="dropdown-menu-items sub-menu">
                        {renderNestedSubMenus}
                    </div>
                )}
            </div>
        </div>
    );
};
