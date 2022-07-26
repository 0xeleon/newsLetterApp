import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const ModalEmail = (props) => {
  const [show, setShow] = useState(false)
  const [dataToUpdate, setDataToUpdate] = useState(props.email)
  // const []

  useEffect(() => {
    initializeData();
  }, [props]);

  const initializeData = () => {
    if(props.email && props.typeModal){
      setDataToUpdate(props.email) 
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
    let newData = {...dataToUpdate}
    newData.email = value
    setDataToUpdate(newData)
  }

  const changeSwitch = e => {
    const value = e.target.checked
    const categoryId = e.target.id
    let newData = {...dataToUpdate}
    newData.listCategories = newData.listCategories.map(category => {
      if(category._id === categoryId){
        category.assigned = value
      }
      return category;
    })
    setDataToUpdate(newData)
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
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter category name" value={dataToUpdate.email} onChange={inputChangeHandler}/>
            </Form.Group>
            <Form.Label>Categories Subscribed</Form.Label>
            {dataToUpdate.listCategories ? dataToUpdate.listCategories.map((item, idx) => {
              return (<div key={`default-${item._id}`} className="mb-3">
                <Form.Check 
                  type='switch'
                  defaultChecked={item.assigned}
                  id={`${item._id}`}
                  label={`${item.name}`}
                  onChange={changeSwitch}
                />
              </div>)
            }) : ''}
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

export default ModalEmail;