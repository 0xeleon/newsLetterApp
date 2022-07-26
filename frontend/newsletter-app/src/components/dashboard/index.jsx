import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Layout from '../layout/index.jsx'

import { getAnalytics } from './utils';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';


const Dashboard = (props) => {
    const [login, setLogin] = useState({})
    const [data, setData] = useState([])
    const data1 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

    useEffect(() => {
        initializeData()
    }, []);

  
    const initializeData = async () => {
        let data = await getAnalytics()
        setData(data)
    }

    return (
        <Container>
        <Layout />
        <Row>
            <Col>
                <p> Dashboard otal sent emails by category </p>
                <LineChart width={600} height={300} data={data}>
                    <Line type="monotone" dataKey="totalEmails" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
            </Col>
        </Row>
        </Container>
    );
}

export default Dashboard;
  