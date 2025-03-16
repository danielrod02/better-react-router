import { authClient } from "~/lib/auth-client"; //import the auth client
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
});

export default function SignUp() {
    const navigate = useNavigate();
    const [isSigningUp, setIsSigningIn] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        authClient.signIn.email({
            email: values.email as string,
            password: values.password as string,
            callbackURL: "/",
        }, {
            onRequest: (ctx) => {
                setIsSigningIn(true);
            },
            onSuccess: (ctx) => {
                // redirect to home
                setIsSigningIn(false);
                navigate("/");
            },
            onError: (ctx) => {
                // display the error message
                setIsSigningIn(false);
                alert(JSON.stringify(ctx.error, null, 2));
            },
        });
        console.debug(values)
    }


    return (
        <>
            <nav className="flex justify-start mt-[20px] ml-[20px]">
                <Link to="/" className="hover:text-blue-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                        />
                    </svg>
                </Link>
            </nav>
            <div className="w-[calc(100vw-20px*2)] sm:w-[50vw] lg:w-[20vw] mx-[20px] sm:mx-auto mt-[130px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Write your email here..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Write your password here..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Type in your password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="hover:cursor-pointer" type="submit">Sign in</Button>
                    </form>
                </Form>
                <Button className="mt-[30px] hover:cursor-pointer" onClick={async e => {
                    const data = await authClient.signIn.social({
                        provider: "google",
                        /**
                         * a url to redirect after the user authenticates with the provider
                         * @default "/"
                         */
                        callbackURL: "/",
                        /**
                         * a url to redirect if an error occurs during the sign in process
                         */
                        errorCallbackURL: "/error",
                        /**
                         * a url to redirect if the user is newly registered
                         */
                        newUserCallbackURL: "/welcome",
                        /**
                         * disable the automatic redirect to the provider. 
                         * @default false
                         */
                        disableRedirect: false,
                    });
                }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-google"
                        viewBox="0 0 16 16"
                    >
                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                    </svg>
                </Button>
            </div>
        </>
    );
}