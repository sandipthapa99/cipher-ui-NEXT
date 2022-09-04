import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { useCallback, useEffect, useRef } from "react";
import type { DropdownSubMenu } from "staticData/dropdownData";
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

    const toggleDropdown = () => {
        setIsMenuOpened(!isMenuOpened);
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

    useEffect(() => {
        axiosClient
            .get("/task/task-category/nested/")
            .then(({ data }) => {
                setMenu(data);
            })
            .catch(() => {
                setMenu([]);
            });
    }, []);

    const renderNestedSubMenus = nestedMenu.map((sub: any, index) => {
        const menu = sub.name.replaceAll(" ", "").toLowerCase();
        if (sub?.child.length > 0) {
            return (
                <li
                    key={index}
                    className="dropdown-menu-items d-flex justify-space-between"
                >
                    <Link href="#!">
                        <a className="dropdown-menu-item-link">{`${menu} (${sub?.child?.length})`}</a>
                    </Link>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="svg-icon"
                    />
                </li>
            );
        }
        return (
            <li className="dropdown-menu-items" key={index}>
                <Link href={`/category/${menu}`} passHref>
                    <a
                        onClick={() => {
                            setIsMenuOpened(false);
                            setIsSubMenuOpened(false);
                            setIsNestedSubMenuOpened(false);
                        }}
                        className="dropdown-menu-item-link"
                    >{`${menu} (${sub?.child?.length})`}</a>
                </Link>
            </li>
        );
    });

    const renderSubMenus = subMenu.map((sub: any, index: any) => {
        const menu = sub.name.replaceAll(" ", "").toLowerCase();

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
                    onClick={onHandleDropdown}
                >
                    <Link href="#!">
                        <a className="dropdown-menu-item-link">{`${menu} (${sub?.child?.length})`}</a>
                    </Link>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="svg-icon"
                    />
                </li>
            );
        }
        return (
            <li className="dropdown-menu-items" key={index}>
                <Link href={`/category/${menu}`} passHref>
                    <a
                        onClick={() => {
                            setIsMenuOpened(false);
                            setIsSubMenuOpened(false);
                            setIsNestedSubMenuOpened(false);
                        }}
                        className="dropdown-menu-item-link"
                    >{`${menu} (${sub?.child?.length})`}</a>
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
                onClick={onHandleDropdown}
            >
                <Link href="#!">
                    <a className="dropdown-menu-item-link">{item.name}</a>
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className="svg-icon" />
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
                    <div className="dropdown-menu-items">
                        <p className="all-category">All Category</p>{" "}
                        {renderMenus}
                        {/*View All  */}
                        <li className="dropdown-menu-items d-flex justify-space-between">
                            <Link href="/category">
                                <a className="dropdown-menu-item-link fw-bold">
                                    View All Category
                                </a>
                            </Link>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="svg-icon"
                            />
                        </li>
                    </div>
                )}

                {isMenuOpened && isSubMenuOpened && (
                    <div className="dropdown-menu-items sub-menu">
                        {renderSubMenus.length > 0
                            ? renderSubMenus
                            : "Sub Categories not avilable"}
                    </div>
                )}

                {isMenuOpened && isSubMenuOpened && isNestedSubMenuOpened && (
                    <div className="dropdown-menu-items sub-menu">
                        {renderNestedSubMenus}
                    </div>
                )}
            </div>
        </div>
    );
};
function item(item: any) {
    throw new Error("Function not implemented.");
}
