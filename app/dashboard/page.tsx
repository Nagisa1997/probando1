"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState({ nombre: "", rol: "", foto_url: "" });
  const [stats, setStats] = useState({ estudiantes: 0, personal: 0, citaciones: 0, psicologia: 0 });

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    // 1. Verificar que haya sesión activa (si no, mandar al login)
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // 2. Traer el perfil real de quien inició sesión
    const { data: perfil, error: errorPerfil } = await supabase
      .from("profiles")
      .select("nombres, apellidos, rol, foto_url")
      .eq("id", user.id)
      .single();

    if (errorPerfil || !perfil) {
      router.push("/login");
      return;
    }

    setUsuario({
      nombre: `${perfil.nombres} ${perfil.apellidos}`,
      rol: perfil.rol,
      foto_url: perfil.foto_url || "",
    });

    // 3. Traer los números reales para las tarjetas (KPIs)
    //    { count: "exact", head: true } = solo cuenta filas, no las trae todas (más rápido)
    const [{ count: totalEstudiantes }, { count: totalPersonal }, { count: totalCitaciones }, { count: totalPsicologia }] =
      await Promise.all([
        supabase.from("students").select("*", { count: "exact", head: true }),
        supabase.from("staff").select("*", { count: "exact", head: true }),
        supabase.from("notices").select("*", { count: "exact", head: true }),
        supabase.from("psychology_appointments").select("*", { count: "exact", head: true }),
      ]);

    setStats({
      estudiantes: totalEstudiantes || 0,
      personal: totalPersonal || 0,
      citaciones: totalCitaciones || 0,
      psicologia: totalPsicologia || 0,
    });

    setCargando(false);
  }

  // Nombre amigable del rol para mostrar en pantalla
  const nombreRol: Record<string, string> = {
    admin_general: "Super Admin",
    admin_basico: "Administrador",
    docente: "Docente",
    psicologo: "Psicólogo(a)",
    estudiante: "Estudiante",
    padre: "Padre de Familia",
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* 1. Saludo con Foto de Perfil */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hola, {usuario.nombre} 👋</h1>
          <p className="text-xl text-gray-600 font-semibold mt-1">{nombreRol[usuario.rol] || usuario.rol}</p>
          <p className="text-gray-500 font-medium mt-2">Bienvenido al sistema educativo de la I.E. Nuestra Señora de Copacabana - CIRCA</p>
        </div>

        <div className="w-32 h-32 rounded-full bg-green-200 border-4 border-white shadow-md flex items-center justify-center overflow-hidden shrink-0">
          {usuario.foto_url ? (
            <img src={usuario.foto_url} alt={usuario.nombre} className="w-full h-full object-cover" />
          ) : (
            <span className="text-5xl font-bold text-green-800">
              {usuario.nombre.charAt(0)}
            </span>
          )}
        </div>
      </header>

      {/* 2. KPIs reales */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Estudiantes" value={stats.estudiantes} color="text-blue-600" />
        <StatCard title="Docentes y Administrativos" value={stats.personal} color="text-green-600" />
        <StatCard title="Citaciones" value={stats.citaciones} color="text-amber-600" />
        <StatCard title="Psicología" value={stats.psicologia} color="text-purple-600" />
      </section>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string, value: number, color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className={`text-xs font-bold ${color} uppercase tracking-wider mt-1`}>{title}</p>
    </div>
  );
}
