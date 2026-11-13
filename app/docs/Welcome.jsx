import React from 'react';
import { Droplets, QrCode, CreditCard, Bot, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a3666] via-[#0e4d92] to-[#1565c0] text-white font-sans flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header / Barra superior */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
            <Droplets className="w-7 h-7 text-cyan-300" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-wider">SAEN</h1>
            <p className="text-xs text-cyan-200 font-medium">Escuela de Natación</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition backdrop-blur-sm"
          >
            Iniciar Sesión
          </a>
          <a
            href="/register"
            className="hidden sm:inline-flex px-5 py-2 rounded-xl text-sm font-semibold text-[#0a3666] bg-cyan-300 hover:bg-cyan-200 transition shadow-lg"
          >
            Registrarse
          </a>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-4xl w-full mx-auto text-center my-auto z-10 py-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-cyan-200 text-xs font-semibold mb-6 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-cyan-300" /> Sistema Automatizado e Inteligente
        </span>

        <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
          Gestión Avanzada para tu <span className="text-cyan-300">Escuela de Natación</span>
        </h2>

        <p className="text-base sm:text-lg text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
          Control de accesos mediante códigos QR, automatización de pagos mensuales y un asistente de inteligencia artificial integrado para optimizar la administración.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-cyan-300 text-[#0a3666] hover:bg-cyan-200 transition shadow-xl flex items-center justify-center gap-2 text-base"
          >
            Acceder al Sistema <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/25 transition backdrop-blur-sm text-base"
          >
            Crear Cuenta Nueva
          </a>
        </div>

        {/* Tarjetas de Características */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/15 text-left">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
              <QrCode className="w-6 h-6 text-cyan-300" />
            </div>
            <h3 className="font-bold text-white mb-1">Credencial QR</h3>
            <p className="text-xs text-blue-200 leading-relaxed">
              Control de entradas y asistencias rápidas sin filas ni credenciales de plástico.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
              <CreditCard className="w-6 h-6 text-cyan-300" />
            </div>
            <h3 className="font-bold text-white mb-1">Pagos Automáticos</h3>
            <p className="text-xs text-blue-200 leading-relaxed">
              Monitoreo en tiempo real de membresías al corriente y alertas de adeudos.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
              <Bot className="w-6 h-6 text-cyan-300" />
            </div>
            <h3 className="font-bold text-white mb-1">Asistente IA</h3>
            <p className="text-xs text-blue-200 leading-relaxed">
              Resolución de dudas sobre horarios, niveles y reportes administrativos al instante.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto text-center text-xs text-cyan-200/70 z-10">
        SAEN © 2026 — Sistema Automatizado para Escuelas de Natación
      </footer>
    </div>
  );
}