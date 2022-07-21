import { Button } from 'react-bootstrap'

interface BigButtonProps {
  btnTitle: string
  backgroundColor: string
  textColor?: string
}

const BigButton = ({
  btnTitle,
  backgroundColor,
  textColor,
}: BigButtonProps) => {
  return (
    <>
      <Button
        className="big-btn"
        style={{
          backgroundColor: `${backgroundColor}`,
          color: `${textColor}!important`,
        }}
      >
        <span>{btnTitle}</span>
      </Button>
    </>
  )
}
export default BigButton
