
import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LayoutDashboard, Users, CreditCard, QrCode, Bot, LogOut, Edit, X, Waves, Calendar, Package, UserCog, Plus } from 'lucide-react';

export default function UsuariosIndex({ auth, usuarios, roles }) {
    const { user } = auth;
    const rolNombre = user.rol ? user.rol.nombre_rol : 'Empleado';
    const esAdmin = rolNombre === 'Admin';
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nombre: '',
        email: '',
        password: '',
        password_confirmation: '',
        id_rol: '',
        activo: true
    });

    const openModal = (usuario = null) => {
        reset();
        if (usuario) {
            setIsEditing(true);
            setEditingId(usuario.id_usuario);
            setData({
                nombre: usuario.nombre,
                email: usuario.email,
                id_rol: usuario.id_rol,
                activo: usuario.activo,
                password: '',
                password_confirmation: ''
            });
        } else {
            setIsEditing(false);
            setEditingId(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('usuarios.update', editingId), {
                onSuccess: () => closeModal()
            });
        } else {
            post(route('usuarios.store'), {
                onSuccess: () => closeModal()
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex">
            <Head title="Gestión de Usuarios" />

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
                        <Link href={route('carriles.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <Waves className="w-5 h-5" /> Carriles
                        </Link>
                        <Link href={route('horarios.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <Calendar className="w-5 h-5" /> Horarios
                        </Link>
                        <Link href={route('inventario.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <Package className="w-5 h-5" /> Inventario
                        </Link>
                        
                        {/* SOLO ADMIN PUEDE VER USUARIOS */}
                         {esAdmin && (
                           <Link href={route('usuarios.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                           <UserCog className="w-5 h-5" /> Usuarios y Roles
                         </Link>
                           )}
                        
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
                    <h2 className="text-lg font-bold text-[#03444A]">Gestión de Usuarios y Roles</h2>
                    <button onClick={() => openModal()} className="px-4 py-2 bg-[#FF924D] hover:bg-[#E66414] text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm">
                        <Plus className="w-4 h-4" /> Nuevo Usuario
                    </button>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-[#03444A] uppercase tracking-wider font-semibold">
                                    <th className="py-3.5 px-6">Nombre</th>
                                    <th className="py-3.5 px-6">Email</th>
                                    <th className="py-3.5 px-6">Rol</th>
                                    <th className="py-3.5 px-6">Estado</th>
                                    <th className="py-3.5 px-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {usuarios.map((u) => (
                                    <tr key={u.id_usuario} className="hover:bg-slate-50 transition">
                                        <td className="py-4 px-6 font-semibold text-[#03444A]">{u.nombre}</td>
                                        <td className="py-4 px-6 text-slate-600">{u.email}</td>
                                        <td className="py-4 px-6 text-slate-600">
                                            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">
                                                {u.rol ? u.rol.nombre_rol : 'Sin rol'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.activo ? 'bg-[#00A8A8]/20 text-[#00A8A8]' : 'bg-red-100 text-red-700'}`}>
                                                {u.activo ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button onClick={() => openModal(u)} className="p-1.5 text-slate-400 hover:text-[#00A8A8] transition">
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
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#03444A]">{isEditing ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Nombre Completo</label>
                                <input type="text" value={data.nombre} onChange={e => setData('nombre', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Correo Electrónico</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                            </div>
                            
                            {!isEditing && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-[#03444A] mb-1">Contraseña</label>
                                        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                        {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#03444A] mb-1">Confirmar Contraseña</label>
                                        <input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Rol Asignado</label>
                                <select value={data.id_rol} onChange={e => setData('id_rol', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                    <option value="">Seleccionar Rol...</option>
                                    {roles.map(r => (
                                        <option key={r.id_rol} value={r.id_rol}>{r.nombre_rol}</option>
                                    ))}
                                </select>
                                {errors.id_rol && <span className="text-red-500 text-xs">{errors.id_rol}</span>}
                            </div>

                            {isEditing && (
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Estado de la cuenta</label>
                                    <select value={data.activo ? '1' : '0'} onChange={e => setData('activo', e.target.value === '1')} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancelar</button>
                                <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-bold text-white bg-[#00A8A8] hover:bg-[#03444A] rounded-xl transition shadow-md">
                                    {processing ? 'Guardando...' : 'Guardar Usuario'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}