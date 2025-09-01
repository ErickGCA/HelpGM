'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50"> 
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">HelpGM</h1>
              <span className="ml-2 text-sm text-gray-500">Sistema de Academia</span>
            </div>
            
            <nav className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button>Registrar</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Bem-vindo ao HelpGM
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Sistema completo para gerenciamento de academia
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/login">
              <Button size="lg">Fazer Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">Criar Conta</Button>
            </Link>
          </div>
        </div>

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
