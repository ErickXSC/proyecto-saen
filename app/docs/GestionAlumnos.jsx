import React, { useState } from 'react';
import { Users, Search, Plus, Filter, QrCode, Edit, Trash2, Droplets, LogOut } from 'lucide-react';

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState('');

  const studentsList = [
    { id: 1, name: 'Mateo Hernández López', email: 'mateo@correo.com', level: 'Intermedio', lane: 'Carril 2', status: 'Activo' },
    { id: 2, name: 'Sofía Ramírez Cruz', email: 'sofia@correo.com', level: 'Principiante', lane: 'Carril 1', status: 'Activo' },
    { id: 3, name: 'Carlos Mendoza Ruiz', email: 'carlos@correo.com', level: 'Avanzado', lane: 'Carril 4', status: 'Adeudo' },
    { id: 4, name: 'Valeria Gómez Díaz', email: 'valeria@correo.com', level: 'Intermedio', lane: 'Carril 2', status: 'Activo' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      {/* Sidebar básico */}
      <aside className="w-64 bg-[#0a3666] text-white hidden md:flex flex-col justify-between p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center border border-cyan-400/30">
              <Droplets className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider">SAEN</h1>
              <p className="text-xs text-cyan-200">Administración</p>
            </div>
          </div>
          <nav className="space-y-2">
            <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition text-sm">
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/15 text-cyan-300 font-medium text-sm">
              <Users className="w-5 h-5" /> Gestión de Alumnos
            </a>
          </nav>
        </div>
        <div className="pt-6 border-t border-white/10">
          <a href="/login" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-500/10 transition text-sm">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </a>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">Directorio de Alumnos y Nadadores</h2>
          <button className="px-4 py-2 bg-[#1565c0] hover:bg-[#0e4d92] text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4" /> Nuevo Alumno
          </button>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Barra de búsqueda y filtros */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1565c0]"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button className="px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Filtrar Nivel
              </button>
            </div>
          </div>

          {/* Tabla de Alumnos */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Alumno</th>
                  <th className="py-3.5 px-6">Nivel</th>
                  <th className="py-3.5 px-6">Carril Asignado</th>
                  <th className="py-3.5 px-6">Estatus</th>
                  <th className="py-3.5 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {studentsList.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-slate-800">{st.name}</p>
                      <p className="text-xs text-slate-400">{st.email}</p>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{st.level}</td>
                    <td className="py-4 px-6 text-slate-600 font-medium">{st.lane}</td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        st.status === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {st.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button className="p-1.5 text-slate-400 hover:text-[#1565c0] transition"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 transition"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}