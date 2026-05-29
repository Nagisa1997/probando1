"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [usuario, setUsuario] = useState({ 
    nombre: "Administradora", 
    detalle: "Super Admin", 
    grupo: "Cruz Verde Varones" 
  });
  
  const [stats, setStats] = useState({ estudiantes: 250, personal: 18, citaciones: 5, psicologia: 2 });

  return (
    <div className="p-8 space-y-8">
      {/* 1. Saludo con Foto de Perfil */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hola, {usuario.nombre} 👋</h1>
          <p className="text-xl text-gray-600 font-semibold mt-1">{usuario.detalle}</p>
          <p className="text-gray-500 font-medium mt-2">Bienvenido al sistema educativo de la I.E. Nuestra Señora de Copacabana - CIRCA</p>
        </div>

        {/* Círculo de Foto de Perfil (Más grande) */}
        <div className="w-32 h-32 rounded-full bg-green-200 border-4 border-white shadow-md flex items-center justify-center overflow-hidden shrink-0">
            <span className="text-5xl font-bold text-green-800">
            {usuario.nombre.charAt(0)}
          </span>
        </div>
      </header>

      {/* 2. KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Estudiantes" value={stats.estudiantes} color="text-blue-600" />
        <StatCard title="Docentes y Administrativos" value={stats.personal} color="text-green-600" />
        <StatCard title="Citaciones" value={stats.citaciones} color="text-amber-600" />
        <StatCard title="Psicología" value={stats.psicologia} color="text-purple-600" />
      </section>

      {/* 3. Reconocimientos */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-6 rounded-2xl shadow-sm border border-yellow-200">
          <h2 className="text-lg font-bold text-yellow-900 mb-2">🏆 Medalla de Puntualidad</h2>
          <div className="flex items-center gap-4">
            <span className="text-5xl">🥇</span>
            <div>
              <p className="font-bold text-yellow-900 text-xl">Puntualidad de Oro</p>
              <p className="text-yellow-700 text-sm">Has llegado temprano el 98% de los días este mes.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📊 Mi Ranking</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Posición en el salón:</span>
            <span className="font-bold text-green-700">#3 de 30</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>
      </section>

      {/* 4. Grupo Menor y Eventos */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Mi Grupo Menor</h2>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl font-bold text-center border border-green-200 text-lg">
            {usuario.grupo}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📅 Próximos Eventos</h2>
          <div className="space-y-3">
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-xl font-bold border border-yellow-100">
              🎈 ¡Feliz Cumpleaños a [Nombre del Usuario]!
            </div>
            <div className="p-4 bg-gray-50 text-gray-600 rounded-xl border border-gray-100">
              📢 Viernes: Reunión de Padres (Reporte de citaciones)
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tabla de Horario */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">📅 Horario Escolar - Aula de Innovación</h2>
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-800">
            Editar Horario
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">Hora</th>
                <th className="p-2 border">Lunes</th>
                <th className="p-2 border">Martes</th>
                <th className="p-2 border">Miércoles</th>
                <th className="p-2 border">Jueves</th>
                <th className="p-2 border">Viernes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border font-bold">1ra (8:00 - 8:45)</td>
                <td className="p-2 border bg-yellow-50">EPT 5A (Leyver M.)</td>
                <td className="p-2 border">Reserva AIP</td>
                <td className="p-2 border">Reserva AIP</td>
                <td className="p-2 border">Reserva AIP</td>
                <td className="p-2 border bg-yellow-50">EPT 4B (Leyver M.)</td>
              </tr>
            </tbody>
          </table>
        </div>
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