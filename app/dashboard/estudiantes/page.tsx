"use client";

import { useState } from "react";

export default function EstudiantesPage() {
  // Listas exactas de CIRCA
  const grados = [
    '1ro "A"', '1ro "B"', '2do "A"', '2do "B"', '3ro "A"', 
    '3ro "B"', '4to "A"', '4to "B"', '5to "A"', '5to "B"'
  ];
  
  const grupos = [
    'Montañeros', 'Montañeras', 'Cruz Verde Damas', 'Cruz Verde Varones', 
    'NUREC', 'NEC', 'Periodismo Damas', 'Periodismo Varones'
  ];

  // 10 Estudiantes de muestra
  const estudiantesLista = [
    { id: 1, nombre: "María López", grado: '4to "A"', grupo: "Cruz Verde Damas", telefono: "987654321" },
    { id: 2, nombre: "Juan Pérez", grado: '1ro "B"', grupo: "Montañeros", telefono: "912345678" },
    { id: 3, nombre: "Ana Gómez", grado: '5to "A"', grupo: "Periodismo Damas", telefono: "998877665" },
    { id: 4, nombre: "Luis Torres", grado: '2do "B"', grupo: "NUREC", telefono: "955443322" },
    { id: 5, nombre: "Sofía Castro", grado: '3ro "A"', grupo: "Montañeras", telefono: "944556677" },
    { id: 6, nombre: "Carlos Ruiz", grado: '4to "B"', grupo: "Cruz Verde Varones", telefono: "933221100" },
    { id: 7, nombre: "Lucía Vega", grado: '1ro "A"', grupo: "NEC", telefono: "922110099" },
    { id: 8, nombre: "Diego Flores", grado: '5to "B"', grupo: "Periodismo Varones", telefono: "911223344" },
    { id: 9, nombre: "Camila Díaz", grado: '2do "A"', grupo: "Cruz Verde Damas", telefono: "988776655" },
    { id: 10, nombre: "Mateo Rojas", grado: '3ro "B"', grupo: "Montañeros", telefono: "977665544" },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* 1. Encabezado y Acciones */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Estudiantes</h1>
          <p className="text-gray-500">Gestiona el padrón estudiantil de la institución</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-green-600 text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-50">
            Importar Excel 📊
          </button>
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-800">
            + Añadir Estudiante
          </button>
        </div>
      </div>

      {/* 2. Filtros */}
      <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <input 
          type="text" 
          placeholder="Buscar estudiante..." 
          className="border rounded-lg p-2 flex-1 outline-none focus:ring-2 focus:ring-green-500"
        />
        <select className="border rounded-lg p-2 outline-none bg-white">
          <option value="">Todos los Grados</option>
          {grados.map((grado) => (
            <option key={grado} value={grado}>{grado}</option>
          ))}
        </select>
        <select className="border rounded-lg p-2 outline-none bg-white">
          <option value="">Todos los Grupos</option>
          {grupos.map((grupo) => (
            <option key={grupo} value={grupo}>{grupo}</option>
          ))}
        </select>
      </div>

      {/* 3. Tabla de Estudiantes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-bold text-gray-600">Estudiante</th>
              <th className="p-4 font-bold text-gray-600">Grado</th>
              <th className="p-4 font-bold text-gray-600">Grupo Menor</th>
              <th className="p-4 font-bold text-gray-600">Contacto Padres</th>
              <th className="p-4 font-bold text-gray-600 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantesLista.map((estudiante) => (
              <tr key={estudiante.id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-4">
                  {/* Contenedor de la Foto con Camarita */}
                  <div className="relative group cursor-pointer" title="Actualizar foto">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800 overflow-hidden">
                      {estudiante.nombre.charAt(0)}
                    </div>
                    {/* Icono de cámara superpuesto */}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:bg-gray-100">
                      <span className="text-xs">📷</span>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-700">{estudiante.nombre}</span>
                </td>
                
                <td className="p-4 text-gray-600">{estudiante.grado}</td>
                <td className="p-4 text-gray-600">{estudiante.grupo}</td>
                
                <td className="p-4 text-gray-600">
                  {/* Botón de WhatsApp dinámico */}
                  <a 
                    href={`https://wa.me/51${estudiante.telefono}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors font-medium border border-green-200"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    {estudiante.telefono}
                  </a>
                </td>
                
                <td className="p-4 text-center">
                  <button className="text-green-700 font-bold hover:underline">Ver Ficha</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}