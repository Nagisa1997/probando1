"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Usuario o clave incorrectos");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Por favor, complete todos los campos");
      setShowErrorAlert(true);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("username", username.trim())
        .eq("password", password.trim())
        .single();

      if (error || !data) {
        setErrorMessage("Usuario o contraseña incorrectos");
        setShowErrorAlert(true);
        setLoading(false);
        return;
      }

      localStorage.setItem("usuario_actual", JSON.stringify(data));
      router.push("/dashboard");

    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setErrorMessage("Ocurrió un error al conectar con el servidor");
      setShowErrorAlert(true);
      setLoading(false);
    }
  }

  return (
    <>
      {showErrorAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center shadow-2xl w-[90%] max-w-[360px]">
            <div className="w-20 h-20 rounded-full border-[3px] border-[#f27474] flex items-center justify-center mb-5">
              <svg className="w-12 h-12 text-[#f27474]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Error</h2>
            <p className="text-gray-500 mb-6 text-center">{errorMessage}</p>
            
            <button
              onClick={() => setShowErrorAlert(false)}
              className="bg-[#8b0000] hover:bg-[#a50000] text-white font-bold py-2.5 px-8 rounded transition-colors cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <main className="h-screen w-full flex flex-col lg:flex-row bg-white font-sans overflow-hidden">
        <section className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen flex">
          <img
            src="/fondo.jpeg"
            alt="Desfile I.E. Nuestra Señora de Copacabana"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A8A43]/85 flex flex-col items-center justify-center text-center px-6 lg:px-12 text-white z-10">
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

        <section className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 lg:p-8 bg-white overflow-y-auto">
          <div className="w-full max-w-[460px] flex flex-col items-center text-center my-auto">
            <div className="mb-6 w-full flex flex-col items-center">
              <img 
                src="/logo-ie.png" 
                alt="Insignia I.E. Nuestra Señora de Copacabana" 
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

            <form onSubmit={handleLogin} className="w-full flex-1">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Iniciar Sesión</h2>
                <p className="text-gray-400 text-sm mt-1">Ingrese sus credenciales para continuar</p>
              </div>

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
                    placeholder="Ingrese su usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-12 rounded-xl border border-gray-200 pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-[#0A8A43]/30 focus:border-[#0A8A43] transition-all bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="mb-5 text-left w-full">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[#0A8A43] hover:bg-[#087238] text-white text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mb-4 disabled:opacity-50"
              >
                {loading ? "Verificando..." : "Ingresar al sistema"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}