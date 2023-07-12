import React, { Component } from 'react';
import './index.css';
import AWS from 'aws-sdk';
import axios from 'axios';
import Navbar from './Navbar';

class App extends Component {
  state = {
    imageArray: [] ,// Initialize the state for imageArray
    summary : "",
    clickbait : "",
    isLoading: false,
    hasInappropriateContent: false,
    prompt: ''
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const textinput =  document.getElementById('blog').value;
    const { prompt } = this.state; 
    console.log(textinput)
    console.log(prompt)
    const data = {"text_inputs" : textinput,"prompt_specification" : prompt};
     const options = {
      // headers: { 'Content-Type': 'application/json' },
       method: 'POST',
       url: 'https://ibnj3ug6q9.execute-api.us-east-1.amazonaws.com/Stage/octank/',
       data: JSON.stringify(data),
      // withCredentials: false
       };
    this.setState({ isLoading: true }); 
    console.log("hello");
    axios.request(options).then((res) => {
      console.log(res);
      const imagelinks = (res.data.imageLink);
      const summary = (res.data.summary);
      const clickbait = (res.data.clickbait);

      const imageArray = imagelinks.split(" ");
      this.setState({ imageArray, isLoading: false }); 

      const hasInappropriateContent = imageArray.some((link) =>
          link.startsWith('Inappropriate')
        );
        
      this.setState({ hasInappropriateContent });
      this.setState({ imageArray, summary, clickbait });
      console.log(imageArray[0]);
      console.log(imageArray[1]);
      console.log(imageArray[2]);
      // console.log(imagelinks)
    }).catch( (error) => {
      this.setState({ isLoading: false }); 
      console.error(error);
    });
    

   
  }
  handlePromptChange = (e) => {
    const prompt = e.target.value; // Retrieve the selected prompt option
    this.setState({ prompt });
  };
  render() {
    const { prompt, imageArray, summary, clickbait, isLoading,  hasInappropriateContent} = this.state; 
    // console.log(imageArray);
    return (
      <div>
      <Navbar/>

      <div className="container">
        <div id="overlay" style={{ display: isLoading ? 'block' : 'none' }}>Loading...</div>


<form>

<label className = "inputlabel" htmlFor="blog">Provide the advertisement text: </label>
<input
  autoFocus={true}
  type="textarea"
  name="blog"
  id="blog"
  placeholder="Advertisement text"
  className="text-box"
/>

<div className="prompt-options">
              <label htmlFor="prompt-select">Select Image Design:</label>
              <select
                id="prompt-select"
                value={prompt}
                onChange={this.handlePromptChange}
              >
                <option value="Digital painting">Digital painting</option>
                <option value="Sharp focus">Sharp focus</option>
                <option value="Lighting">Lighting</option>
              </select>
            </div>
<div>
  <input
    type="submit"
    value="Submit"
    onClick={this.handleSubmit}
    className="submit-button"
  />
</div>

{imageArray.length > 0 ? (
              <div>
                <div>
                  <h4>Here is your ad summary: {summary}</h4>
                </div>
                <div>
                  <h4>Here is your ad clickbait: {clickbait}</h4>
                </div>
                {hasInappropriateContent ? (
                  <div className="warning">
                    Warning: Inappropriate content detected in image links.
                  </div>
                ) : (
                  <div className="image-container">
                    {imageArray.map((image, index) => (
                      <div key={index} className="image-item">
                        {image.startsWith('inappropriate') ? (
                          <div className="warning">
                            Warning: Inappropriate image link.
                          </div>
                        ) : (
                          <img src={image} alt={`Image ${index}`} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

export default App;