'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginRequest } from '@/types/auth';
import { AuthFormWrapper } from './AuthFormWrapper'; 

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginRequest>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
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
    setLoading(true);

    try {
      await login(formData);
      setSuccess('Login realizado com sucesso! Redirecionando para a página inicial...');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

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
          />
          
          <Input
            label="Senha"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Digite sua senha"
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