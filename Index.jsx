jsx
import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LayoutDashboard, Users, CreditCard, QrCode, Bot, LogOut, Edit, X, Waves, Calendar, Package, UserCog, Handshake, Plus, Trash2 } from 'lucide-react';

export default function ConveniosIndex({ auth, convenios }) {
    const { user } = auth;
    const rolNombre = user.rol ? user.rol.nombre_rol : 'Empleado';
    const esAdmin = rolNombre === 'Admin';
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        nombre_institucion: '',
        tipo_beneficio: '',
        descuento_porcentaje: '',
        fecha_inicio: '',
        fecha_fin: '',
        estado: 'Activo'
    });

    const openModal = (convenio = null) => {
        reset();
        if (convenio) {
            setIsEditing(true);
            setEditingId(convenio.id_convenio);
            setData({
                nombre_institucion: convenio.nombre_institucion,
                tipo_beneficio: convenio.tipo_beneficio,
                descuento_porcentaje: convenio.descuento_porcentaje || '',
                fecha_inicio: convenio.fecha_inicio,
                fecha_fin: convenio.fecha_fin || '',
                estado: convenio.estado
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
            put(route('convenios.update', editingId), {
                onSuccess: () => closeModal()
            });
        } else {
            post(route('convenios.store'), {
                onSuccess: () => closeModal()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este convenio?')) {
            destroy(route('convenios.destroy', id));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex">
            <Head title="Convenios Institucionales" />

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
                        <Link href={route('convenios.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#FF924D] text-white font-medium text-sm transition shadow-md">
                            <Handshake className="w-5 h-5" /> Convenios
                        </Link>
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
                    <h2 className="text-lg font-bold text-[#03444A]">Convenios Institucionales</h2>
                    <button onClick={() => openModal()} className="px-4 py-2 bg-[#FF924D] hover:bg-[#E66414] text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm">
                        <Plus className="w-4 h-4" /> Nuevo Convenio
                    </button>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-[#03444A] uppercase tracking-wider font-semibold">
                                    <th className="py-3.5 px-6">Institución</th>
                                    <th className="py-3.5 px-6">Beneficio</th>
                                    <th className="py-3.5 px-6">Vigencia</th>
                                    <th className="py-3.5 px-6">Estado</th>
                                    <th className="py-3.5 px-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {convenios.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-slate-500">No hay convenios registrados.</td>
                                    </tr>
                                ) : (
                                    convenios.map((c) => (
                                        <tr key={c.id_convenio} className="hover:bg-slate-50 transition">
                                            <td className="py-4 px-6 font-semibold text-[#03444A]">{c.nombre_institucion}</td>
                                            <td className="py-4 px-6 text-slate-600">
                                                {c.tipo_beneficio} {c.descuento_porcentaje ? `(${c.descuento_porcentaje}%)` : ''}
                                            </td>
                                            <td className="py-4 px-6 text-slate-600">
                                                {c.fecha_inicio} {c.fecha_fin ? `al ${c.fecha_fin}` : ''}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.estado === 'Activo' ? 'bg-[#00A8A8]/20 text-[#00A8A8]' : 'bg-red-100 text-red-700'}`}>
                                                    {c.estado}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <button onClick={() => openModal(c)} className="p-1.5 text-slate-400 hover:text-[#00A8A8] transition">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(c.id_convenio)} className="p-1.5 text-slate-400 hover:text-red-600 transition">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#03444A]">{isEditing ? 'Editar Convenio' : 'Registrar Nuevo Convenio'}</h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Nombre de la Institución</label>
                                <input type="text" value={data.nombre_institucion} onChange={e => setData('nombre_institucion', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                {errors.nombre_institucion && <span className="text-red-500 text-xs">{errors.nombre_institucion}</span>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Tipo de Beneficio</label>
                                    <input type="text" value={data.tipo_beneficio} onChange={e => setData('tipo_beneficio', e.target.value)} required placeholder="Ej. Descuento en mensualidad" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                    {errors.tipo_beneficio && <span className="text-red-500 text-xs">{errors.tipo_beneficio}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Descuento (%) - Opcional</label>
                                    <input type="number" step="0.01" value={data.descuento_porcentaje} onChange={e => setData('descuento_porcentaje', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Fecha de Inicio</label>
                                    <input type="date" value={data.fecha_inicio} onChange={e => setData('fecha_inicio', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                    {errors.fecha_inicio && <span className="text-red-500 text-xs">{errors.fecha_inicio}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Fecha de Fin - Opcional</label>
                                    <input type="date" value={data.fecha_fin} onChange={e => setData('fecha_fin', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                    {errors.fecha_fin && <span className="text-red-500 text-xs">{errors.fecha_fin}</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Estado</label>
                                <select value={data.estado} onChange={e => setData('estado', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancelar</button>
                                <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-bold text-white bg-[#00A8A8] hover:bg-[#03444A] rounded-xl transition shadow-md">
                                    {processing ? 'Guardando...' : 'Guardar Convenio'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
