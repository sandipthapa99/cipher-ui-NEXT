import { Button } from 'react-bootstrap'

interface BookNowButtonProps {
  btnTitle: string
  backgroundColor: string
  showModal: boolean
  handleOnClick: (show: any) => void
}

const BookNowButton = ({
  btnTitle,
  backgroundColor,
  showModal,
  handleOnClick,
}: BookNowButtonProps) => {
  return (
    <>
      <Button
        //className="big-btn"
        onClick={() => handleOnClick(showModal)}
        style={{ backgroundColor: `${backgroundColor}`, color: 'white' }}
      >
        <span>{btnTitle}</span>
      </Button>
    </>
  )
}
export default BookNowButton
