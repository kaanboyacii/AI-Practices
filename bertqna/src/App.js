
import { Fragment } from 'react';

import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import { Puff } from "react-loader-spinner";

function App() {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [model, setModel] = useState(null);
  const [answer, setAnswer] = useState([]);

  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log('Model loaded.');
  }

  useEffect(() => {
    loadModel();
  }, []);

  const answerQuestion = async (e) => {
    if (e.which === 13 && model !== null) {
      console.log('Question submitted.');
      const passage = passageRef.current.value;
      const question = questionRef.current.value;
      
      // Model yüklendikten sonra soruyu sormak ve cevapları almak için bu işlemi gerçekleştirin
      const answers = await model.findAnswers(question, passage);
      setAnswer(answers);
      console.log(answers);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {model === null ? (
          <div>
            <div>Model Loading</div>
            <Puff
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
            />
          </div>
        ) : (
          <Fragment>
            Passage
            <textarea ref={passageRef} rows="30" cols="100"></textarea>
            Ask a Question
            <input ref={questionRef} onKeyPress={answerQuestion} size="80"></input>
            <br />
            Answers
            {answer.length > 0 ? (
              answer.map((ans, idx) => (
                <div key={idx}>
                  <b>Answer {idx + 1} - </b> {ans.text} ({Math.floor(ans.score * 100) / 100})
                </div>
              ))
            ) : (
              "No answers available."
            )}
          </Fragment>
        )}
      </header>
    </div>
  );
}

export default App;
