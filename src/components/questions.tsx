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
  limit: number;
};

const Questions = ({ questions, limit }: Props) => {
  const [cursor, setCursor] = useState<number>(0);
  const [options, setOptions] = useState<string[]>(questions[cursor].options || [])
  const [selected, setSelected] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isCorrect = () => {

  }
  const isChoosed = (no: number, selected: number[]): number => {
    let reduce = selected.filter( i => {
      return i == no;
    })
    return reduce.length;
  }

  const handleCheck = (no: number) => {
    if(isSubmitted) { console.log('submit roi'); return 0; }
    const checkIsChoosed: number = isChoosed(no, selected);
    if(checkIsChoosed == 0) {
      console.log('chua chon')
      // not yet
      if(selected.length + 1 == questions[cursor].correctOption.length) {
        setIsSubmitted(true);
      }
      selected.push(no);
      setSelected(selected);
    }
    else {
      let reduce = selected.filter( i => i != no )
      console.log('chon r', reduce);
      setSelected(reduce)
    }
    console.log('danh sach dang chon: ', selected);
  };

  useEffect(() => {
    console.log('load options:', cursor, questions[cursor].options);
    setOptions(questions[cursor].options);
  }, [cursor, questions]);

  return (
    <div className="wrapper">
      <div className="bg-white p-4 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl rounded-md">
        <h1 className="heading">Quizy</h1>
        <div className="flex flex-col min-h-[70vh] p-10 gap-4 w-full">
        { questions.length && (
          <>
            <h2 className="text-2xl text-center font-medium">
                {`Question ${cursor + 1}. ${questions[cursor]?.questionText}`}
            </h2>
            {  options?.map((option, i) => (
              <button
                key={i}
                className={""}
                onClick={() => handleCheck(i)}
              >
                {i}. 
                {option}
              </button>
            ))
            }
          </>)
        }
        </div>
        <div className="flex justify-between py-5 px-2 font-bold text-md">
          { isSubmitted ?? (
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
