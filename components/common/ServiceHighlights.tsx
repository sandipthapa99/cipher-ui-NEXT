const ServiceHighlights = ({
  title,
  isChecked,
}: {
  title: string
  isChecked: boolean
}) => {
  return (
    <div className="py-2 checkbox d-flex align-items-center">
      <input
        type="checkbox"
        className="input"
        id="defaultIndeterminate"
        checked={isChecked}
        onChange={() => {}}
      />
      <label className="label" style={{ marginLeft: '1.5rem' }}>
        {title}
      </label>
    </div>
  )
}
export default ServiceHighlights
