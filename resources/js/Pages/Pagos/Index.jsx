import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LayoutDashboard, Users, CreditCard, QrCode, Bot, LogOut, ShieldAlert, Plus, DollarSign, CheckCircle, AlertCircle, Waves, Calendar, X, UserCog } from 'lucide-react';

export default function PagosIndex({ auth, pagos, alumnos, conceptos, stats }) {
    const { user } = auth;
    const rolNombre = user.rol ? user.rol.nombre_rol : 'Empleado';
    const esAdmin = rolNombre === 'Admin';
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        id_alumno: '',
        id_concepto: '',
        monto_final: '',
        estado: 'Pagado'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pagos.store'), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex">
            <Head title="Control de Pagos" />

            {/* Sidebar */}
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
                        <Link href={route('dashboard')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <LayoutDashboard className="w-5 h-5" /> Resumen General
                        </Link>
                        <Link href={route('alumnos.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <Users className="w-5 h-5" /> Alumnos
                        </Link>
                        <Link href={route('pagos.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#FF924D] text-white font-medium text-sm transition shadow-md">
                            <CreditCard className="w-5 h-5" /> Control de Pagos
                        </Link>
                        <Link href={route('carriles.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                        <Waves className="w-5 h-5" /> Carriles
                        </Link>
                        <Link href={route('horarios.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                        <Calendar className="w-5 h-5" /> Horarios
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <QrCode className="w-5 h-5" /> Asistencias QR
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <Bot className="w-5 h-5" /> Asistente IA
                        </Link>
                        {esAdmin && (
                         <Link href={route('usuarios.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                           <UserCog className="w-5 h-5" /> Usuarios y Roles
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

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm">
                    <h2 className="text-lg font-bold text-[#03444A]">Control Financiero y Pagos Automatizados</h2>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#00A8A8] hover:bg-[#03444A] text-white text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-sm">
                            <Plus className="w-4 h-4" /> Registrar Pago
                        </button>
                        <div className="w-9 h-9 rounded-full bg-[#FF924D] text-white flex items-center font-bold justify-center text-sm shadow-sm">
                            {user.nombre.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
                    {/* Tarjetas de Estadísticas */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Recaudado Este Mes</p>
                                <h3 className="text-2xl font-extrabold text-[#03444A]">${stats.total_recaudado.toLocaleString('es-MX')}</h3>
                            </div>
                            <div className="p-3 bg-[#9AD3DA]/20 text-[#00A8A8] rounded-xl">
                                <DollarSign className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Alumnos al Corriente</p>
                                <h3 className="text-2xl font-extrabold text-[#03444A]">{stats.alumnos_corriente} Alumnos</h3>
                            </div>
                            <div className="p-3 bg-[#9AD3DA]/20 text-[#00A8A8] rounded-xl">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Adeudos Activos</p>
                                <h3 className="text-2xl font-extrabold text-[#FF924D]">{stats.adeudos_activos} Alumnos</h3>
                            </div>
                            <div className="p-3 bg-[#FF924D]/10 text-[#FF924D] rounded-xl">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    {/* Tabla de Pagos */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-6">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-base font-bold text-[#03444A]">Últimos Pagos Registrados</h3>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-[#03444A] uppercase tracking-wider font-semibold">
                                    <th className="py-3.5 px-6">Alumno</th>
                                    <th className="py-3.5 px-6">Concepto</th>
                                    <th className="py-3.5 px-6">Monto</th>
                                    <th className="py-3.5 px-6">Fecha de Pago</th>
                                    <th className="py-3.5 px-6">Estatus</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {pagos.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-slate-500">No hay pagos registrados aún.</td>
                                    </tr>
                                ) : (
                                    pagos.map((pago) => (
                                        <tr key={pago.id_pago} className="hover:bg-slate-50 transition">
                                            <td className="py-4 px-6 font-semibold text-[#03444A]">{pago.alumno}</td>
                                            <td className="py-4 px-6 text-slate-600">{pago.concepto}</td>
                                            <td className="py-4 px-6 font-bold text-[#03444A]">${pago.monto_final}</td>
                                            <td className="py-4 px-6 text-slate-600">{pago.fecha_pago}</td>
                                            <td className="py-4 px-6">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                    pago.estado === 'Pagado' ? 'bg-[#00A8A8]/20 text-[#00A8A8]' : 
                                                    pago.estado === 'Pendiente' ? 'bg-[#FF924D]/20 text-[#E66414]' : 
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {pago.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal de Registro de Pago */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#03444A]">Registrar Nuevo Pago</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Alumno</label>
                                <select value={data.id_alumno} onChange={e => setData('id_alumno', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                    <option value="">Seleccionar Alumno...</option>
                                    {alumnos.map(a => (
                                        <option key={a.id_alumno} value={a.id_alumno}>{a.nombre_completo}</option>
                                    ))}
                                </select>
                                {errors.id_alumno && <span className="text-red-500 text-xs">{errors.id_alumno}</span>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Concepto</label>
                                <select value={data.id_concepto} onChange={e => setData('id_concepto', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                    <option value="">Seleccionar Concepto...</option>
                                    {conceptos.map(c => (
                                        <option key={c.id_concepto} value={c.id_concepto}>{c.nombre_concepto}</option>
                                    ))}
                                </select>
                                {errors.id_concepto && <span className="text-red-500 text-xs">{errors.id_concepto}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Monto ($)</label>
                                <input type="number" step="0.01" value={data.monto_final} onChange={e => setData('monto_final', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                {errors.monto_final && <span className="text-red-500 text-xs">{errors.monto_final}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Estatus</label>
                                <select value={data.estado} onChange={e => setData('estado', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                    <option value="Pagado">Pagado</option>
                                    <option value="Pendiente">Pendiente</option>
                                </select>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancelar</button>
                                <button type="submit" disabled={processing} className="px-5 py-2 text-sm font-bold text-white bg-[#00A8A8] hover:bg-[#03444A] rounded-xl transition shadow-md">
                                    {processing ? 'Guardando...' : 'Guardar Pago'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}