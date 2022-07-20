export interface BookNowModalCardProps {
  title: string
  price: number
  description: string

  //completionDate: string
  //   estimatedTime: number
  problemDescription?: string
  show?: boolean
  handleClose?: () => void
  image: string
}
