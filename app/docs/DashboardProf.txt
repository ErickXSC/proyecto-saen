import React, { useState } from 'react';
import { Users, Calendar, CheckSquare, LogOut, Clock, Droplets, CheckCircle2, XCircle } from 'lucide-react';

export default function TeacherDashboard() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Mateo Hernández López', lane: 'Carril 2', level: 'Intermedio', present: true },
    { id: 2, name: 'Valeria Gómez Díaz', lane: 'Carril 2', level: 'Intermedio', present: true },
    { id: 3, name: 'Diego Morales Torres', lane: 'Carril 2', level: 'Intermedio', present: false },
    { id: 4, name: 'Camila Ortiz Silva', lane: 'Carril 2', level: 'Intermedio', present: true },
  ]);

  const toggleAttendance = (id) => {
    setStudents(
      students.map((st) => (st.id === id ? { ...st, present: !st.present } : st))
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a3666] text-white hidden md:flex flex-col justify-between p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center border border-cyan-400/30">
              <Droplets className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider">SAEN</h1>
              <p className="text-xs text-cyan-200">Portal Docente</p>
            </div>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/15 text-cyan-300 font-medium text-sm">
              <Calendar className="w-5 h-5" /> Mis Grupos y Lista
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition text-sm">
              <CheckSquare className="w-5 h-5" /> Historial de Clases
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
          <h2 className="text-lg font-bold text-slate-800">Control de Grupos y Asistencia</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
              Profesor
            </span>
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center font-bold justify-center text-sm">
              PR
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Tarjetas Resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Sesiones Hoy</p>
                <h3 className="text-2xl font-extrabold text-slate-800">4 Clases</h3>
              </div>
              <div className="p-3 bg-blue-50 text-[#1565c0] rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Alumnos en Grupo Actual</p>
                <h3 className="text-2xl font-extrabold text-slate-800">{students.length} Nadadores</h3>
              </div>
              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Horario Activo</p>
                <h3 className="text-xl font-bold text-slate-800">16:00 - 17:00 hrs</h3>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Lista de Pase de Asistencia */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-800">Pase de Lista — Carril 2 (Nivel Intermedio)</h3>
                <p className="text-xs text-slate-500">Haz clic en el estado de cada alumno para confirmar su asistencia en alberca</p>
              </div>
              <button className="px-4 py-2 bg-[#1565c0] hover:bg-[#0e4d92] text-white text-xs font-semibold rounded-xl transition cursor-pointer">
                Guardar Lista del Grupo
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {students.map((student) => (
                <div key={student.id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{student.name}</p>
                    <p className="text-xs text-slate-400">{student.lane} • {student.level}</p>
                  </div>

                  <button
                    onClick={() => toggleAttendance(student.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                      student.present
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {student.present ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Presente (QR Validado)
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" /> Ausente
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}