'use client';
import { signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

type FormData = {
    user: string,
    password: string
};

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const callbackUrl = `${process.env.NEXT_PUBLIC_CALLBACK_URL}api/auth/callback/cognito`;
    
    const onSubmit  = async () => {
        const result = await signIn('cognito',{ redirect: false, callbackUrl });
        console.log({result});
    }    
    return (
        <div>
            <h1>Login Page</h1>
            <form  onSubmit={ handleSubmit(onSubmit) } noValidate>
                <button
                    type="submit"
                    color="secondary"
                    className='circular-btn'
                    >
                    Ingresar
                </button>
            </form>
            <div>
                <button onClick={() => signOut()}>Cerrar sesión</button>
            </div>
        </div>
    );
}