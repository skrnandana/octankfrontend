import React, { Component } from 'react';
import './index.css';
import AWS from 'aws-sdk';
import axios from 'axios';

class App extends Component {

  handleSubmit(e) {
  
    
    e.preventDefault();
    const prompt = "solar panels";
    const data = { data: prompt };
    console.log(prompt);
     const options = {
       method: 'POST',
       url: 'https://vcf87egfsl.execute-api.us-east-1.amazonaws.com/Stage/octank',
       data: JSON.stringify(data),
      withCredentials: false
       };
    console.log("hello");
    axios.request(options).then((res) => {
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
         
        </div>
        <form>
    
         
          <input
            autoFocus={true}
            type='text'
            name='blog'
            id='blog'
            placeholder='text'
            
          />
          <div>
            <input value='Submit' onClick={this.handleSubmit}/>
          </div>
          <div>
            <br></br>
            <img
              id='myImage'
             
              className='imageContainer'
            />
          </div>
        </form>
      </div>
    );
  }}

export default App;