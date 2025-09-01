'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">HelpGM</h1>
              <span className="ml-2 text-sm text-gray-500">Sistema de Academia</span>
            </div>
            
            <nav className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700">
                    Olá, {user?.username}!
                  </span>
                  <Button
                    variant="outline"
                    onClick={logout}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Entrar</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Registrar</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Bem-vindo ao HelpGM
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Sistema completo para gerenciamento de academia
          </p>
          
          {isAuthenticated ? (
            <div className="mt-8">
              <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Você está logado!
                </h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Usuário:</strong> {user?.username}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Role:</strong> {user?.role}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 flex justify-center space-x-4">
              <Link href="/login">
                <Button size="lg">Fazer Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg">Criar Conta</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Gestão de Usuários
            </h3>
            <p className="text-gray-600">
              Sistema completo de autenticação e autorização com JWT
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Banco PostgreSQL
            </h3>
            <p className="text-gray-600">
              Banco de dados robusto e escalável para sua aplicação
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Frontend Moderno
            </h3>
            <p className="text-gray-600">
              Interface responsiva construída com Next.js e Tailwind CSS
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
