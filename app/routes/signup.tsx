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
    name: z.string().min(2, {
        message: "Name should at least be 5 characters"
    }).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
});

export default function SignUp() {
    const navigate = useNavigate();
    const [isSigningUp, setIsSigningUp] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        authClient.signUp.email({
            email: values.email as string,
            password: values.password as string,
            name: values.name as string,
            callbackURL: "/",
        }, {
            onRequest: (ctx) => {
                setIsSigningUp(true);
            },
            onSuccess: (ctx) => {
                // redirect to home
                navigate("/");
            },
            onError: (ctx) => {
                // display the error message
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Write your name here..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Write your email here..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your email.
                                    </FormDescription>
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
                                        This is your password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Sign up</Button>
                    </form>
                </Form>
            </div>
        </>
    );
}