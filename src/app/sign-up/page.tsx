'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState, ChangeEvent } from 'react';

interface IUser {
    phone: string;
    password: string;
	fullname: string
}

const SignInPage: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<IUser>({
        phone: '',
        password: '',
		fullname: ''
      });
    
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const onSignUp = async () => {
    try {
      setLoading(true);

      const response = await axios.post('/register', user);
      router.push('/login');
    } catch (error: any) {
      console.log('Failed', error.message);
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
			{loading ? 'Loading' : 'Sign up'}
		</h1>

		<input
			className="w-[370px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
			id="fullname"
			type="text"
			value={user.fullname}
			onChange={(e) => setUser({ ...user, fullname: e.target.value })}
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

		<button
			onClick={onSignUp}
			className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 uppercase px-40 py-3 mt-10 font-bold">
			{buttonDisabled ? 'Sign Up' : ''}
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