import React, { Component } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import { DataTable } from 'react-data-components';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      column: [
        { title: 'id', prop: 'id'  },
        { title: 'name', prop: 'name' },
        { title: 'pulls_url', prop: 'pulls_url' },
        { title: 'full_name', prop: 'full_name' }
      ]
    }
  }
  componentDidMount() {
    this.getList();
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
  render(){
  const { data, column } = this.state;
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
      <p className="description">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>
      <DataTable
      keys="name"
      columns={column}
      initialData={data}
      initialPageLength={10}
      />
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


