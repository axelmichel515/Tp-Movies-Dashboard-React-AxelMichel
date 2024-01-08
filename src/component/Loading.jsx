import { Spinner } from "react-bootstrap"


export const Loading = () => {
  return (
    <>
    <Spinner animation="border" variant="success" role="status">
    </Spinner>
      <span className="text-success">Loading...</span>
    </>
  )
}
