"use client";

import { useEffect, useState } from "react";

export interface IQuiz {
  id: number;
  title: string;
  description: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id: number;
  questionText: string;
  options: string[];
  type: number | 1;
  correctOption: number[];
  hint?: string
}

type Props = {
  questions: IQuestion[];
  limit?: number;
  onDone: Function;
  handleQuit: Function
};

const Questions = ({ questions, limit, onDone, handleQuit }: Props) => {
  const [cursor, setCursor] = useState<number>(0);
  const [options, setOptions] = useState<string[]>(questions[cursor]?.options || [])
  const [selected, setSelected] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hintShow, setHintShow] = useState<boolean>(false);

  const isLastQuestion = () => {
    return !(questions.length > cursor + 1);
  }
  const isCorrectOne = (no: number) => {
    let reduce = questions[cursor].correctOption.filter( i => {
      return i == no;
    })
    return reduce.length;
  }
  const isCorrect = () => {
    let result = true;
    selected.forEach(select => {
      let checkChoose = isChoosed(select, questions[cursor].correctOption);
      if(!checkChoose) result = false;
    })
    return result;
  }
  const isChoosed = (no: number, selected: number[]): number => {
    let reduce = selected.filter( i => {
      return i == no;
    })
    return reduce.length;
  }

  const handleCheck = (no: number) => {
    if(isSubmitted) { return 0; }
    const checkIsChoosed: number = isChoosed(no, selected);
    if(checkIsChoosed == 0) {
      // not yet
      if(selected.length + 1 == questions[cursor].correctOption.length) {
        setIsSubmitted(true);
      }
      selected.push(no);
      setSelected(selected);
    }
    else {
      let reduce = selected.filter( i => i != no )
      setSelected(reduce)
    }
  };
  const resetAnswer = () => {
    setIsSubmitted(false);
    setSelected([]);
    setHintShow(false);
  }
  const doneQuestion = () => {
    onDone();
  }

  useEffect(() => {
    console.log('load options:', cursor, questions[cursor]?.options);
    setOptions(questions[cursor]?.options);
  }, [cursor, questions]);

  return (
    <div className="wrapper">
      <div className="bg-white p-4 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl rounded-md">
        <button onClick={()=>{handleQuit()}}> {"<"} </button>
        <h1 className="heading">Quizy</h1>
        <div className="flex flex-col min-h-[70vh] p-10 gap-4 w-full">
        { !questions.length && (
          <>
          <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            onClick={()=> handleQuit()}
          >
            Log Out
          </button>
          </>
          )}
        { questions.length && (
          <>
            <h2 className="text-2xl text-center font-medium">
                {`Question ${cursor + 1}. ${questions[cursor]?.questionText}`}
            </h2>
            { (questions[cursor].correctOption.length > 1)?
              (<>
                Please choose {questions[cursor].correctOption.length} answers
              </>) : (<></>)
            }
            {  options?.map((option, i) => (
              <button
                key={i}
                className={`option ${isChoosed(i ,selected)? "choosed":""} ${ isChoosed(i ,selected)? (isCorrectOne(i)? 'success': 'failure'): "" }`}
                onClick={() => handleCheck(i)}
              >
                {i+1}. 
                {option}
                {/* { isChoosed(i ,selected)? ( isCorrect()? '' : (
                  <>
                  <p className="border-t-4"></p>
                  <div className="text-red-500">Please try again</div>
                  </>
                )
                 ) : "" } */}
              </button>
            ))
            }
          </>)
        }
        </div>

        <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
            { 
              isSubmitted && isCorrect() && !isLastQuestion() &&  (
                <>
                  <button 
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800" 
                  onClick={() => {
                    setCursor(cursor+1)
                    resetAnswer()
                  }}
                  >
                    Next Question
                  </button>
                </>
              )
            } 
            { 
              isSubmitted && isCorrect() && isLastQuestion() &&  (
                <>
                  <button 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
                  
                  onClick={() => {
                    doneQuestion()
                  }}
                  >
                    Done
                  </button>
                </>
              )
            } 
            { 
              isSubmitted && !isCorrect() && (
                <>
                  <button 
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-900" 
                  onClick={() => {resetAnswer()}}
                  >
                    Try Again
                  </button>
                </>
              )
            } 
            {/* <Button variant={"destructive"} onClick={handleQuit}>
              Quit Quiz
            </Button> */}
        </div>
        <button 
          type="button" 
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          onClick={() => { setHintShow(!hintShow) }}
          >
            Hint
        </button>
        <div className="flex justify-between py-5 px-2 font-bold text-md">
          { hintShow && (
            <>
              {questions[cursor].hint}
            </>
          )}
        </div>
        <div className="flex flex-col min-h-[70vh] p-10 gap-4 w-full">
          {}
        </div>
      </div>
    </div>
  );
};

export default Questions;
