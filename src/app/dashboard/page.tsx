'use client'

import { useEffect, useState } from 'react'
import { Leaf, Camera, Cloud, AlertCircle, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navigation from '@/components/Navigation'

interface DashboardStats {
  totalCrops: number
  activeAnalyses: number
  completedAnalyses: number
  weatherAlerts: number
}

interface RecentAnalysis {
  id: string
  crop_name: string
  type: string
  confidence: number
  created_at: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCrops: 0,
    activeAnalyses: 0,
    completedAnalyses: 0,
    weatherAlerts: 0,
  })
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch user crops
      const { data: crops, error: cropsError } = await supabase
        .from('crops')
        .select('id, status')

      if (cropsError) throw cropsError

      // Fetch user analyses
      const { data: analyses, error: analysesError } = await supabase
        .from('analyses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (analysesError) throw analysesError

      // Calculate stats
      const totalCrops = crops?.length || 0
      interface Analysis {
        analysis_result?: {
          classification: string
          severity?: string
          recommendations: string[]
        } | null
      }
      const activeAnalyses = (analyses as Analysis[])?.filter(a => !a.analysis_result).length || 0
      const completedAnalyses = (analyses as Analysis[])?.filter(a => a.analysis_result).length || 0

      setStats({
        totalCrops,
        activeAnalyses,
        completedAnalyses,
        weatherAlerts: 2, // Mock data - would come from weather API
      })

      // Format recent analyses
      interface AnalysisRecord {
        id: string
        crop_id: string
        type: string
        confidence: number
        created_at: string
      }
      const formattedAnalyses = (analyses as AnalysisRecord[])?.map(analysis => ({
        id: analysis.id,
        crop_name: `Plantio ${analysis.crop_id}`, // Would fetch actual crop name
        type: analysis.type,
        confidence: analysis.confidence,
        created_at: analysis.created_at,
      })) || []

      setRecentAnalyses(formattedAnalyses)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      name: 'Total de Plantios',
      value: stats.totalCrops,
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Análises Ativas',
      value: stats.activeAnalyses,
      icon: Camera,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Análises Concluídas',
      value: stats.completedAnalyses,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      name: 'Alertas Meteorológicos',
      value: stats.weatherAlerts,
      icon: Cloud,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 lg:pl-64">
        <Navigation />
        
        <div className="lg:pt-0 pt-16">
          <main className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Visão geral do seu sistema de agricultura inteligente
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => (
                  <div
                    key={stat.name}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.name}
                        </p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`${stat.bgColor} p-3 rounded-lg`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Analyses */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Análises Recentes
                    </h2>
                  </div>
                  <div className="p-6">
                    {recentAnalyses.length > 0 ? (
                      <div className="space-y-4">
                        {recentAnalyses.map((analysis) => (
                          <div key={analysis.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                                <Camera className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {analysis.crop_name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {analysis.type} • {new Date(analysis.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {analysis.confidence}%
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                confiança
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Nenhuma análise realizada ainda
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Weather Alerts */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Alertas Meteorológicos
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        <div>
                          <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                            Possível geada nas próximas 48h
                          </p>
                          <p className="text-xs text-orange-600 dark:text-orange-400">
                            Recomendado proteger plantações sensíveis
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                            Chuva prevista para semana
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            Aproveite para preparar o solo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}