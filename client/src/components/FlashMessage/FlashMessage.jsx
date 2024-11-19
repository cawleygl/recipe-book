import { useContext, useEffect, useState } from "react";
import { Container, Alert, Fade } from "react-bootstrap";
import { AlertContext } from "../../App";

export default function FlashMessage() {
  const { pageAlert, setPageAlert } = useContext(AlertContext);

	function hideAlert() {
				setPageAlert((prevValues) => {
					const newValues = { ...prevValues };
					newValues.show = false;
					return newValues;
				}
		);
	}

  useEffect(() => {
    if (pageAlert.show) {
			setTimeout(() => hideAlert(), 5000)}
  }, [pageAlert.show]);

  return (
    // <Fade in={pageAlert.length}>
    <Container>
      <Alert
        dismissible
        variant={pageAlert.variant}
        show={pageAlert.show}
        onClose={() => hideAlert()}
      >
        {pageAlert.message}
      </Alert>
    </Container>
    // </Fade>
  );
}
