"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Nuevo estado para controlar nuestra alerta personalizada
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  function handleLogin() {
    // Si los campos están vacíos, mostramos nuestra alerta hermosa en lugar del alert() feo
    if (!dni || !password) {
      setShowErrorAlert(true);
      return;
    }
    
    // Aquí irá tu lógica de conexión más adelante
    alert(`Iniciando sesión para: ${dni} (Esto luego lo cambiaremos por el ingreso real)`);
  }

  return (
    <>
      {/* --- MODAL DE ALERTA --- */}
      {showErrorAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center shadow-2xl w-[90%] max-w-[360px] animate-in zoom-in duration-200">
            <div className="w-20 h-20 rounded-full border-[3px] border-[#f27474] flex items-center justify-center mb-5">
              <svg className="w-12 h-12 text-[#f27474]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            {/* Textos de la alerta */}
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Error</h2>
            <p className="text-gray-500 mb-6 text-center">Usuario o clave incorrectos</p>
            
            {/* Botón OK */}
            <button
              onClick={() => setShowErrorAlert(false)}
              className="bg-[#8b0000] hover:bg-[#a50000] text-white font-bold py-2.5 px-8 rounded transition-colors cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* --- PANTALLA PRINCIPAL --- */}
      <main className="h-screen w-full flex flex-col lg:flex-row bg-white font-sans overflow-hidden">

        {/* PANEL 1: IMAGEN INSTITUCIONAL */}
        <section className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen flex">
          <img
            src="/fondo.jpeg"
            alt="Desfile I.E. Nuestra Señora de Copacabana"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Capa verde transparente (Overlay) */}
          <div className="absolute inset-0 bg-[#0A8A43]/85 flex flex-col items-center justify-center text-center px-6 lg:px-12 text-white z-10">
            
            {/* Logo CIRCA */}
            <img 
              src="/logo-circa.png" 
              alt="Logo CIRCA" 
              className="absolute top-4 left-4 lg:top-8 lg:left-8 w-24 lg:w-32 rounded-full shadow-lg bg-white border-2 border-white object-contain"
            />

            <p className="text-sm lg:text-xl uppercase tracking-widest font-semibold text-white/80 mb-2 lg:mb-3 mt-16 lg:mt-0">
              I.E. Nuestra Señora de Copacabana
            </p>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-3 lg:mb-4">
              BIENVENIDO
            </h1>
            <p className="text-lg lg:text-3xl font-medium text-white/95 max-w-lg leading-snug italic">
              "Por siempre fe, disciplina y superación"
            </p>
          </div>
        </section>

        {/* PANEL 2: FORMULARIO DE INICIO DE SESIÓN */}
        <section className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 lg:p-8 bg-white overflow-y-auto">
          <div className="w-full max-w-[460px] flex flex-col items-center text-center my-auto">
            
            {/* Logo de la Institución y Título */}
            <div className="mb-6 w-full flex flex-col items-center">
              <img 
                src="/logo-ie.png" 
                alt="Insignia I.E. Nuestra Señora de Copacabana" 
                // Aquí aumentamos el tamaño del logo (de h-20/24 a h-24/28)
                className="h-24 lg:h-28 w-auto mb-3 rounded-full shadow-md object-contain" 
              />
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">
                Plataforma Educativa
              </p>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-[#0A8A43] uppercase leading-none mb-1">
                I.E. Nuestra Señora de Copacabana
              </h1>
              <p className="text-base text-gray-500 font-medium">CIRCA</p>
            </div>

            {/* FORMULARIO: Permite que funcione la tecla Enter */}
            <form onSubmit={handleLogin} className="w-full flex-1">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Iniciar Sesión</h2>
                <p className="text-gray-400 text-sm mt-1">Ingrese sus credenciales para continuar</p>
              </div>

              {/* Input Usuario */}
              <div className="mb-4 text-left w-full">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Usuario
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Ingrese su DNI o usuario"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    className="w-full h-12 rounded-xl border border-gray-200 pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-[#0A8A43]/30 focus:border-[#0A8A43] transition-all bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Input Contraseña (DNI) */}
              <div className="mb-5 text-left w-full">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Contraseña (DNI)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su DNI como contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 rounded-xl border border-gray-200 pl-12 pr-11 text-base outline-none focus:ring-2 focus:ring-[#0A8A43]/30 focus:border-[#0A8A43] transition-all bg-gray-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Opciones */}
              <div className="flex justify-between items-center mb-6 w-full text-sm">
                <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
                  <input type="checkbox" className="w-4 h-4 accent-[#0A8A43] rounded" />
                  Recordarme
                </label>
                <button type="button" className="text-[#0A8A43] font-semibold hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Botón Ingresar */}
              <button
                onClick={handleLogin}
                className="w-full h-12 rounded-xl bg-[#0A8A43] hover:bg-[#087238] text-white text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mb-4"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                Ingresar al sistema
              </button>

              {/* Footer */}
              <div className="border-t border-gray-100 pt-4 text-center text-sm">
                <p className="text-gray-500">
                  ¿No tienes cuenta? {" "}
                  <button className="text-[#0A8A43] font-semibold hover:underline">
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
