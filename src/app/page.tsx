import Button from '@/components/ui/button/Button';
import { Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <div className='flex items-center justify-center'>
                    <div className="mr-3 w-fit p-2 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Vacci<span className="text-brand-500">Check</span>
                        </h1>
                    </div>
                </div>
                <h1 className="text-4xl font-bold mt-4">Welcome to VacciCheck</h1>
                <p className="mt-2 text-lg">Stay on top of your vaccination schedule with ease!</p>
                <div className="flex justify-center mt-6 space-x-4">
                    <Link href="/signin" className='w-full'>
                        <Button className="w-full" size="sm">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup" className='w-full'>
                        <Button className="w-full" size="sm">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}