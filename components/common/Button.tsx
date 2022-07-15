import { Button } from 'react-bootstrap'

const BigButton = ({
  btnTitle,
  backgroundColor,
}: {
  btnTitle: string
  backgroundColor: string
}) => {
  return (
    <>
      <Button
        className="big-btn"
        style={{ backgroundColor: `${backgroundColor}` }}
      >
        <span>{btnTitle}</span>
      </Button>
    </>
  )
}
export default BigButton
