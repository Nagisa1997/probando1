"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Inicializamos Supabase directamente usando las variables de entorno públicas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Usuario o clave incorrectos");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowErrorAlert(false);

    try {
      // Nota: Si en Supabase usas correo en lugar de DNI, ajusta esto. 
      // Asumiendo que guardaste el DNI o el email del usuario:
      const { data, error } = await supabase.auth.signInWithPassword({
        email: dni, // Si tu campo en Supabase es el correo del usuario
        password,
      });

      if (error) {
        setErrorMessage("Usuario o clave incorrectos");
        setShowErrorAlert(true);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setErrorMessage("Ocurrió un error al intentar iniciar sesión");
      setShowErrorAlert(true);
    } finally {
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
            type="password"
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