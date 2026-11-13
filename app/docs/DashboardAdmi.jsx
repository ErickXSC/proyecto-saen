import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  Calendar,
  QrCode,
  Bot,
  ShieldAlert,
  LogOut,
  TrendingUp,
  CheckCircle2,
  Search,
  Send,
  Droplets,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hola Administrador. Hoy han ingresado 64 alumnos por QR y hay 3 membresías por vencer esta semana. ¿En qué te ayudo?' }
  ]);

  const recentQrLogs = [
    { id: 1, name: 'Mateo Hernández López', role: 'Alumno', lane: 'Carril 2 - Intermedio', time: '16:02 hrs', status: 'Autorizado' },
    { id: 2, name: 'Sofía Ramírez Cruz', role: 'Alumno', lane: 'Carril 1 - Principiante', time: '15:58 hrs', status: 'Autorizado' },
    { id: 3, name: 'Carlos Mendoza Ruiz', role: 'Alumno', lane: 'Carril 4 - Avanzado', time: '15:51 hrs', status: 'Adeudo Pendiente' },
    { id: 4, name: 'Prof. Alejandro Vega', role: 'Profesor', lane: 'Carril 1 y 2', time: '15:45 hrs', status: 'Autorizado' },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { sender: 'user', text: chatInput }, { sender: 'ai', text: 'Procesando consulta sobre "' + chatInput + '" en la base de datos de SAEN...' }]);
    setChatInput('');
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
              <p className="text-xs text-cyan-200">Administración</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('resumen')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer ${
                activeTab === 'resumen' ? 'bg-white/15 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <TrendingUp className="w-5 h-5" /> Resumen General
            </button>
            <button
              onClick={() => setActiveTab('alumnos')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer ${
                activeTab === 'alumnos' ? 'bg-white/15 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" /> Alumnos y Pagos
            </button>
            <button
              onClick={() => setActiveTab('ia')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition cursor-pointer ${
                activeTab === 'ia' ? 'bg-white/15 text-cyan-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Bot className="w-5 h-5" /> Asistente IA
            </button>
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
          <h2 className="text-lg font-bold text-slate-800">Panel de Control Administrativo</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold bg-blue-100 text-[#1565c0] px-3 py-1 rounded-full">
              Administrador
            </span>
            <div className="w-9 h-9 rounded-full bg-[#1565c0] text-white flex items-center font-bold justify-center text-sm">
              AD
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Alumnos Activos</p>
                <h3 className="text-2xl font-extrabold text-slate-800">248</h3>
              </div>
              <div className="p-3 bg-blue-50 text-[#1565c0] rounded-xl">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Pagos al Corriente</p>
                <h3 className="text-2xl font-extrabold text-emerald-600">89%</h3>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Adeudos Pendientes</p>
                <h3 className="text-2xl font-extrabold text-amber-600">27</h3>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <ShieldAlert className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Ingresos del Mes</p>
                <h3 className="text-2xl font-extrabold text-slate-800">$124,500</h3>
              </div>
              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monitor de Accesos QR en tiempo real */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#1565c0]" />
                  <h3 className="text-base font-bold text-slate-800">Últimos Accesos por Credencial QR</h3>
                </div>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
                  ● Lector Activo
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs text-slate-400 uppercase">
                      <th className="py-3 px-2">Usuario</th>
                      <th className="py-3 px-2">Asignación</th>
                      <th className="py-3 px-2">Hora</th>
                      <th className="py-3 px-2">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {recentQrLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-3 px-2 font-medium text-slate-800">{log.name}</td>
                        <td className="py-3 px-2 text-slate-500">{log.lane}</td>
                        <td className="py-3 px-2 text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {log.time}
                        </td>
                        <td className="py-3 px-2">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              log.status === 'Autorizado'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Widget Rápido de Asistente IA */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <Bot className="w-5 h-5 text-[#1565c0]" />
                  <h3 className="text-base font-bold text-slate-800">Asistente IA SAEN</h3>
                </div>

                <div className="space-y-3 max-h-56 overflow-y-auto mb-4 pr-1">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl text-xs leading-relaxed ${
                        m.sender === 'ai'
                          ? 'bg-blue-50 text-slate-700 border border-blue-100'
                          : 'bg-[#1565c0] text-white ml-6'
                      }`}
                    >
                      {m.text}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Pregunta sobre pagos o grupos..."
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1565c0]"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#1565c0] text-white rounded-lg hover:bg-[#0e4d92] transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}