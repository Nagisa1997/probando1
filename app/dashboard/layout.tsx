"use client";

import { useState } from 'react';

function SidebarLink({ href, label, onClick }: { href: string, label: string, onClick?: () => void }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="block p-3 text-sm text-green-50 hover:bg-[#042f24] rounded-lg transition-colors whitespace-nowrap"
    >
      {label}
    </a>
  );
}

function SidebarDropdown({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-3 text-sm text-green-50 hover:bg-[#042f24] rounded-lg transition-all whitespace-nowrap"
      >
        {title}
        <span className="ml-2 text-xs">{isOpen ? '▼' : '▶'}</span>
      </button>
      {isOpen && <div className="pl-4 mt-1 space-y-1">{children}</div>}
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      
      {/* 1. MENÚ LATERAL (SIDEBAR) - FIJO EN PC, OCULTO EN MÓVIL */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#064E3B] text-white flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 shrink-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Cabecera del Sidebar */}
        <div className="p-6 text-2xl font-bold border-b border-white/10 flex justify-between items-center h-16 shrink-0">
          <span>CIRCA</span>

          {/* Botón para cerrar solo en móvil */}
          <button 
            onClick={closeMobileSidebar} 
            className="lg:hidden text-white text-xl p-1 hover:bg-[#042f24] rounded"
          >
            ✕
          </button>
        </div>
        
        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink href="/dashboard" label="Inicio" onClick={closeMobileSidebar} />
          <SidebarLink href="/dashboard/estudiantes" label="Estudiantes" onClick={closeMobileSidebar} />
          <SidebarLink href="/dashboard/docentes" label="Docentes y Personal" onClick={closeMobileSidebar} />
          
          <SidebarDropdown title="Asistencia y Agenda">
            <SidebarLink href="/dashboard/agenda" label="Agenda" onClick={closeMobileSidebar} />
            <SidebarLink href="/dashboard/asistencia" label="Control de Asistencia" onClick={closeMobileSidebar} />
            <SidebarLink href="/dashboard/qr" label="Registro QR" onClick={closeMobileSidebar} />
          </SidebarDropdown>

          <SidebarDropdown title="Seguimiento y Conducta">
            <SidebarLink href="/dashboard/conducta" label="Reporte de Conducta" onClick={closeMobileSidebar} />
            <SidebarLink href="/dashboard/psicologia" label="Psicología" onClick={closeMobileSidebar} />
          </SidebarDropdown>

          <SidebarLink href="/dashboard/citaciones" label="Citaciones" onClick={closeMobileSidebar} />
          
          <SidebarLink href="/dashboard/notas" label="Reportes y Notas" onClick={closeMobileSidebar} />
          <SidebarLink href="/dashboard/boletas" label="Boletas/Resúmenes" onClick={closeMobileSidebar} />
          <SidebarLink href="/dashboard/configuracion" label="Configuración" onClick={closeMobileSidebar} />
        </nav>
      </aside>

      {/* 2. FONDO OSCURO EN MÓVIL */}
      {isMobileOpen && (
        <div 
          onClick={closeMobileSidebar} 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* 3. CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Barra superior blanca */}
        <header className="bg-white border-b px-6 flex items-center shadow-sm h-16 shrink-0">
          {/* Botón Hamburguesa Móvil (Solo se ve en pantallas chicas) */}
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="text-gray-700 p-2 focus:outline-none hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <span className="font-bold text-gray-700 text-base">
            I.E. Nuestra Señora de Copacabana - CIRCA
          </span>
        </header>

        {/* CONTENEDOR ESTABLE */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}