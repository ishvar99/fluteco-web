import React from 'react'
import {Modal,Button} from 'react-bootstrap'
const AlertModal = (props) => {
 return (
  <Modal
  {...props}
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header>
    <Modal.Title id="contained-modal-title-vcenter">
      Stock Limit Exceeded
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>
    Sorry, you have reached the stock limit of this product.
    We have updated your quantity to the maximum possible limit.
    </p>
  </Modal.Body>
  <Modal.Footer>
    <Button style={{background:'#ff7043',border:'none',boxShadow:'none'}} onClick={props.onHide}>Close</Button>
  </Modal.Footer>
</Modal>
);
}

export default AlertModal
