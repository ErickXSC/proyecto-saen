import React, { useState } from 'react';
import { QrCode, CreditCard, Bot, Eye, EyeOff, Droplets } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('Administrador');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const roles = ['Administrador', 'Profesor', 'Alumno'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, email, password });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 font-sans">
      {/* Panel Izquierdo: Identidad Visual y Pilares de SAEN */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#0a3666] via-[#0e4d92] to-[#1565c0] text-white flex flex-col justify-center items-center p-10 lg:p-16 relative overflow-hidden">
        {/* Decoración de fondo geométrica sutil */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-300 via-transparent to-transparent"></div>

        <div className="max-w-md w-full flex flex-col items-center text-center z-10">
          {/* Logo SAEN */}
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20 shadow-lg">
            <Droplets className="w-12 h-12 text-cyan-300" />
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight mb-2">SAEN</h1>
          <p className="text-lg text-cyan-100 font-medium mb-12">
            Sistema Automatizado para Escuelas de Natación
          </p>

          {/* Iconos de Características Principales */}
          <div className="grid grid-cols-3 gap-6 w-full pt-8 border-t border-white/15">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white/10 rounded-xl mb-3">
                <QrCode className="w-7 h-7 text-cyan-300" />
              </div>
              <span className="text-xs font-medium text-blue-100 leading-tight">
                Acceso por QR
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white/10 rounded-xl mb-3">
                <CreditCard className="w-7 h-7 text-cyan-300" />
              </div>
              <span className="text-xs font-medium text-blue-100 leading-tight">
                Pagos Automatizados
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-white/10 rounded-xl mb-3">
                <Bot className="w-7 h-7 text-cyan-300" />
              </div>
              <span className="text-xs font-medium text-blue-100 leading-tight">
                Asistente de IA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Derecho: Formulario de Inicio de Sesión */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          {/* Selector de Roles */}
          <div className="grid grid-cols-3 border-b border-slate-200 mb-8">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`pb-3 text-sm font-semibold transition-all border-b-2 ${
                  role === r
                    ? 'border-[#1565c0] text-[#1565c0]'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Correo Electrónico */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1565c0] focus:border-transparent transition pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón de Ingreso */}
            <button
              type="submit"
              className="w-full bg-[#1565c0] hover:bg-[#0e4d92] text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Enlaces inferiores */}
          <div className="mt-6 flex flex-col items-center space-y-2 text-sm">
            <a
              href="#recuperar"
              className="text-slate-600 hover:text-[#1565c0] transition"
            >
              ¿Olvidaste tu contraseña?
            </a>
            <a
              href="/register"
              className="text-slate-500 hover:text-[#1565c0] font-medium transition"
            >
              Registrar nueva cuenta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}