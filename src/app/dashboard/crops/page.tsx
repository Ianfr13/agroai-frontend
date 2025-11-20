'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Calendar, MapPin, TrendingUp, Leaf } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navigation from '@/components/Navigation'

interface Crop {
  id: string
  name: string
  variety: string
  planting_date: string
  harvest_date: string
  area: number
  expected_yield: number
  status: 'planted' | 'growing' | 'harvested' | 'cancelled'
  created_at: string
}

export default function CropsPage() {
  const [crops, setCrops] = useState<Crop[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchCrops()
  }, [])

  const fetchCrops = async () => {
    try {
      const { data, error } = await supabase
        .from('crops')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCrops(data || [])
    } catch (error) {
      console.error('Error fetching crops:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.variety.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || crop.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'growing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'harvested':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planted':
        return 'Plantado'
      case 'growing':
        return 'Em Crescimento'
      case 'harvested':
        return 'Colhido'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 lg:pl-64">
        <Navigation />
        
        <div className="lg:pt-0 pt-16">
          <main className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Plantios
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Gerencie seus plantios e acompanhe o progresso
                    </p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Plantio
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar plantios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">Todos os Status</option>
                      <option value="planted">Plantado</option>
                      <option value="growing">Em Crescimento</option>
                      <option value="harvested">Colhido</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Crops Grid */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCrops.map((crop) => (
                    <div key={crop.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {crop.name}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {crop.variety}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(crop.status)}`}>
                            {getStatusLabel(crop.status)}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            Plantio: {new Date(crop.planting_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2" />
                            Colheita: {new Date(crop.harvest_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-2" />
                            Área: {crop.area} hectares
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Rendimento: {crop.expected_yield} ton/ha
                          </div>
                        </div>

                        <div className="mt-6 flex space-x-2">
                          <button className="flex-1 px-3 py-2 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 border border-green-600 dark:border-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                            Ver Detalhes
                          </button>
                          <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredCrops.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Nenhum plantio encontrado
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Tente ajustar os filtros de busca'
                      : 'Comece criando seu primeiro plantio'
                    }
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}