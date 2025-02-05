import Link from 'next/link'
// import form from 'next/form';
import {auth, signOut, signIn  } from '@/auth';
import { redirect } from 'next/dist/server/api-utils';
const Navbar = async () => {
    const session = await auth();
    return (
        <div className="flex bg-white justify-around shadow-md">
            <Link href="/" className='p-2'>
                <img  className="w-16 h-12" src="/yc logo.png" alt="" />
            </Link>
            <div className='flex items-center gap-5'>
        {session && session?.user ?(
            <>
            <Link href="/startup/create"> 
            <span>
                Create
            </span>
                </Link>
                <form action={async () => {
                    'use server';
                    await signOut({redirectTo: '/'})
                }}>
            <button type="submit">Logout</button>
                </form>
                <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
                </Link>
            </>
        ):(
            <form  action={async  () => {
                "use server"
                await signIn('github')
            }}>
                <button type="submit">Login</button>
            </form>
        )}
            </div>
        </div>
    )
}
export default Navbar