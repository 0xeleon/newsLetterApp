import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { getEmail, updateEmail } from './utils'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Layout from '../layout/index.jsx'

const Unsubscribed = (props) => {
    const [email, setEmail] = useState(null)
    const { mail } = useParams()

    useEffect(() => {
        console.log(mail)
        if(mail){
            initializeData(mail)
        }
    }, []);

  
    const initializeData = async (mail) => {
        let email = await getEmail(mail)
        setEmail(email)
    }

    const clickUpdate = async () => {
        let newCategories = email.categoriesList.filter(item => item.access === true)
        let body = {
            email : email.email,
            categories : newCategories
        }
        await updateEmail(body, email._id)
        await initializeData()
    }

    const changeSwitch = e => {
        const value = e.target.checked
        const categoryId = e.target.id
        let newData = {...email}
        newData.categoriesList = newData.categoriesList.map(category => {
            if(category._id === categoryId){
                category.access = value
            }
            return category
        })
        setEmail(newData)
    }

    return (
        email !== null ? 
        <>
            <Layout /> 
            <Container>        
            <Row className="justify-content-md-center">
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="dataToUpdate.name">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter category name" value={email.email} disabled/>
                        </Form.Group>
                        <Form.Label>Categories Subscribed</Form.Label>
                        {email !== null ? email.categoriesList.map((item, idx) => {
                        return (<div key={`default-${item._id}`} className="mb-3">
                            <Form.Check 
                            type='switch'
                            defaultChecked={item.access}
                            id={`${item._id}`}
                            label={`${item.name}`}
                            onChange={changeSwitch}
                            />
                        </div>)
                        }) : ''}
                    </Form>
                    <Button variant="primary" onClick={() => clickUpdate()}>Save changes </Button>{' '}
                </Col>
                <Col>
                </Col>
            </Row>
            </Container>
        </> : <h4> No email </h4>
    );

}

export default Unsubscribed;
  