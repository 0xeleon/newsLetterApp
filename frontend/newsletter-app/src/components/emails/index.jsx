import React, {useState, useEffect} from 'react'
import { getEmails, createEmail, updateEmail, deleteEmail } from './utils'
import { getCategories } from '../categories/utils'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import ModalEmail from './email.modal.jsx'
import Layout from '../layout/index.jsx'

const Emails = (props) => {
    const [emailsList, setEmailsList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [email, setEmail] = useState({})
    const [typeModal, setTypeModal] = useState(null)
    const [categoriesList, setCategoriesList] = useState([])

    useEffect(() => {
        initializeData()
    }, []);

  
    const initializeData = async () => {
        let emails = await getEmails()
        let categories = await getCategories()
        setCategoriesList(categories)
        setEmailsList(emails)
    }

    const clickUpdate = (item) => {
        setTypeModal('update')
        setShowModal(true)

        item.listCategories = categoriesList.map(category => {
            let lookup = item.categories.find(cat => cat._id === category._id) ? true : false;
            return {
                name : category.name,
                assigned : lookup,
                _id : category._id
            }
        });
        setEmail(item)
    }

    const clickNew = () => {
        setTypeModal('new')
        let item = {
            name : ''
        }
        item.listCategories = categoriesList.map(category => {
            return {
                name : category.name,
                assigned : false,
                _id : category._id
            }
        })
        setEmail(item)
        setShowModal(true)
    }


    const clickDelete = async(item) => {        
        await deleteEmail(item._id);
        await initializeData()
    }

    const HandleCloseModal = (event, data) => {
        setShowModal(false)
        setEmail(null)
    }

    const handleSubmit = async (event, data) =>{
        setShowModal(false);
        console.log('handlesubmot', data)
        let newCategories = []
        data.listCategories.forEach(category => {
            if(category.assigned === true){
                newCategories.push(category._id)
            }
        });

        let body = {
            email : data.email,
            categories : newCategories
        }
        if(typeModal === 'update'){
            await updateEmail(body, data._id)
            setTypeModal(null)
            await initializeData()
        }else{
            body.active = true;
            await createEmail(body)
            setTypeModal(null)
            await initializeData()
        }
        
    }

    return (
        <Container>
        <Layout />
        <Row>
            <Col>
            <ModalEmail show={showModal} typeModal={typeModal} email={email} categories={categoriesList} onCloseModal={HandleCloseModal} onApplyModal={handleSubmit} />
            <Button variant="primary" onClick={() => clickNew()}>Create new record </Button>{' '}
            <Table responsive="sm">
                <thead>
                    <tr>                
                        <th>Email</th>
                        <th>Active</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {emailsList.map(item =>{
                        return (
                            <tr key={item._id}>
                                <td> {item.email} </td>
                                <td> {item.active ? 'Yes' : 'No'} </td>
                                <td>  <Button variant="outline-primary" onClick={() => clickUpdate(item)}>
                                    Update</Button>{' '} </td>
                                <td>  <Button variant="outline-danger" onClick={() => clickDelete(item)}>
                                    Delete</Button>{' '} 
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            </Col>
        </Row>
        </Container>
    );
}

export default Emails;
  