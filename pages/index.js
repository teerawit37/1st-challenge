import React, { Component } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { DataTable } from 'react-data-components';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataInput: '',
      newJson: [],
      column: [
        { title: 'id', prop: 'id'  },
        { title: 'name', prop: 'name' },
        { title: 'node_id', prop: 'node_id' },
        { title: 'full_name', prop: 'full_name' }
      ],
      testCase: 
      {
      "0":
      [{"id": 10,
      "title": "House",
      "level": 0,
      "children": [],
      "parent_id": null}],
      "1":
      [{"id": 12,
      "title": "Red Roof",
      "level": 1,
      "children": [],
      "parent_id": 10},
      {"id": 18,
      "title": "Blue Roof",
      "level": 1,
      "children": [],
      "parent_id": 10},
      {"id": 13,
      "title": "Wall",
      "level": 1,
      "children": [],
      "parent_id": 10}],
      "2":
      [{"id": 17,
      "title": "Blue Window",
      "level": 2,
      "children": [],
      "parent_id": 12},
      {"id": 16,
      "title": "Door",
      "level": 2,
      "children": [],
      "parent_id": 13},
      {"id": 15,
      "title": "Red Window",
      "level": 2,
      "children": [],
      "parent_id": 12}]},
      error: null, errorInfo: null
    }
  }
  componentDidMount() {
    this.getList();
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }
  getList() {
    fetch('https://api.github.com/repositories?since=364').then(response => response.json())
    .then(response => {
     this.setState({
       data: response
     }
     )
    })
  }
  handleChange = (event) => {
    this.setState({dataInput: event.target.value});
  }
  IsValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
  changeObject = () => {
    const { dataInput, errorInfo } = this.state;
    if(this.IsValidJSONString(dataInput)){
    var a = JSON.parse(dataInput);
    let final = [];
    for (let key in a) {
      if (!a.hasOwnProperty(key)) continue;
      let obj = a[key];
        for (let prop in obj) {
          if (!obj.hasOwnProperty(prop)) continue;
          final.push(obj[prop])
           console.log(key +  " = " + obj[prop].level)
      }
    }
  this.listToTree(final)
    }else{
      alert('please input correct json format')
    }
  }

  listToTree(list) {
    let map = {}, node, roots = [];
    list.forEach((element, index) => {
      map[element.id] = index; 
      element.children = [];
    })
    list.forEach(element => {
      node = element;
      if(node.parent_id !== null){
        list[map[node.parent_id]].children.push(node);
      }else{
        roots.push(node);
      }
    })
    this.setState({newJson: roots});
  }


  render(){
  const { data, column, newJson, dataInput } = this.state;
  return (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
      <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/carlosrocha/react-data-components@master/css/table-twbs.css"/>
    </Head>

    <Nav />
    <Container>
      <h1 className="title">Welcome to 1st Challenge!</h1>
      <div className="padding-hero">
      <DataTable
      keys="name"
      columns={column}
      initialData={data}
      initialPageLength={10}
      />
      </div>
      <Row>
      <h1 className="title">Welcome to 2nd Challenge!</h1>
        <Col>
        <Form>
        <Button variant="primary" onClick={() => this.changeObject()}>convert</Button>
         <Form.Group controlId="input-json">
            <Form.Label>input json</Form.Label>
            <Form.Control as="textarea" value={dataInput} rows="30" onChange={(e) => this.handleChange(e)}/>
         </Form.Group>
        </Form>
          </Col>
        <Col>
            <pre className="pre-size">{
              JSON.stringify(newJson, 0, 4)
            }</pre></Col>
        </Row>
            
      </Container>
   
    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .full-width {
        width: 100%;
        height: 100%;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
        margin-bottom: 15px;
      }
      .title,
      .description {
        text-align: center;
      }
      .pre-size {
        height: 458px;
        margin-top: 45px;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
  )
  }
}

export default Home


