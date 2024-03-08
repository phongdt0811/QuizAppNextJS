"use client";

import Questions, { IQuestion } from "../../components/questions";
import { redirect, useRouter } from "next/navigation";
import { validate } from '../lib/helper';
import axios from 'axios';
import { access } from "fs";
import { useState } from "react";
import { useEffect } from "react";
import { off } from "process";

type Props = {
  searchParams: {
    category: string;
    difficulty: string;
    limit: string;
  };
};

const API_URL = process.env.API_URL;

const QuestionsPage: React.FC = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [fetchDone, setFetchDone] = useState<boolean>(false);
  const [isFetchSuccess, setIsFetchSuccess] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const fetchQuestions = async () => {
    let accessToken = await validate(`${sessionStorage.getItem('accessToken')}`);
    if(!accessToken) {
      router.push('/sign-in')
    }
    if(accessToken && !fetchDone) {
      try {
        setIsFetching(true);
        // const limit = searchParams.limit;
        const headers = {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        };
        const response = await axios.get(`${API_URL}/question`, { /*withCredentials: true,*/ headers })
        if(response.data) {
          console.log('kq:', response.data);
          setIsFetchSuccess(true);
          setQuestions(response.data);
        } else {

        }
      }
      catch(err:any) {
        setIsFetchSuccess(false);
      }
      finally {
        setFetchDone(true);
        setIsFetching(false);
      }
    }
  }

  useEffect(() => {
    console.log()
    fetchQuestions();
  }, []);

  const onDoneQuestion = () => {
    router.push('/claim');
  }
  const handleQuit = () => {
    const res = window.confirm("Are you sure to quit?");
    if(res) {
      sessionStorage.clear()
      router.push('/');
    }
  }
 
  return (
    <div>
    <Questions
      questions={questions}
      // limit={parseInt(limit, 10)}
      onDone={onDoneQuestion} 
      handleQuit={handleQuit}
    />
    </div>
  );
};

export default QuestionsPage;
