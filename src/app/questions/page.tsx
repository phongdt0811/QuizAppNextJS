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

async function getQuestions(limit: string) {
  const res = await fetch(
    `http://127.0.0.1:3005/question`
  );

  console.log("data: ", res);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const QuestionsPage = async ({ searchParams }: Props) => {
  const router = useRouter();

  const limit = searchParams.limit;

  const response = await getQuestions(limit);

  return (
    <div>
    <Questions
      questions={response}
      limit={parseInt(limit, 10)}
    />
    </div>
  );
};

export default QuestionsPage;
