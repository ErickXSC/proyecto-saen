import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LayoutDashboard, Users, CreditCard, QrCode, Bot, LogOut, Edit, X, Waves, Calendar, Package, Plus, Trash2, RotateCcw } from 'lucide-react';

export default function InventarioIndex({ auth, inventario, prestamos, alumnos }) {
    const { user } = auth;
    const rolNombre = user.rol ? user.rol.nombre_rol : 'Empleado';
    const esAdmin = rolNombre === 'Admin';
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPrestarOpen, setIsPrestarOpen] = useState(false);
    const [isPrestamosListOpen, setIsPrestamosListOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        nombre_articulo: '',
        cantidad_total: '',
        stock_minimo: '',
        estado: 'Bueno'
    });

    const { data: prestamoData, setData: setPrestamoData, post: postPrestamo, reset: resetPrestamo, errors: prestamoErrors, processing: procesandoPrestamo } = useForm({
        id_alumno: '',
        cantidad: 1
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('inventario.store'), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            }
        });
    };

    const handlePrestarSubmit = (e) => {
        e.preventDefault();
        postPrestamo(route('inventario.prestar', selectedItem.id_inventario), {
            onSuccess: () => {
                setIsPrestarOpen(false);
                resetPrestamo();
            }
        });
    };

    const openPrestarModal = (item) => {
        setSelectedItem(item);
        setPrestamoData({ id_alumno: '', cantidad: 1 });
        setIsPrestarOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex">
            <Head title="Inventario y Préstamos" />

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
                        <Link href={route('inventario.index')} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#FF924D] text-white font-medium text-sm transition shadow-md">
                            <Package className="w-5 h-5" /> Inventario
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
                    <h2 className="text-lg font-bold text-[#03444A]">Inventario y Préstamos</h2>
                    <div className="flex gap-3">
                        <button onClick={() => setIsPrestamosListOpen(true)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#03444A] text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm border border-slate-300">
                            Ver Préstamos Activos
                        </button>
                        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#FF924D] hover:bg-[#E66414] text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-sm">
                            <Plus className="w-4 h-4" /> Nuevo Artículo
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-[#03444A] uppercase tracking-wider font-semibold">
                                    <th className="py-3.5 px-6">Artículo</th>
                                    <th className="py-3.5 px-6">Stock Disponible</th>
                                    <th className="py-3.5 px-6">Estado</th>
                                    <th className="py-3.5 px-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {inventario.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-slate-500">No hay artículos en inventario.</td>
                                    </tr>
                                ) : (
                                    inventario.map((item) => (
                                        <tr key={item.id_inventario} className="hover:bg-slate-50 transition">
                                            <td className="py-4 px-6 font-semibold text-[#03444A]">{item.nombre_articulo}</td>
                                            <td className="py-4 px-6 text-slate-600 font-bold">
                                                {item.cantidad_total} <span className="text-xs font-normal">(Mínimo: {item.stock_minimo})</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.estado === 'Bueno' ? 'bg-[#00A8A8]/20 text-[#00A8A8]' : item.estado === 'Regular' ? 'bg-[#FF924D]/20 text-[#E66414]' : 'bg-red-100 text-red-700'}`}>
                                                    {item.estado}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button onClick={() => openPrestarModal(item)} className="px-3 py-1.5 bg-[#00A8A8] hover:bg-[#03444A] text-white text-xs font-bold rounded-lg transition shadow-sm">
                                                    Prestar
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

            {/* MODAL NUEVO ARTICULO */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#03444A]">Registrar Artículo</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Nombre del Artículo</label>
                                <input type="text" value={data.nombre_articulo} onChange={e => setData('nombre_articulo', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                {errors.nombre_articulo && <span className="text-red-500 text-xs">{errors.nombre_articulo}</span>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Cantidad Inicial</label>
                                    <input type="number" min="1" value={data.cantidad_total} onChange={e => setData('cantidad_total', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#03444A] mb-1">Stock Mínimo</label>
                                    <input type="number" min="0" value={data.stock_minimo} onChange={e => setData('stock_minimo', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Estado Físico</label>
                                <select value={data.estado} onChange={e => setData('estado', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                    <option value="Bueno">Bueno</option>
                                    <option value="Regular">Regular</option>
                                    <option value="Malo">Malo</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancelar</button>
                                <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-bold text-white bg-[#00A8A8] hover:bg-[#03444A] rounded-xl transition shadow-md">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL PRESTAR */}
            {isPrestarOpen && selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#03444A]">Prestar {selectedItem.nombre_articulo}</h3>
                            <button onClick={() => setIsPrestarOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handlePrestarSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Alumno</label>
                                <select value={prestamoData.id_alumno} onChange={e => setPrestamoData('id_alumno', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10">
                                    <option value="">Seleccionar Alumno...</option>
                                    {alumnos.map(a => (
                                        <option key={a.id_alumno} value={a.id_alumno}>{a.nombre_completo}</option>
                                    ))}
                                </select>
                                {prestamoErrors.id_alumno && <span className="text-red-500 text-xs">{prestamoErrors.id_alumno}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#03444A] mb-1">Cantidad (Máx: {selectedItem.cantidad_total})</label>
                                <input type="number" min="1" max={selectedItem.cantidad_total} value={prestamoData.cantidad} onChange={e => setPrestamoData('cantidad', e.target.value)} required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#00A8A8] focus:outline-none bg-[#9AD3DA]/10" />
                                {prestamoErrors.cantidad && <span className="text-red-500 text-xs">{prestamoErrors.cantidad}</span>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsPrestarOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition">Cancelar</button>
                                <button type="submit" disabled={procesandoPrestamo} className="px-4 py-2 text-sm font-bold text-white bg-[#FF924D] hover:bg-[#E66414] rounded-xl transition shadow-md">Registrar Préstamo</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL LISTA DE PRESTAMOS ACTIVOS */}
            {isPrestamosListOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-[#03444A]">Préstamos Activos</h3>
                            <button onClick={() => setIsPrestamosListOpen(false)} className="text-slate-400 hover:text-red-500 transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            {prestamos.length === 0 ? (
                                <p className="text-center text-slate-500 py-4">No hay préstamos activos.</p>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 text-xs text-[#03444A] uppercase font-semibold">
                                            <th className="py-2 px-4">Alumno</th>
                                            <th className="py-2 px-4">Artículo</th>
                                            <th className="py-2 px-4">Cant.</th>
                                            <th className="py-2 px-4 text-right">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        {prestamos.map(p => (
                                            <tr key={p.id_prestamo} className="hover:bg-slate-50">
                                                <td className="py-3 px-4 font-medium text-[#03444A]">{p.alumno}</td>
                                                <td className="py-3 px-4 text-slate-600">{p.articulo}</td>
                                                <td className="py-3 px-4 text-slate-600 font-bold">{p.cantidad}</td>
                                                <td className="py-3 px-4 text-right">
                                                    <button onClick={() => {
                                                        if(confirm('¿Confirmar devolución?')) {
                                                            post(route('inventario.devolver', p.id_prestamo), { preserveScroll: true });
                                                        }
                                                    }} className="px-3 py-1.5 bg-slate-100 hover:bg-[#00A8A8] text-[#03444A] hover:text-white text-xs font-bold rounded-lg transition">
                                                        Devolver
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}