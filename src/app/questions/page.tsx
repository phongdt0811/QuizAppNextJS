"use client";

import Questions from "../../components/questions";
import { redirect, useRouter } from "next/navigation";

type Props = {
  searchParams: {
    category: string;
    difficulty: string;
    limit: string;
  };
};

const API_URL = process.env.API_URL;

async function getQuestions(limit: string) {
  const res = await fetch(
    `${API_URL}/question`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const QuestionsPage = async ({ searchParams }: Props) => {
  const router = useRouter();

  const limit = searchParams.limit;

  const response = await getQuestions(limit);

  const onDoneQuestion = () => {
    router.push('/claim');
  }
 
  return (
    <div>
    <Questions
      questions={response}
      limit={parseInt(limit, 10)}
      onDone={onDoneQuestion} 
    />
    </div>
  );
};

export default QuestionsPage;
