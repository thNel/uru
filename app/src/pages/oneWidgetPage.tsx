import {Container} from "react-bootstrap";
import {ReactElement} from "react";

const OneWidgetPage = ({children}: {children: ReactElement}) => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-3 gap-4">
      {children}
    </Container>
  )
}

export default OneWidgetPage;