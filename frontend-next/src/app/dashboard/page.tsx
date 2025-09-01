'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">HelpGM Dashboard</h1>
              <span className="ml-2 text-sm text-gray-500">Sistema de Academia</span>
            </div>
            
            <nav className="flex items-center space-x-4">
              <span className="text-gray-700">
                Olá, {user?.username}!
              </span>
              <Button
                variant="outline"
                onClick={logout}
              >
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Bem-vindo ao seu Dashboard
          </h2>
          <p className="mt-2 text-gray-600">
            Gerencie sua academia de forma eficiente
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Informações da Conta
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Usuário</label>
              <p className="mt-1 text-sm text-gray-900">{user?.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Tipo de Conta</label>
              <p className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Gerenciar Alunos
            </h3>
            <p className="text-gray-600 mb-4">
              Adicione, edite e gerencie os alunos da academia
            </p>
            <Button className="w-full">
              Ver Alunos
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Planos e Mensalidades
            </h3>
            <p className="text-gray-600 mb-4">
              Configure planos e controle mensalidades
            </p>
            <Button className="w-full">
              Gerenciar Planos
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Relatórios
            </h3>
            <p className="text-gray-600 mb-4">
              Visualize relatórios e estatísticas da academia
            </p>
            <Button className="w-full">
              Ver Relatórios
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
