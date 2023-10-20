import './App.css';
import React, {useRef, useEffect, useState} from 'react';
import * as tf from "@tensorflow/tfjs"
import * as qna from "@tensorflow-models/qna"
import Loader from "react-loader-spinner";
import { Fragment } from 'react';

function App() {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [model, setModel] = useState(null);
  const [answer, setAnswer] = useState();

  const loadModel = async () =>{
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log('Model Loaded')
  }
  useEffect(()=>{loadModel()}, [])

  return (
    <div className="App">
      <header className="App-header">
  
      </header>
    </div>
  );
}

export default App;
