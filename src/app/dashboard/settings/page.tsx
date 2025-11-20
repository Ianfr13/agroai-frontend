'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navigation from '@/components/Navigation'
import { User, Bell, Shield, Palette, Save } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    weather: true,
    analyses: true,
    harvest: true,
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // Here you would save settings to your backend
      toast.success('Configurações salvas com sucesso!')
    } catch {
      // Error already handled by toast
      toast.error('Erro ao salvar configurações')
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 lg:pl-64">
        <Navigation />
        
        <div className="lg:pt-0 pt-16">
          <main className="py-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Configurações
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Gerencie suas preferências e configurações da conta
                </p>
              </div>

              <div className="space-y-8">
                {/* Profile Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <User className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Perfil
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.user_metadata?.full_name || ''}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue={user?.email || ''}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-400 cursor-not-allowed"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nome da Fazenda
                        </label>
                        <input
                          type="text"
                          defaultValue={user?.user_metadata?.farm_name || ''}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          defaultValue={user?.user_metadata?.phone || ''}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Palette className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Aparência
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Tema
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Escolha entre tema claro ou escuro
                        </p>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                          theme === 'dark' ? "bg-green-600" : "bg-gray-200"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                            theme === 'dark' ? "translate-x-6" : "translate-x-1"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Notificações
                      </h2>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {Object.entries({
                      email: 'Notificações por email',
                      weather: 'Alertas meteorológicos',
                      analyses: 'Resultados de análises',
                      harvest: 'Lembretes de colheita',
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {label}
                        </span>
                        <button
                          onClick={() => handleNotificationChange(key, !notifications[key as keyof typeof notifications])}
                          className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                            notifications[key as keyof typeof notifications] ? "bg-green-600" : "bg-gray-200"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                              notifications[key as keyof typeof notifications] ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Segurança
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            Autenticação de dois fatores
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Adicione uma camada extra de segurança à sua conta
                          </p>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 border border-green-600 dark:border-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                          Ativar
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            Alterar senha
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Atualize sua senha regularmente para manter a segurança
                          </p>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 border border-green-600 dark:border-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                          Alterar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}