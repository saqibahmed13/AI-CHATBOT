import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [initialRes,setRes] = useState("response will be generated here!");
  const [askQuestion,setQuestion] = useState("")

  const questionHandlers = (event) => {
    setQuestion(event.target.value)
}

  async function generateAnswer(){
    setRes("Loading")
    const response = await axios({
      url:'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBTmv-hIZRLOGUEgCVkTZMuz9zlZ--q0WQ',
      method:"POST",
      data:{
        contents:[
          {parts:[{text:askQuestion}]}
        ],
      }
    });


    //console.log(response.data.candidates[0].content.parts[0].text); this is to display in console

    setRes(response.data.candidates[0].content.parts[0].text);  // this will display 
    //OR
    // setRes(response['data']['candidates'][0]['content']['parts'][0]['text'])

  }


  return (
    <>
      <h1>Chat with AI</h1>
      <input type="text" placeholder='Enter the prompt'  value={askQuestion} onChange={questionHandlers}/>
      <button onClick={generateAnswer}>Generate Button</button>
      <br />
      <pre>{initialRes}</pre>
    </>
  )
}

export default App
