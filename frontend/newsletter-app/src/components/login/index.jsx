import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Layout from '../layout/index.jsx'

const Login = (props) => {
    const [login, setLogin] = useState({})

    useEffect(() => {
        initializeData()
    }, []);

  
    const initializeData = async () => {
        
    }

    const handleSubmit = async (event, data) =>{        
        
    }

    return (
        <Container>
        <Layout />
        <Row>
            <Col>
                <p> Login</p>
                <Button variant="primary" onClick={() => handleSubmit()}>Login </Button>{' '}
            </Col>
        </Row>
        </Container>
    );
}

export default Login;
  