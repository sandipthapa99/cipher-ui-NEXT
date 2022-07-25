import { faRemove } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import { Button } from 'react-bootstrap'
import { HelpSearchValueProps } from 'types/searchArticle'

const SearchArticle = ({ search_category }: HelpSearchValueProps) => {
  return (
    <div className="search-field">
      {/* <input
        type="text"
        className="input"
        //value={search_category}
        placeholder={search_category}
      /> */}
      <div className="category">
        <p>{search_category}</p>
      </div>
      <Button className="search-btn">
        <FontAwesomeIcon icon={faRemove} className="icon" />
      </Button>
    </div>
  )
}
export default SearchArticle
