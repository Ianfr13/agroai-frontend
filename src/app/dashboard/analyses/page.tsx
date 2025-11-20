'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Camera, Upload, Leaf, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navigation from '@/components/Navigation'
import { toast } from 'sonner'

export default function AnalysesPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [analysisType, setAnalysisType] = useState<'soil' | 'plant' | 'disease' | 'pest'>('plant')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    type: string
    confidence: number
    result: {
      classification: string
      severity?: string
      recommendations: string[]
    }
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('A imagem deve ter no máximo 5MB')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor, selecione um arquivo de imagem')
        return
      }

      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Por favor, selecione uma imagem')
      return
    }

    setLoading(true)
    
    try {
      // Upload image to Supabase Storage
      const fileName = `${Date.now()}-${selectedFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('analyses')
        .upload(fileName, selectedFile)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('analyses')
        .getPublicUrl(fileName)

      // Mock AI analysis - in real app, this would call your AI service
      const mockAnalysis = {
        type: analysisType,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
        result: {
          classification: analysisType === 'disease' ? 'Mancha de Folha' : 
                         analysisType === 'pest' ? 'Afídeo' : 
                         analysisType === 'soil' ? 'Solo Adequado' : 'Planta Saudável',
          severity: Math.random() > 0.7 ? 'Alta' : Math.random() > 0.4 ? 'Média' : 'Baixa',
          recommendations: [
            'Aplicar fertilizante nitrogenado',
            'Monitorar umidade do solo',
            'Verificar irrigação',
            'Aplicar controle biológico se necessário'
          ].slice(0, Math.floor(Math.random() * 2) + 2)
        }
      }

      // Save analysis to database
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error('Usuário não autenticado')
      
      const analysisData = {
        user_id: user.id,
        crop_id: 'default-crop', // Would select actual crop
        type: analysisType as 'soil' | 'plant' | 'disease' | 'pest',
        image_url: publicUrl,
        analysis_result: mockAnalysis.result,
        recommendations: mockAnalysis.result.recommendations,
        confidence: mockAnalysis.confidence,
      }

      const { error: dbError } = await supabase
        .from('analyses')
        // @ts-expect-error - Supabase type inference issue
        .insert(analysisData)

      if (dbError) throw dbError

      setResult(mockAnalysis)
      toast.success('Análise realizada com sucesso!')
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao realizar análise'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const resetAnalysis = () => {
    setSelectedFile(null)
    setPreview(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
                  Análises
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Faça análises inteligentes das suas plantações e receba recomendações personalizadas
                </p>
              </div>

              {/* Analysis Type Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tipo de Análise
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: 'plant', label: 'Planta', icon: Leaf },
                    { value: 'disease', label: 'Doença', icon: AlertCircle },
                    { value: 'pest', label: 'Praga', icon: Camera },
                    { value: 'soil', label: 'Solo', icon: Camera }
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setAnalysisType(type.value as 'soil' | 'plant' | 'disease' | 'pest')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        analysisType === type.value
                          ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <type.icon className={`h-6 w-6 mx-auto mb-2 ${
                        analysisType === type.value
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        analysisType === type.value
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Enviar Imagem
                </h2>
                
                {!preview ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  >
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Arraste e solte uma imagem aqui, ou
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Escolher Arquivo
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <Image
                        src={preview}
                        alt="Preview da análise"
                        width={800}
                        height={400}
                        className="w-full h-64 object-cover rounded-lg"
                        priority
                      />
                      <button
                        onClick={resetAnalysis}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedFile?.name}
                      </span>
                      <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Analisando...
                          </>
                        ) : (
                          <>
                            <Camera className="h-4 w-4 mr-2" />
                            Analisar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Analysis Result */}
              {result && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Resultado da Análise
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        result.confidence >= 90 ? 'text-green-600 dark:text-green-400' :
                        result.confidence >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {result.confidence}% de confiança
                      </span>
                      {result.confidence >= 90 ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Classificação
                      </h3>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {result.result.classification}
                      </p>
                      {result.result.severity && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Severidade: {result.result.severity}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Recomendações
                      </h3>
                      <ul className="space-y-1">
                        {result.result.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                            <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}