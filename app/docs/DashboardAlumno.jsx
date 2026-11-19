import React, { useState } from 'react';
import { QrCode, CreditCard, Bot, Calendar, CheckCircle, LogOut, Droplets, Send } from 'lucide-react';

export default function StudentDashboard() {
  const [question, setQuestion] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'ai', text: '¡Hola Mateo! Tu membresía está al corriente. Tu próxima clase es hoy a las 16:00 hrs en el Carril 2. ¿Tienes alguna duda?' }
  ]);

  const handleAskAi = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setChatLog([
      ...chatLog,
      { sender: 'user', text: question },
      { sender: 'ai', text: 'Recuerda traer gorra de natación, goggles y sandalias antiderrapantes. Si necesitas reponer una clase, puedes solicitarlo aquí mismo.' }
    ]);
    setQuestion('');
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
              <p className="text-xs text-cyan-200">Portal del Alumno</p>
            </div>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/15 text-cyan-300 font-medium text-sm">
              <QrCode className="w-5 h-5" /> Mi Credencial QR
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition text-sm">
              <CreditCard className="w-5 h-5" /> Mis Pagos
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition text-sm">
              <Calendar className="w-5 h-5" /> Mis Horarios
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
          <h2 className="text-lg font-bold text-slate-800">Bienvenido, Mateo Hernández</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full">
              Alumno Activo
            </span>
            <div className="w-9 h-9 rounded-full bg-cyan-600 text-white flex items-center font-bold justify-center text-sm">
              MH
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tarjeta de Credencial Digital QR */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1565c0] mb-2">
              Pase de Acceso Digital
            </span>
            <h3 className="text-lg font-extrabold text-slate-800 mb-4">Mateo Hernández López</h3>

            <div className="w-48 h-48 bg-slate-50 border-2 border-[#1565c0]/20 rounded-2xl flex items-center justify-center mb-4 p-4 shadow-inner">
              <QrCode className="w-36 h-36 text-[#0a3666]" />
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Escanea este código en el lector de entrada para registrar tu asistencia
            </p>

            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Acceso Autorizado • Al Corriente
            </span>
          </div>

          {/* Columna Derecha: Horarios, Pagos y Asistente IA */}
          <div className="lg:col-span-2 space-y-6">
            {/* Horario y Estado de Cuenta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 text-[#1565c0] font-bold text-sm mb-3">
                  <Calendar className="w-4 h-4" /> Mi Horario Asignado
                </div>
                <p className="text-base font-bold text-slate-800">Lunes, Miércoles y Viernes</p>
                <p className="text-sm text-slate-600 mt-1">16:00 a 17:00 hrs • Carril 2</p>
                <p className="text-xs text-slate-400 mt-2">Profesor: Alejandro Vega</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-3">
                  <CreditCard className="w-4 h-4" /> Estado de Mensualidad
                </div>
                <p className="text-base font-bold text-slate-800">$650.00 MXN (Pagado)</p>
                <p className="text-sm text-slate-600 mt-1">Próximo corte: 15 de Diciembre</p>
                <p className="text-xs text-emerald-600 font-medium mt-2">Sin adeudos pendientes</p>
              </div>
            </div>

            {/* Asistente Virtual IA para Alumnos */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Bot className="w-5 h-5 text-[#1565c0]" />
                <h3 className="text-base font-bold text-slate-800">Asistente Virtual SAEN</h3>
              </div>

              <div className="space-y-3 max-h-44 overflow-y-auto mb-4">
                {chatLog.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'ai'
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-[#1565c0] text-white ml-12'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleAskAi} className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Consulta reglamento, reposición de clases o pagos..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1565c0]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1565c0] hover:bg-[#0e4d92] text-white rounded-xl transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
                >
                  Enviar <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}