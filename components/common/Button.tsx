import { Button } from 'react-bootstrap'

interface BigButtonProps {
  btnTitle: string
  backgroundColor: string
}

const BigButton = ({ btnTitle, backgroundColor }: BigButtonProps) => {
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
