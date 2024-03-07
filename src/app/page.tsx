import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <main className="wrapper">
      <div className="h-screen flex flex-col justify-center items-center">
			<h1 className="text-7xl break-words">
				Welcome to Quiz App
			</h1>

			<h3 className="my-10 text-2xl font-bold"></h3>

			<Link href="/sign-in">
				<button className="bg-green-600 px-20 py-5 rounded-full font-bold text-2xl cursor-pointer hover:opacity-80">
					Start Quiz
				</button>
			</Link>
		</div>
    </main>
  );
};

export default Home;
