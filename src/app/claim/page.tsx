"use client";
import { redirect, useRouter } from "next/navigation";
import Link from 'next/link';

const ClaimPage: React.FC = () => {
    const router = useRouter();
    

    return (
        <>
        <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-7xl break-words">
            Congragulations
        </h1>
        
        <h3 className="my-10 text-2xl font-bold"></h3>

        <Link href="/">
            <button className="bg-blue-600 px-20 py-5 rounded-full font-bold text-2xl cursor-pointer hover:opacity-80 text-white">
                Claim Voucher
            </button>
        </Link>
        </div>
        </>
    )
}

export default ClaimPage;