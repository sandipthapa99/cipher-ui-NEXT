import { Button } from "react-bootstrap"

interface BigButtonProps {
  btnTitle: string
  backgroundColor: string
  textColor?: string
  handleClick?: () => void
}

const BigButton = ({
  btnTitle,
  backgroundColor,
  textColor,
  handleClick,
}: BigButtonProps) => {
  return (
    <>
      <Button
        className="big-btn"
        style={{
          backgroundColor: `${backgroundColor}`,
          color: `${textColor}!important`,
        }}
        onClick={handleClick}
      >
        <span>{btnTitle}</span>
      </Button>
    </>
  )
}
export default BigButton

