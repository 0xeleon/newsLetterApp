import React, {useRef, useEffect, useState} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { getCategoriesByEmail, createNewMessage } from './utils'
import SunEditor, {
    buttonList
} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'
import Layout from '../layout/index.jsx'


const Editor = props => {
    const editor = useRef();
    const fileInput = useRef();

    const [content, setContent] = useState('')
    const [subject, setSubject] = useState('')
    const [categoriesList, setCategoriesList] = useState([])
    const [categorySelect, setCategorySelect] = useState(null)

    useEffect(() => {
        initializeData()
    }, []);

  
    const initializeData = async () => {
        let categories = await getCategoriesByEmail();
        setCategoriesList(categories)
    }

    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };

    const sendInfo = async () => {
        let mails = []
        if(categorySelect !== null){
            mails = categorySelect.emailList.filter(item => item.selected === true)
        }
        
        if(subject === ''){
            alert('subject empty')
        }else if(content === ''){
            alert('content empty')
        }else if(fileInput.current.files[0] === undefined){
            alert('verify files')
        }
        else if(categorySelect === null){
            alert('category no selected')
        }else if(mails.length === 0){
            alert('no emails ')
        }
        else{
            let body = new FormData();
            body.append('uploaded_file', fileInput.current.files[0])
            body.append('content', content)
            body.append('subject', subject)
            body.append('active', true)
            body.append('emailsSend', JSON.stringify(mails))
            body.append('category', categorySelect._id)
            await createNewMessage(body)
        }
    }

    const handleOnChange = (editorContent) => setContent(editorContent)
    const selectChangeHandler = (e) => {
        if(e.target.value == 0){
            setCategorySelect(null)
        }else{
            let categorySelected = categoriesList.find(category => category._id === e.target.value)
            categorySelected.emailList = categorySelected.emailList.map(email => {
                return {
                    email : email.email,
                    _id : email._id,
                    selected : true
                }
            })
            setCategorySelect(categorySelected)
        }
    }
    const changeCheckbox = (e) => {
        const value = e.target.checked
        const emailSelect = e.target.id
        let newData = {...categorySelect}
        newData.emailList = newData.emailList.map(email => {
          if(email.email === emailSelect){
            email.selected = value
          }
          return email;
        })
        setCategorySelect(newData)
    }

    return (
        <Container>
        <Layout />
        <Row>
            <Form>
                <Form.Group className="mb-3" controlId="file">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Enter subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="file">
                    <Form.Label>File</Form.Label>
                    <Form.Control type="file" ref={fileInput}  accept="image/x-png,application/pdf,application/acrobat,application/x-google-chrome-pdf,text/pdf,text/x-pdf"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Select category</Form.Label>
                    <Form.Select aria-label="Default select example"  onChange={selectChangeHandler}>
                        <option value="0">Select category</option>
                        {categoriesList.map(item => {
                            return(<option key={item._id} value={item._id}>{item.name}</option>)
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select emails (Emails with check will be notified by email)</Form.Label>
                    {categorySelect !== null && categorySelect.emailList.length > 0 ? categorySelect.emailList.map((item, idx) => {
                        return (
                            <Form.Check 
                                type={'checkbox'}
                                defaultChecked={item.selected}
                                id={`${item.email}`}
                                key={`${idx}`}
                                label={`${item.email}`} 
                                onChange={changeCheckbox}/>
                        )
                    }) : null}
                </Form.Group>
            </Form>
            <Col>
                <SunEditor  getSunEditorInstance={getSunEditorInstance} 
                        onChange={handleOnChange} 
                        setOptions={{
                            height: 400,
                            width : 900,
                            buttonList: [
                                [
                                'undo', 'redo',
                                'font', 'fontSize', 'formatBlock',
                                'paragraphStyle', 'blockquote',
                                'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',
                                'fontColor', 'hiliteColor', 'textStyle',
                                'removeFormat',
                                'outdent', 'indent',
                                'align', 'horizontalRule', 'list', 'lineHeight',
                                'table', 'link',
                                'fullScreen', 'showBlocks', 'codeView',
                                'preview', 'print', 'template',
                                ]
                            ]

                        }} />
            </Col>
            <Button variant="primary" onClick={() => sendInfo()}>Send Newsletter </Button>{' '}
        </Row>
        </Container>
    );
};

export default Editor;