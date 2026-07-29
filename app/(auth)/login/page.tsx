"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function LoginPage() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para alertas personalizadas
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Usuario o clave incorrectos");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowErrorAlert(false);

    try {
      // Inicializamos el cliente de Supabase aquí dentro de forma segura
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
      
      if (!supabaseUrl || !supabaseAnonKey) {
        setErrorMessage("Faltan las credenciales de Supabase en el entorno");
        setShowErrorAlert(true);
        setLoading(false);
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: dni,
        password: password,
      });

      if (error) {
        setErrorMessage("Usuario o clave incorrectos");
        setShowErrorAlert(true);
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setErrorMessage("Ocurrió un error inesperado al iniciar sesión");
      setShowErrorAlert(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h1>

        {showErrorAlert && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded border border-red-200">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">DNI / Usuario</label>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold transition duration-200 disabled:opacity-50"
        >
          {loading ? "Verificando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}