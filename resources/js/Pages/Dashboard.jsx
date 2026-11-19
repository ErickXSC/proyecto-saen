import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Users, CreditCard, QrCode, Bot, LogOut, ShieldAlert } from 'lucide-react';

export default function Dashboard({ stats }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const rolNombre = user.rol ? user.rol.nombre_rol : 'Empleado'; 
    const esAdmin = rolNombre === 'Admin';

    const alumnosActivos = stats?.alumnos_activos || 0;
    const ingresosMes = stats?.ingresos_mes || 0;
    const adeudosPendientes = stats?.adeudos_pendientes || 0;

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex">
            <Head title="Dashboard" />

            {/* SIDEBAR */}
            <aside className="w-64 bg-[#03444A] text-white hidden md:flex flex-col justify-between p-6 shadow-xl">
                <div>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <img src="/images/logo_saen.png" alt="Logo SAEN" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-wider">SAEN</h1>
                            <p className="text-xs text-[#9AD3DA]">{esAdmin ? 'Administración' : 'Empleado'}</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <Link href={route('dashboard')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#FF924D] text-white font-medium text-sm transition shadow-md">
                            <LayoutDashboard className="w-5 h-5" /> Resumen General
                        </Link>
                        
                        <Link href={route('alumnos.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <Users className="w-5 h-5" /> Alumnos
                        </Link>
                        
                        <Link href={route('pagos.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <CreditCard className="w-5 h-5" /> Control de Pagos
                        </Link>

                        <Link href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <QrCode className="w-5 h-5" /> Asistencias QR
                        </Link>
                        
                        <Link href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <Bot className="w-5 h-5" /> Asistente IA
                        </Link>
                        
                        {esAdmin && (
                            <Link href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                                <ShieldAlert className="w-5 h-5 text-[#FF924D]" /> Usuarios y Roles
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="pt-6 border-t border-white/10">
                    <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-500/10 transition text-sm">
                        <LogOut className="w-5 h-5" /> Cerrar Sesión
                    </Link>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm">
                    <h2 className="text-lg font-bold text-[#03444A]">
                        Panel de Control - {esAdmin ? 'Administrador' : 'Empleado'}
                    </h2>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold bg-[#9AD3DA]/30 text-[#03444A] px-3 py-1 rounded-full">
                            {rolNombre}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-[#00A8A8] text-white flex items-center font-bold justify-center text-sm shadow-sm">
                            {user.nombre.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
                    <h1 className="text-2xl font-bold text-[#03444A]">¡Bienvenido, {user.nombre}!</h1>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Alumnos Activos</p>
                                <h3 className="text-2xl font-extrabold text-[#03444A]">{alumnosActivos}</h3>
                            </div>
                            <div className="p-3 bg-[#9AD3DA]/20 text-[#00A8A8] rounded-xl">
                                <Users className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Ingresos del Mes</p>
                                <h3 className="text-2xl font-extrabold text-[#03444A]">
                                    ${ingresosMes.toLocaleString('es-MX')}
                                </h3>
                            </div>
                            <div className="p-3 bg-[#9AD3DA]/20 text-[#00A8A8] rounded-xl">
                                <CreditCard className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Adeudos Pendientes</p>
                                <h3 className="text-2xl font-extrabold text-[#FF924D]">{adeudosPendientes}</h3>
                            </div>
                            <div className="p-3 bg-[#FF924D]/10 text-[#FF924D] rounded-xl">
                                <ShieldAlert className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}