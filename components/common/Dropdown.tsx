import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DUMMY_MENU_ITEMS } from 'staticData/dropdownData'
import Image from 'next/image'

interface DropdownProps {
  children?: ReactNode
}
export const Dropdown = ({ children }: DropdownProps) => {
  const [subMenu, setSubMenu] = useState([])
  const [prevIndex, setPrevIndex] = useState()

  const [isSubMenuOpened, setIsSubMenuOpened] = useState(false)
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const toggleDropdown = () => {
    setIsMenuOpened(!isMenuOpened)
  }
  const renderSubMenus = subMenu.map((sub, index) => {
    return (
      <li className="dropdown-menu-items" key={index}>
        <Link href="/">
          <a className="dropdown-menu-item-link">{sub}</a>
        </Link>
      </li>
    )
  })
  const renderMenus = DUMMY_MENU_ITEMS.map((item: any, index: any) => {
    const onHandleDropdown = () => {
      console.log(isSubMenuOpened)

      console.log(DUMMY_MENU_ITEMS.indexOf(item), index)
      const subMenuItems = item.subMenu

      setSubMenu(subMenuItems)

      if (DUMMY_MENU_ITEMS.indexOf(item) === index) {
        setIsSubMenuOpened((prev) => !prev)
        setPrevIndex(index)
      }
      if (prevIndex !== index) {
        setIsSubMenuOpened(true)
      }
    }

    return (
      <li
        className="dropdown-menu-items d-flex justify-space-between"
        onClick={onHandleDropdown}
      >
        <Link href="/">
          <a className="dropdown-menu-item-link">{item.name}</a>
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className="svg-icon" />
      </li>
    )
  })
  return (
    <div className="dropdown-menu-container">
      <div className="btn-content" onClick={toggleDropdown} role="button">
        {children && <>{children}</>}
      </div>

      <div className="dropdowns">
        {isMenuOpened ? (
          <figure className="thumbnail-img">
            <Image
              src="/icons/Polygon.svg"
              layout="fill"
              className="polygon"
              objectFit="cover"
            />
          </figure>
        ) : (
          ''
        )}

        {isMenuOpened && (
          <div className="dropdown-menu-items">
            <p className="all-category">All Category</p> {renderMenus}
          </div>
        )}

        {isMenuOpened && isSubMenuOpened && (
          <div className="dropdown-menu-items sub-menu">{renderSubMenus}</div>
        )}
      </div>
    </div>
  )
}
