import { Link } from 'react-router';
import { authClient } from "~/lib/auth-client";

export default function Index() {
    const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 
    return (
        <div className="flex flex-col items-center mt-[150px]">
            <h1 className="text-[48px] text-center mt-[20px] font-bold">Welcome {(session?.user.name || "")}!</h1>
            <ul className="flex flex-col space-y-4 mt-[20px]">
                <li><Link to="/signup" className="hover:text-blue-400 text-gray-400">Sign up</Link></li>
                <li><Link to="/signin" className='hover:text-blue-400 text-gray-400'>Sign in</Link></li>
            </ul>
        </div>
    )
}