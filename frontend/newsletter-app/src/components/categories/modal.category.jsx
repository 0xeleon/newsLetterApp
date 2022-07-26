import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ModalCategory = (props) => {
  const [show, setShow] = useState(false)
  const [dataToUpdate, setDataToUpdate] = useState(props.category)

  useEffect(() => {
    initializeData();
  }, [props]);

  const initializeData = () => {
    if(props.category && props.typeModal){
      setDataToUpdate(props.category) 
    }
  }

  const submit = (event) => {
    console.log('submit')
    console.log(dataToUpdate)
    props.onApplyModal(event, dataToUpdate)
  }

  const hide = (event) => {
    props.onCloseModal(event);
  }

  const inputChangeHandler = e => {
    const value = e.target.value
    let obj = {...dataToUpdate}
    obj.name = value
    setDataToUpdate(obj)
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={hide}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>{props.typeModal ? props.typeModal.toUpperCase() : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="dataToUpdate.name">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name" value={dataToUpdate.name} onChange={inputChangeHandler}/>
            </Form.Group>          
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={submit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCategory;