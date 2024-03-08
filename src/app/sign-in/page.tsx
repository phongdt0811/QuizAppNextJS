'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface IUser {
  phone: string,
  password: string
}

const SignInPage : React.FC = () => {
	const router = useRouter();

	const accessToken = sessionStorage.getItem('accessToken');
	if(accessToken) { 
		router.push('/questions');
	}

	const [user, setUser] = React.useState<IUser>({
		phone: '',
		password: '',
	});

	const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);

	const [loading, setLoading] = React.useState<boolean>(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			console.log(`sign-in ${process.env.API_URL}, ${user}`);
			const response = await axios.post(`${process.env.API_URL}/auth/sign-in`, user);
			// bypass true to dev questions
			console.log('Login successful', response.data);
			sessionStorage.setItem('accessToken', response.data?.accessToken);
			router.push('/questions');
		} catch (error: any) {
			console.log('Login failed', error.message);
		} finally {
			setLoading(false);
		}
	};

  useEffect(() => {
    setButtonDisabled(!(user.phone && user.password));
  }, [user]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="py-10 mb-10 text-5xl">
				{loading ? "Loading" : 'Sign In'}
			</h1>

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

			<button
				onClick={onLogin}
				disabled={buttonDisabled}
				className="p-5 border border-blue-300 rounded-lg focus:outline-none focus:border-gray-600 uppercase px-40 py-3 mt-10 font-bold">
				Login
			</button>

			<Link href="/sign-up">
				<p className="mt-10">
					Do not have an account yet?
					<span className="font-bold text-blue-600 ml-2 cursor-pointer underline">
						Sign up
					</span>
				</p>
			</Link>
		</div>
	);
}

export default SignInPage;