import React, { Component } from 'react';
import './index.css';
import AWS from 'aws-sdk';
import axios from 'axios';
import CryptoJS from 'crypto-js';
//var apigClient = apigClientFactory.newClient();

class App extends Component {

  handleSubmit(e) {

     const options = {
       method: 'POST',
       headers : {	
       'Content-Type': 'application/json' ,
       'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': '*'
      },
       url: 'https://vcf87egfsl.execute-api.us-east-1.amazonaws.com/Stage/octank',
       data: JSON.stringify('{"message": "enjoy world"}'),
      withCredentials: true
       };
    console.log("hello");
    axios.request(options).then((res) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000")
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods","POST");
      
      console.log(res);
    }).catch( (error) => {
      console.error(error);
    });
  
    // axios({
    //   method: 'POST',
    //   data: JSON.stringify(data),
    //   headers: { 'Content-Type': 'application/json' },
    //   url: api,
    // })
    //   .then((response) => {
    //     console.log(response);
    //     const el = document.querySelector('#myImage');
    //     el.setAttribute('src', response.data.body);
    //     setTimeout(() => {
    //       document.querySelector('#overlay').style.display = 'none';
    //       const elem = document.getElementById('searchQuery');
    //       elem.value = '';
    //       elem.focus();
    //     }, 500);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
  }
  render() {
    return (
      <div className='container'>
        <div id='overlay'>
          <div id='overlayText'>Loading your image please wait...</div>
        </div>
        <form>
          <h1> Welcome to Stable Diffusion AI</h1>
         
          <input
            autoFocus={true}
            type='text'
            name='searchQuery'
            id='searchQuery'
            placeholder='enter desired text'
            
          />
          <div>
            <input value='Submit' onClick={this.handleSubmit}/>
          </div>
          <div>
            <br></br>
            <img
              id='myImage'
              alt='Your Image will appear here'
              className='imageContainer'
            />
          </div>
        </form>
      </div>
    );
  }}

export default App;