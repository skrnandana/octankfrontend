import React, { Component } from 'react';
import './index.css';
import AWS from 'aws-sdk';
import axios from 'axios';
import Navbar from './Navbar';
import { saveAs } from 'file-saver'; 
import { makeBlob, mimicDownload } from "@samvera/image-downloader";


const promptOptions = ['lighting', 'animated', 'pencil drawing'];



class App extends Component {


  state = {
    imageArray: [] ,// Initialize the state for imageArray
    summary : "",
    clickbait : "",
    isLoading: false,
    hasInappropriateContent: false,
    prompt: ''
  };

  handlePromptClick = (prompt) => {
    this.setState({ prompt });
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
      // const imageUrl1 = = 'https://example.com/image.jpg'
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

  handleDownload = (img,e) => {
    e.preventDefault();
    console.log(img)
   saveAs(img, 'image.png'); // Use the saveAs function to trigger the download
 
   
  };
  getImageUrl = (option) => {
    switch (option) {
      case 'lighting':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJBG6DuQeW2NO33gTrhKw6PJVEEbrXvanWDA&usqp=CAU'; // Replace with the actual URL for Digital painting image
      case 'pencil drawing':
        return 'https://i.etsystatic.com/6246498/r/il/d76603/2165308314/il_fullxfull.2165308314_swzh.jpg'; // Replace with the actual URL for Sharp focus image
      case 'animated':
        return 'https://img.freepik.com/free-vector/front-view-house-with-nature-elements-white-background_1308-66071.jpg?w=2000'; // Replace with the actual URL for Lighting image
      default:
        return ''; // Return a default image URL if needed
    }
  };

  render() {
    const { prompt, imageArray, summary, clickbait, isLoading,  hasInappropriateContent, user} = this.state; 
    // console.log(imageArray);
    return (
      <div>
        

  
      <Navbar/>

      <div className="container">
        <div id="overlay" style={{ display: isLoading ? 'block' : 'none' }}>Loading...</div>

<form>
<label className = "inputlabel" htmlFor="blog">Text: </label>
<textarea
  autoFocus={true}
  type="text"
  name="blog"
  id="blog"
  placeholder="Advertisement text"
  className="border"
  rows="4" cols="50"
/>

{/* 
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
            </div> */}


<div className="prompt-options">
              <label>Image Design:</label>
              {promptOptions.map((option, index) => (
               <button
            key={index}
            className={`prompt-option-button ${prompt === option ? 'selected-prompt' : ''}`}
            onClick={() => this.handlePromptClick(option)}
            type="button"
            style={{
              backgroundImage: `url(${this.getImageUrl(option)})`,
            }}
          >
                  {/* {option} */}
                </button>
              ))}
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
                           <><img src={image} alt={'Image ${index}'}/><input
                           type="submit"
                           download
                           value="Download"
                           onClick={(e) => this.handleDownload(image, e)
                         }
                           className="submit-button"
                         /></>
                          //  {/* <button onClick={ () =>this.handleDownload(image)}>Download</button></> */}
                          // {/* <a href={image} download>Download</a></> */}
                        //  {/* ad</button></>  */}

                        )}
     {/* <button onClick={this.handleDownload(image)}>Download Image</button>  */}
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