'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState, ChangeEvent } from 'react';

interface IUser {
    phone: string;
    password: string;
	fullName: string
}

const SignInPage: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<IUser>({
        phone: '',
        password: '',
		fullName: ''
      });
  	const [status, setStatus] = useState<boolean>(false);
	const [isDone, setIsDone] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState<string>("");

  	const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  	const [loading, setLoading] = useState<boolean>(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.API_URL}/auth/sign-up`, user);
      console.log(response.data);
	  router.push('/sign-in');
    } catch (error: any) {
      console.log('Failed', error.message);
	  setErrorMsg(error.message);
    } finally {
      setLoading(false);
	  setIsDone(true);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.phone && user.password&&user.fullName));
  }, [user]);

  return (
	<div className="flex flex-col items-center justify-center min-h-screen py-2">
		<h1 className="py-10 mb-10 text-5xl">
			{loading ? 'Loading' : 'Sign up'}
		</h1>

		<input
			className="w-[370px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
			id="fullname"
			type="text"
			value={user.fullName}
			onChange={(e) => setUser({ ...user, fullName: e.target.value })}
			placeholder="Full name"
		/>

		<input
			className="w-[370px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
			id="phone"
			type="text"
			value={user.phone}
			onChange={(e) => setUser({ ...user, phone: e.target.value })}
			placeholder="Phone"
		/>

		<input
			className="w-[370px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
			id="password"
			type="password"
			value={user.password}
			onChange={(e) => setUser({ ...user, password: e.target.value })}
			placeholder="Password"
		/>
		{
			isDone && status && (
				<>
					<div className='text-green-600'> Successfuly </div>
				</>
			)
		}
		{
			isDone && !status && (
				<>
					<div className='text-red-600'> Error: { errorMsg } </div>
				</>
			)
		}
		<button
			onClick={onSignUp}
			disabled={buttonDisabled}
			className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 uppercase px-40 py-3 mt-10 font-bold">
			{ 'Sign Up' }
		</button>

		<Link href="/sign-in">
			<p className="mt-10">
				Do you have a free account already?{' '}
				<span className="font-bold text-blue-600 ml-2 cursor-pointer underline">
					Sign in
				</span>
			</p>
		</Link>
	</div>
	);
};

export default SignInPage;