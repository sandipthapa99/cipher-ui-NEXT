import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { useCallback, useEffect, useRef } from "react";
import { DropdownSubMenu, DUMMY_MENU_ITEMS } from "staticData/dropdownData";
import { randNumber } from "utils/randNumber";

interface DropdownProps {
    children?: ReactNode;
}
export const Dropdown = ({ children }: DropdownProps) => {
    const [subMenu, setSubMenu] = useState<DropdownSubMenu>([]);
    const [prevIndex, setPrevIndex] = useState();
    const dropdownContainer = useRef<HTMLDivElement | null>(null);
    const [isSubMenuOpened, setIsSubMenuOpened] = useState(false);
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

    useEffect(() => {
        document.body.addEventListener("mousedown", handleBodyClick);
        return () => {
            document.body.removeEventListener("mousedown", handleBodyClick);
        };
    }, [handleBodyClick]);

    const renderSubMenus = subMenu.map((sub, index) => {
        const menu = sub.replaceAll(" ", "-").toLowerCase();
        return (
            <li className="dropdown-menu-items" key={index}>
                <Link href={`/category/${menu}`} passHref>
                    <a className="dropdown-menu-item-link">{`${sub} (${randNumber()})`}</a>
                </Link>
            </li>
        );
    });
    const renderMenus = DUMMY_MENU_ITEMS.map((item: any, index: any) => {
        const onHandleDropdown = () => {
            const subMenuItems = item.subMenu;

            setSubMenu(subMenuItems);

            if (DUMMY_MENU_ITEMS.indexOf(item) === index) {
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
                    </div>
                )}

                {isMenuOpened && isSubMenuOpened && (
                    <div className="dropdown-menu-items sub-menu">
                        {renderSubMenus}
                    </div>
                )}
            </div>
        </div>
    );
};
