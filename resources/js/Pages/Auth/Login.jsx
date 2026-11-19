import React, { useState, useEffect } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { Eye, EyeOff, QrCode, CreditCard, Bot } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 font-sans">
            <Head title="Iniciar Sesión" />

            <div className="lg:w-1/2 bg-[#03444A] text-white flex flex-col justify-center items-center p-10 lg:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A8A8] opacity-20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00A8A8] opacity-10 rounded-full blur-3xl"></div>

                <div className="max-w-md w-full flex flex-col items-center text-center z-10">
                    <div className="w-80 h-80 flex items-center justify-center mb-6">
                        <img src="/images/logo_saen.png" alt="Logo SAEN" className="w-full h-full object-contain drop-shadow-lg" />
                    </div>
                    <h1 className="text-5xl font-extrabold tracking-tight mb-2">SAEN</h1>
                    <p className="text-lg text-[#9AD3DA] font-medium mb-12">
                        Sistema Automatizado para Escuelas de Natación
                    </p>

                    <div className="grid grid-cols-3 gap-6 w-full pt-8 border-t border-white/10">
                        <div className="flex flex-col items-center text-center">
                            <div className="p-3 bg-white/5 rounded-xl mb-3">
                                <QrCode className="w-7 h-7 text-[#FF924D]" />
                            </div>
                            <span className="text-xs font-semibold text-[#9AD3DA]">Acceso por QR</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="p-3 bg-white/5 rounded-xl mb-3">
                                <CreditCard className="w-7 h-7 text-[#FF924D]" />
                            </div>
                            <span className="text-xs font-semibold text-[#9AD3DA]">Pagos Automatizados</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="p-3 bg-white/5 rounded-xl mb-3">
                                <Bot className="w-7 h-7 text-[#FF924D]" />
                            </div>
                            <span className="text-xs font-semibold text-[#9AD3DA]">Asistente de IA</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                    <h2 className="text-2xl font-bold text-[#03444A] text-center mb-6">Iniciar Sesión</h2>

                    {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[#03444A] mb-1.5">Correo electrónico</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="ejemplo@correo.com"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent transition bg-[#9AD3DA]/10"
                            />
                            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#03444A] mb-1.5">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:border-transparent transition pr-11 bg-[#9AD3DA]/10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#03444A]"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-[#00A8A8] shadow-sm focus:ring-[#00A8A8]"
                                />
                                <span className="ml-2 text-sm text-slate-600">Recordarme</span>
                            </label>

                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-sm text-[#00A8A8] hover:text-[#03444A] font-medium transition">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#00A8A8] hover:bg-[#03444A] text-white font-bold py-2.5 rounded-lg shadow-md transition duration-200 cursor-pointer disabled:opacity-50"
                        >
                            {processing ? 'Entrando...' : 'Iniciar Sesión'}
                        </button>

                        <div className="text-center mt-4">
                            <span className="text-sm text-slate-500">¿No tienes cuenta? </span>
                            <Link href={route('register')} className="text-sm text-[#00A8A8] hover:text-[#03444A] font-semibold transition">
                                Regístrate aquí
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}