import React, { Component } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import _ from 'lodash';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { DataTable } from 'react-data-components';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newJson: [],
      column: [
        { title: 'id', prop: 'id'  },
        { title: 'name', prop: 'name' },
        { title: 'pulls_url', prop: 'pulls_url' },
        { title: 'full_name', prop: 'full_name' }
      ],
      a: 
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
      "parent_id": 12}]}
    }
  }
  componentDidMount() {
    this.getList();
    this.changeObject();
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
  changeObject() {
    const { a } = this.state;
    var final = [];
    for (var key in a) {
      if (!a.hasOwnProperty(key)) continue;
      var obj = a[key];
        for (var prop in obj) {
          if (!obj.hasOwnProperty(prop)) continue;
          final.push(obj[prop])
           console.log(key +  " = " + obj[prop].level)
      }
    }
  console.log('final array: ', final)
  
  this.convertJson(final);
  }

  convertJson(array){
  var data = [];
  var pointer = [];
  array.forEach(element => {
    if(element.parent_id == null){
      data[element['id']] = element;
      pointer[element['id']] = data[element['id']]; 
    }else{
      pointer[element['parent_id']]['children'][element['id']] = element;
      pointer[element['id']] = pointer[element['parent_id']]['children'][element['id']];
    }
  });
  var cleanArray = data.filter(function () { return true });
  console.log('final json: ', cleanArray)
  this.setState({newJson: cleanArray});
  }

  removeEmptyOrNull = (obj) => {
    Object.keys(obj).forEach(k =>
      (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
      (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
  }


  render(){
  const { data, column, newJson } = this.state;
  return (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/carlosrocha/react-data-components@master/css/table-twbs.css"/>
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">Welcome to 1st Challenge!</h1>
      <DataTable
      keys="name"
      columns={column}
      initialData={data}
      initialPageLength={10}
      />
      <pre>{
              JSON.stringify(newJson)
            }</pre>

      </div>
 
   
    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
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


