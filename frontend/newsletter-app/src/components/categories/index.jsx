import React, {useState, useEffect} from 'react'
import { getCategories, updateCategory, deleteCategory, createCategory } from './utils'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import ModalCategory from './modal.category.jsx'
import Layout from '../layout/index.jsx'

const Categories = (props) => {
    const [categoriesList, setCategoriesList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [category, setCategory] = useState({})
    const [typeModal, setTypeModal] = useState(null)

    useEffect(() => {
        initializeData()
    }, []);

  
    const initializeData = async () => {
        let categories = await getCategories();
        setCategoriesList(categories)
    }

    const clickUpdate = (item) => {
        setTypeModal('update')
        setShowModal(true)
        setCategory(item)
    }

    const clickNew = () => {
        console.log('ger')
        setCategory({
            name : ''
        })
        setTypeModal('new')
        setShowModal(true)
    }


    const clickDelete = async(item) => {        
        setCategory({})
        await deleteCategory(item._id);
        await initializeData()
    }

    const HandleCloseModal = (event, data) => {
        setCategory({})
        setShowModal(false)
        setCategory(null)
    }

    const handleSubmit = async (event, data) =>{        
        setShowModal(false);
        console.log('handlesubmot', data)
        let body = {
            name : data.name
        }
        if(typeModal === 'update'){
            await updateCategory(body, data._id)
            setTypeModal(null)
            await initializeData()
        }else{
            body.active = true;
            await createCategory(body)
            setTypeModal(null)
            await initializeData()
        }
        setCategory({})
        
    }

    return (
        <Container>        
        <Layout />
        <Row>
            <Col>
            <ModalCategory show={showModal} typeModal={typeModal} category={category} onCloseModal={HandleCloseModal} onApplyModal={handleSubmit} />
            <Button variant="primary" onClick={() => clickNew()}>Create new record </Button>{' '}
            <Table responsive="sm">
                <thead>
                    <tr>                
                        <th>Name</th>
                        <th>Active</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriesList.map(item =>{
                        return (
                            <tr key={item._id}>
                                <td> {item.name} </td>
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

export default Categories;
  