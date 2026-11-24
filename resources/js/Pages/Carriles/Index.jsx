import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LayoutDashboard, Users, CreditCard, QrCode, Bot, LogOut, Edit, X, Waves, Calendar } from 'lucide-react';

export default function CarrilesIndex({ auth, carriles, profesores }) {
    const { user } = auth;
    const rolNombre = user.rol ? user.rol.nombre_rol : 'Empleado';
    const esAdmin = rolNombre === 'Admin';
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        id_profesor: '',
        activo: 'Disponible'
    });

    const openModal = (carril) => {
        setEditingId(carril.id_carril);
        setData({
            id_profesor: carril.id_profesor || '',
            activo: carril.activo || 'Disponible'
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('carriles.update', editingId), {
            onSuccess: () => closeModal()
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex">
            <Head title="Gestión de Carriles" />

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
                        <Link href={route('pagos.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <CreditCard className="w-5 h-5" /> Control de Pagos
                        </Link>
                        <Link href={route('carriles.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#FF924D] text-white font-medium text-sm transition shadow-md">
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
                    </nav>
                </div>
                <div className="pt-6 border-t border-white/10">
                    <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-500/10 transition text-sm">
                        <LogOut className="w-5 h-5" /> Cerrar Sesión
                    </Link>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm">
                    <h2 className="text-lg font-bold text-[#03444A]">Gestión de Carriles de la Alberca</h2>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-[#03444A] uppercase tracking-wider font-semibold">
                                    <th className="py-3.5 px-6">Carril</th>
                                    <th className="py-3.5 px-6">Instructor Asignado</th>
                                    <th className="py-3.5 px-6">Estado</th>
                                    <th className="py-3.5 px-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {carriles.map((carril) => (
                                    <tr key={carril.id_carril} className="hover:bg-slate-50 transition">
                                        <td className="py-4 px-6 font-semibold text-[#03444A]">Carril {carril.numero_carril}</td>
                                        <td className="py-4 px-6 text-slate-600">
                                            {carril.profesor && carril.profesor.usuario ? carril.profesor.usuario.nombre : 'Sin asignar'}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm font-medium text-slate-700">
                                                {carril.activo}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button onClick={() => openModal(carril)} className="p-1.5 text-slate-400 hover:text-[#00A8A8] transition">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#03444A]">Editar Carril</h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Instructor a Cargo</label>
                                <select value={data.id_profesor} onChange={e => setData('id_profesor', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                    <option value="">Sin asignar</option>
                                    {profesores.map(p => (
                                        <option key={p.id_profesor} value={p.id_profesor}>
                                            {p.usuario ? p.usuario.nombre : 'Profesor ' + p.id_profesor}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_profesor && <span className="text-red-500 text-xs">{errors.id_profesor}</span>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Estado del Carril</label>
                                <select 
                                    value={data.activo} 
                                    onChange={e => setData('activo', e.target.value)} 
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10"
                                >
                                    <option value="Disponible">Disponible</option>
                                    <option value="Ocupado">Ocupado</option>
                                    <option value="Mantenimiento">En Mantenimiento</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancelar</button>
                                <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-bold text-white bg-[#00A8A8] hover:bg-[#03444A] rounded-xl transition shadow-md">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}