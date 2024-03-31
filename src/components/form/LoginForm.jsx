import Image from 'next/image';
import loginImage from '@/assets/login.jpg'
import { useForm } from 'react-hook-form';
import ErrorInput from '../common/ErrorInput';
import { SignIn } from '@/services/firebase';
import WithUnprotected from '@/hoc/withUnprotected';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (values) => {
        const { email, password } = values;

        try {
            await SignIn(email, password)
            console.log('success');
        } catch (error) {
            console.log(error.code, error.message);
        }
    }

    return (
        <main className='flex justify-center items-center h-[100vh]'>
            <div className="p-6 w-full max-w-md">
                <div className='bg-container rounded-2xl border border-stroke  px-6 pt-7 pb-8 mb-4 text-center'>
                    <h1 className='texxt-title text-2xl'>Welcome Back</h1>
                    <h3 className='text-subtext'>{`Let's get started by signing in.`}</h3>
                    <hr className="hr" />
                    <form className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <input {...register("email", { required: true })} type="email" className="form-input !bg-container " id="username" placeholder="type your email" />
                            <ErrorInput error={errors.email} />
                        </div>
                        <div className="form-control">
                            <input {...register("password", { required: true, minLength: 1 })} className="form-input !bg-container" id="password" type="password" placeholder="type your password" />
                            {errors.password && <span className='text-red-700 absolute -bottom-[1rem] left-0'>This field is required</span>}
                            <ErrorInput error={errors.password} />

                        </div>
                        <button className="btn !w-full mb-3" type="submit">
                            Sign In
                        </button>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2024 Dwi Wijaya. All rights reserved.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default WithUnprotected(LoginForm);