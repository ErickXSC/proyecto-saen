import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LayoutDashboard, Users, CreditCard, QrCode, Bot, LogOut, Edit, X, Waves, Calendar, Plus, Trash2, UserPlus, Package, UserCog } from 'lucide-react';

export default function HorariosIndex({ auth, horarios, profesores, carriles, alumnos }) {
    const { user } = auth;
    const rolNombre = user.rol ? user.rol.nombre_rol : 'Empleado';
    const esAdmin = rolNombre === 'Admin';
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAsignarOpen, setIsAsignarOpen] = useState(false);
    const [selectedHorario, setSelectedHorario] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        id_profesor: '',
        id_carril: '',
        dia_semana: 'Lunes',
        hora_inicio: '',
        hora_fin: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('horarios.store'), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este horario?')) {
            destroy(route('horarios.destroy', id));
        }
    };

    const openAsignarModal = (horario) => {
        setSelectedHorario(horario);
        setIsAsignarOpen(true);
    };

    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex">
            <Head title="Gestión de Horarios" />

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
                        <Link href={route('horarios.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#FF924D] text-white font-medium text-sm transition shadow-md">
                            <Calendar className="w-5 h-5" /> Horarios
                        </Link>
                        <Link href={route('inventario.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#9AD3DA] hover:bg-white/5 hover:text-white transition text-sm">
                            <Package className="w-5 h-5" /> Inventario
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
                    <h2 className="text-lg font-bold text-[#03444A]">Horarios de Clases</h2>
                    <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#FF924D] hover:bg-[#E66414] text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm">
                        <Plus className="w-4 h-4" /> Nuevo Horario
                    </button>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-[#03444A] uppercase tracking-wider font-semibold">
                                    <th className="py-3.5 px-6">Día</th>
                                    <th className="py-3.5 px-6">Hora</th>
                                    <th className="py-3.5 px-6">Carril</th>
                                    <th className="py-3.5 px-6">Instructor</th>
                                    <th className="py-3.5 px-6 text-center">Alumnos</th>
                                    <th className="py-3.5 px-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {horarios.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-slate-500">No hay horarios registrados.</td>
                                    </tr>
                                ) : (
                                    horarios.map((horario) => (
                                        <tr key={horario.id_horario} className="hover:bg-slate-50 transition">
                                            <td className="py-4 px-6 font-semibold text-[#03444A]">{horario.dia_semana}</td>
                                            <td className="py-4 px-6 text-slate-600">{horario.hora_inicio} - {horario.hora_fin}</td>
                                            <td className="py-4 px-6 text-slate-600">Carril {horario.carril ? horario.carril.numero_carril : 'N/A'}</td>
                                            <td className="py-4 px-6 text-slate-600">{horario.profesor ? horario.profesor.usuario.nombre : 'Sin asignar'}</td>
                                            <td className="py-4 px-6 text-center">
                                                <button onClick={() => openAsignarModal(horario)} className="inline-flex items-center gap-1 px-2 py-1 bg-[#9AD3DA]/30 text-[#03444A] rounded text-xs font-semibold hover:bg-[#9AD3DA]/50 transition">
                                                    <UserPlus className="w-3 h-3" /> {horario.alumnos ? horario.alumnos.length : 0} Inscritos
                                                </button>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button onClick={() => handleDelete(horario.id_horario)} className="p-1.5 text-slate-400 hover:text-red-600 transition">
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
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#03444A]">Registrar Nuevo Horario</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Día de la semana</label>
                                    <select value={data.dia_semana} onChange={e => setData('dia_semana', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                        {dias.map(d => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Hora Inicio</label>
                                    <input type="time" value={data.hora_inicio} onChange={e => setData('hora_inicio', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Hora Fin</label>
                                    <input type="time" value={data.hora_fin} onChange={e => setData('hora_fin', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Carril</label>
                                    <select value={data.id_carril} onChange={e => setData('id_carril', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                        <option value="">Seleccionar Carril...</option>
                                        {carriles.map(c => (
                                            <option key={c.id_carril} value={c.id_carril}>Carril {c.numero_carril} ({c.activo})</option>
                                        ))}
                                    </select>
                                    {errors.id_carril && <span className="text-red-500 text-xs">{errors.id_carril}</span>}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Instructor</label>
                                    <select value={data.id_profesor} onChange={e => setData('id_profesor', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                        <option value="">Seleccionar Profesor...</option>
                                        {profesores.map(p => (
                                            <option key={p.id_profesor} value={p.id_profesor}>{p.usuario ? p.usuario.nombre : 'Profesor ' + p.id_profesor}</option>
                                        ))}
                                    </select>
                                    {errors.id_profesor && <span className="text-red-500 text-xs">{errors.id_profesor}</span>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancelar</button>
                                <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-bold text-white bg-[#00A8A8] hover:bg-[#03444A] rounded-xl transition shadow-md">
                                    Guardar Horario
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isAsignarOpen && selectedHorario && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#03444A]">Inscribir Alumno al Horario</h3>
                            <button onClick={() => setIsAsignarOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            <h4 className="text-sm font-bold text-[#03444A] mb-3">Alumnos Inscritos Actualmente</h4>
                            <div className="space-y-2 mb-6">
                                {selectedHorario.alumnos && selectedHorario.alumnos.length > 0 ? (
                                    selectedHorario.alumnos.map((al) => (
                                        <div key={al.id_alumno} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg">
                                            <span className="text-sm font-medium text-slate-700">{al.nombre_completo}</span>
                                            <span className="text-xs text-[#00A8A8] font-semibold">Inscrito</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500 italic">No hay alumnos inscritos aún.</p>
                                )}
                            </div>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target;
                                const alumnoId = form.elements['id_alumno'].value;
                                post(route('horarios.inscribir', selectedHorario.id_horario), {
                                    id_alumno: alumnoId,
                                    onSuccess: () => {
                                        setIsAsignarOpen(false);
                                    }
                                });
                            }} className="border-t border-slate-100 pt-4">
                                <h4 className="text-sm font-bold text-[#03444A] mb-3">Inscribir Nuevo Alumno</h4>
                                <div className="flex gap-2">
                                    <select name="id_alumno" required className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10 text-sm">
                                        <option value="">Seleccionar Alumno...</option>
                                        {alumnos.map(a => (
                                            <option key={a.id_alumno} value={a.id_alumno}>{a.nombre_completo}</option>
                                        ))}
                                    </select>
                                    <button type="submit" className="px-4 py-2 bg-[#FF924D] hover:bg-[#E66414] text-white text-sm font-bold rounded-lg transition">
                                        Inscribir
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}