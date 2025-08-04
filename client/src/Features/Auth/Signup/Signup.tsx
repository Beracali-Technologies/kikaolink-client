import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Don't forget the styles!

// --- Placeholder Icons ---
const EyeOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const EyeClosedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>;
// --- Custom styles to ensure phone input matches the new design ---
const phoneInputStyles = `
  .PhoneInputInput {
    border: none;
    outline: none;
    background: transparent;
    padding-left: 0.75rem;
    height: 100%;
    font-size: 1rem; /* Default text size */
    flex: 1;
    min-width: 0;
  }
`;

const Signup: React.FC = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: any) => {
        console.log("Signup data:", data);
        alert('Signup successful! Check console for data.');
    };

    return (
        <div className="min-h-screen bg-light-bg flex items-center justify-center p-4">
            <style>{phoneInputStyles}</style>
            <div className="w-full max-w-md">
                 {/* --- Header --- */}
                 <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-dark-text">Create your Account</h1>
                    <p className="mt-2 text-light-text">Join us to manage your events effortlessly.</p>
                </div>

                {/* --- Form Container --- */}
                <div className="bg-white p-8 rounded-xl shadow-lg w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="text-sm font-medium text-dark-text block mb-2">Full Name</label>
                            <input {...register("fullName", { required: "Full name is required" })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                            {errors.fullName && <p className="text-accent-red text-sm mt-1">{errors.fullName.message as string}</p>}
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="text-sm font-medium text-dark-text block mb-2">Email</label>
                            <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email"} })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                            {errors.email && <p className="text-accent-red text-sm mt-1">{errors.email.message as string}</p>}
                        </div>

                        {/* Phone Number with Country Picker */}
                        <div>
                            <label className="text-sm font-medium text-dark-text block mb-2">Phone Number</label>
                            <div className="flex items-center w-full px-4 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary-blue">
                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{ required: "Phone number is required", validate: value => isPossiblePhoneNumber(String(value)) || "Invalid phone number" }}
                                    render={({ field }) => (
                                        <PhoneInput {...field} defaultCountry="TZ" international />
                                    )}
                                />
                            </div>
                            {errors.phone && <p className="text-accent-red text-sm mt-1">{errors.phone.message as string}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium text-dark-text block mb-2">Password</label>
                            <div className="relative">
                                <input {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum 8 characters" } })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-light-text">
                                   {showPassword ? <EyeOpenIcon/> : <EyeClosedIcon/>}
                                </button>
                            </div>
                            {errors.password && <p className="text-accent-red text-sm mt-1">{errors.password.message as string}</p>}
                        </div>

                        {/* --- Submit Button --- */}
                        <button type="submit" className="w-full py-2.5 bg-primary-blue text-white font-semibold rounded-lg hover:bg-primary-blue-hover transition-colors shadow hover:shadow-md">
                            Create Account
                        </button>
                    </form>
                </div>

                 {/* --- Footer Link --- */}
                <p className="text-center mt-6 text-sm text-light-text">
                    Already have an account? <NavLink to="/login" className="font-medium text-primary-blue hover:underline">Log in</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Signup;
