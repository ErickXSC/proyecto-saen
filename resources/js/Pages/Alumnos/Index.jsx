import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LayoutDashboard, Users, CreditCard, QrCode, Bot, LogOut, ShieldAlert, Plus, Search, Edit, Trash2, Waves, Calendar, X, UserCog } from 'lucide-react';

export default function AlumnosIndex({ auth, alumnos }) {
    const { user } = auth;
    const rolNombre = user.rol ? user.rol.nombre_rol : 'Empleado';
    const esAdmin = rolNombre === 'Admin';
    const [searchTerm, setSearchTerm] = useState('');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, delete: destroy, reset, errors, processing } = useForm({
        nombre_completo: '',
        fecha_nacimiento: '',
        categoria: '',
        nivel: '',
        tutor_nombre: '',
        tutor_telefono: '',
        tutor_email: '',
        estado: 'Activo'
    });

    const openModal = (alumno = null) => {
        reset();
        if (alumno) {
            setIsEditing(true);
            setEditingId(alumno.id_alumno);
            setData({
                nombre_completo: alumno.nombre_completo,
                fecha_nacimiento: alumno.fecha_nacimiento || '',
                categoria: alumno.categoria === 'Sin categoría' ? '' : alumno.categoria,
                nivel: alumno.nivel === 'Sin nivel' ? '' : alumno.nivel,
                tutor_nombre: '',
                tutor_telefono: '',
                tutor_email: alumno.email === 'Sin correo' ? '' : alumno.email,
                estado: alumno.estado
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
            put(route('alumnos.update', editingId), {
                onSuccess: () => closeModal()
            });
        } else {
            post(route('alumnos.store'), {
                onSuccess: () => closeModal()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de dar de baja a este alumno?')) {
            destroy(route('alumnos.destroy', id));
        }
    };

    const filteredAlumnos = alumnos.filter(al => 
        al.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        al.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex">
            <Head title="Gestión de Alumnos" />

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
                        
                        <Link href={route('alumnos.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#FF924D] text-white font-medium text-sm transition shadow-md">
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

            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm">
                    <h2 className="text-lg font-bold text-[#03444A]">Directorio de Alumnos</h2>
                    <div className="flex items-center gap-3">
                        <button onClick={() => openModal()} className="px-4 py-2 bg-[#FF924D] hover:bg-[#E66414] text-white text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-sm">
                            <Plus className="w-4 h-4" /> Nuevo Alumno
                        </button>
                        <div className="w-9 h-9 rounded-full bg-[#00A8A8] text-white flex items-center font-bold justify-center text-sm shadow-sm">
                            {user.nombre.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-96">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre o correo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00A8A8] bg-[#9AD3DA]/10"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-[#03444A] uppercase tracking-wider font-semibold">
                                    <th className="py-3.5 px-6">Alumno</th>
                                    <th className="py-3.5 px-6">Nivel</th>
                                    <th className="py-3.5 px-6">Categoría</th>
                                    <th className="py-3.5 px-6">Estatus</th>
                                    <th className="py-3.5 px-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {filteredAlumnos.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-8 text-center text-slate-500">No hay alumnos registrados.</td>
                                    </tr>
                                ) : (
                                    filteredAlumnos.map((st) => (
                                        <tr key={st.id_alumno} className="hover:bg-slate-50 transition">
                                            <td className="py-4 px-6">
                                                <p className="font-semibold text-[#03444A]">{st.nombre_completo}</p>
                                                <p className="text-xs text-slate-400">{st.email}</p>
                                            </td>
                                            <td className="py-4 px-6 text-slate-600">{st.nivel}</td>
                                            <td className="py-4 px-6 text-slate-600">{st.categoria}</td>
                                            <td className="py-4 px-6">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                    st.estado === 'Activo' ? 'bg-[#00A8A8]/20 text-[#00A8A8]' : 
                                                    st.estado === 'Congelado' ? 'bg-[#9AD3DA]/30 text-[#03444A]' : 
                                                    'bg-[#FF924D]/20 text-[#E66414]'
                                                }`}>
                                                    {st.estado}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <button onClick={() => openModal(st)} className="p-1.5 text-slate-400 hover:text-[#00A8A8] transition">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(st.id_alumno)} className="p-1.5 text-slate-400 hover:text-red-600 transition">
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
                            <h3 className="text-lg font-bold text-[#03444A]">{isEditing ? 'Editar Alumno' : 'Registrar Nuevo Alumno'}</h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Nombre del Alumno</label>
                                    <input type="text" value={data.nombre_completo} onChange={e => setData('nombre_completo', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                    {errors.nombre_completo && <span className="text-red-500 text-xs">{errors.nombre_completo}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Fecha Nac.</label>
                                    <input type="date" value={data.fecha_nacimiento} onChange={e => setData('fecha_nacimiento', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                    {errors.fecha_nacimiento && <span className="text-red-500 text-xs">{errors.fecha_nacimiento}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Nivel</label>
                                    <select value={data.nivel} onChange={e => setData('nivel', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                        <option value="">Seleccionar...</option>
                                        <option value="Principiante">Principiante</option>
                                        <option value="Intermedio">Intermedio</option>
                                        <option value="Avanzado">Avanzado</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Categoría</label>
                                    <select value={data.categoria} onChange={e => setData('categoria', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                        <option value="">Seleccionar...</option>
                                        <option value="Infantil">Infantil</option>
                                        <option value="Juvenil">Juvenil</option>
                                        <option value="Adulto">Adulto</option>
                                    </select>
                                </div>
                                {isEditing && (
                                    <div>
                                        <label className="block text-sm font-medium text-[#03444A] mb-1">Estado</label>
                                        <select value={data.estado} onChange={e => setData('estado', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                            <option value="Activo">Activo</option>
                                            <option value="Inactivo">Inactivo</option>
                                            <option value="Congelado">Congelado</option>
                                            <option value="Egresado">Egresado</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            {!isEditing && (
                                <div className="pt-4 border-t border-slate-100">
                                    <h4 className="text-sm font-bold text-[#03444A] mb-3">Datos del Tutor</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-[#03444A] mb-1">Nombre del Tutor</label>
                                            <input type="text" value={data.tutor_nombre} onChange={e => setData('tutor_nombre', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                            {errors.tutor_nombre && <span className="text-red-500 text-xs">{errors.tutor_nombre}</span>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#03444A] mb-1">Teléfono</label>
                                            <input type="text" value={data.tutor_telefono} onChange={e => setData('tutor_telefono', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                            {errors.tutor_telefono && <span className="text-red-500 text-xs">{errors.tutor_telefono}</span>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#03444A] mb-1">Correo (Opcional)</label>
                                            <input type="email" value={data.tutor_email} onChange={e => setData('tutor_email', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancelar</button>
                                <button type="submit" disabled={processing} className="px-5 py-2 text-sm font-bold text-white bg-[#00A8A8] hover:bg-[#03444A] rounded-xl transition shadow-md">
                                    {processing ? 'Guardando...' : 'Guardar Alumno'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}