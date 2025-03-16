import { Link } from 'react-router';
import { authClient } from "~/lib/auth-client";
import { Button } from "~/components/ui/button";
import clsx from 'clsx';
import { AnimatePresence, motion } from "motion/react";

export default function Index() {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    return (
        <>
            <AnimatePresence>
                {
                    isPending &&
                    <motion.div
                        exit={{ opacity: 0 }}
                        key="session-courtain"
                        className={clsx("fixed w-full h-full z-30 dark:bg-gray-950")} />
                }
            </AnimatePresence>
            <div className="flex flex-col items-center mt-[150px]">
                <h1 className="text-[48px] text-center mt-[20px] font-bold">Welcome {(session?.user.name || "")}!</h1>
                <ul className="flex flex-col space-y-4 mt-[20px]">
                    <li><Link to="/signup" className="hover:text-blue-400 text-gray-400">Sign up</Link></li>
                    <li><Link to="/signin" className='hover:text-blue-400 text-gray-400'>Sign in</Link></li>
                </ul>
                {session && <Button className="dark:bg-red-700 dark:text-gray-100 mt-[30px] hover:cursor-pointer hover:bg-gray-100 hover:text-red-700" onClick={() => authClient.signOut()}>Sign out</Button>}
            </div>
        </>
    )
}