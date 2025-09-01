'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginRequest } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { AuthFormWrapper } from './AuthFormWrapper';

export const LoginForm: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<LoginRequest>({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await login(formData);
      setSuccess('Login realizado com sucesso! Redirecionando...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500); 

    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
      setLoading(false); 
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
      <AuthFormWrapper title="Login HelpGM" subtitle="Faça login na sua conta">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
            {success}
          </div>
        )}
        
        <div className="space-y-4">
          <Input
            label="Nome de usuário"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder="Digite seu nome de usuário"
            disabled={loading} 
          />
          
          <Input
            label="Senha"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
            disabled={loading} 
          />
        </div>

        <div>
          <Button
            type="submit"
            className="w-full"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>

        <div className="text-center">
          <a
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Não tem uma conta? Registre-se
          </a>
        </div>
      </form>
    </AuthFormWrapper>
  );
};