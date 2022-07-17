import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useCategories } from '@/hooks'
import Image from 'next/image'
const MENU_ITEMS = [
  'Household',
  'Health & Care',
  'Beauty',
  'Maintenance',
  'Fitness',
  'Training Classes',
  'Educational Classes',
  'Audio Visual',
  'Party Planner',
]
const SUB_MENU_ITEMS = [
  'House Cleaning (1,000)',
  'Gardening (150)',
  'Dry Cleaner & laundry (1500)',
  'Cook (500)',
  'Kitchen Helper (300)',
  'Pest Control (200)',
]

interface DropdownItemProps {
  items: string[]
  children?: ReactNode
  haveSubMenu?: boolean
  isNested?: boolean
  onClick?: () => void
}
interface DropdownProps {
  title: string
}

const DropdownItem = ({
  items,
  haveSubMenu,
  children,
  isNested,
  onClick,
}: DropdownItemProps) => {
  return (
    <ul
      className="dropdown-menu-items"
      data-is-nested={JSON.stringify(isNested)}
    >
      {haveSubMenu ? <p className="all-category">All Categories</p> : ''}
      <figure className="thumbnail-img">
        <Image
          src="/icons/Polygon.svg"
          layout="fill"
          className="polygon"
          objectFit="cover"
        />
      </figure>
      {items.map((item, key) => (
        <li onClick={onClick} className="dropdown-menu-item" key={key}>
          <Link href="">
            <a className="dropdown-menu-item-link">{item}</a>
          </Link>
          {haveSubMenu ? (
            <FontAwesomeIcon icon={faChevronRight} className="svg-icon" />
          ) : (
            ''
          )}
        </li>
      ))}
      {children && <>{children}</>}
    </ul>
  )
}

export const Dropdown = ({ title }: DropdownProps) => {
  const [opened, setOpened] = useState(false)
  const [secondaryOpened, setSecondaryOpened] = useState(false)
  const [tertiaryOpened, setTertiaryOpened] = useState(false)

  const toggleDropdown = () => setOpened(!opened)

  const closeAllDropdown = () => {
    setOpened(false)
    setSecondaryOpened(false)
    setTertiaryOpened(false)
  }

  return (
    <div className="dropdown-wrapper">
      {opened && (
        <div
          role="button"
          className="dropdown-menu-overlay"
          onClick={closeAllDropdown}
        />
      )}
      <div className="dropdown-menu-container">
        {' '}
        <button className="dropdown-btn" onClick={toggleDropdown}>
          Categories{' '}
        </button>{' '}
        <div className="dropdowns">
          {opened && (
            <DropdownItem
              haveSubMenu={true}
              onClick={() => setSecondaryOpened(!secondaryOpened)}
              items={MENU_ITEMS}
            />
          )}
          {opened && secondaryOpened && (
            <DropdownItem
              items={SUB_MENU_ITEMS}
              haveSubMenu={false}
              isNested={true}
              onClick={() => setTertiaryOpened(!tertiaryOpened)}
            />
          )}
          {/* {opened && secondaryOpened && tertiaryOpened && (
            <DropdownItem items={MENU_ITEMS} />
          )}{' '} */}
        </div>
      </div>
    </div>
  )
}
