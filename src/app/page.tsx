import { Leaf, Camera, Cloud, Shield, Smartphone, Users } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const features = [
    {
      icon: Camera,
      title: 'Análise por Imagem',
      description: 'Analise suas plantações usando inteligência artificial para detectar doenças, pragas e deficiências nutricionais.'
    },
    {
      icon: Cloud,
      title: 'Previsão do Tempo',
      description: 'Receba previsões meteorológicas personalizadas para sua região e planeje suas atividades agrícolas.'
    },
    {
      icon: Shield,
      title: 'Segurança e Confiabilidade',
      description: 'Seus dados estão protegidos com criptografia de ponta e armazenamento seguro na nuvem.'
    },
    {
      icon: Smartphone,
      title: 'Acesso Mobile',
      description: 'Acesse o AgroAI de qualquer dispositivo, seja no campo ou no escritório.'
    },
    {
      icon: Users,
      title: 'Suporte Especializado',
      description: 'Conte com nossa equipe de especialistas em agricultura e tecnologia para ajudar você.'
    },
    {
      icon: Leaf,
      title: 'Sustentabilidade',
      description: 'Promova práticas agrícolas sustentáveis com análises precisas e recomendações personalizadas.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AgroAI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
              >
                Entrar
              </Link>
              <Link
                href="/auth/register"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transforme sua Agricultura com
            <span className="text-green-600 dark:text-green-400"> Inteligência Artificial</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            O AgroAI é uma plataforma inteligente que utiliza IA para analisar suas plantações, 
            prever condições climáticas e fornecer recomendações personalizadas para maximizar sua produtividade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Comece Gratuitamente
            </Link>
            <Link
              href="#features"
              className="border border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              Saiba Mais
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Recursos Inteligentes para o Campo
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Descubra como o AgroAI pode revolucionar sua forma de cultivar com tecnologia de ponta e análises precisas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 dark:bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Pronto para Revolucionar sua Agricultura?
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de agricultores que já estão usando IA para aumentar sua produtividade e reduzir custos.
          </p>
          <Link
            href="/auth/register"
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
          >
            Comece Agora Mesmo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold">AgroAI</h4>
              </div>
              <p className="text-gray-400">
                Transformando agricultura com inteligência artificial.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Recursos</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Análise de Plantas</a></li>
                <li><a href="#" className="hover:text-white">Previsão do Tempo</a></li>
                <li><a href="#" className="hover:text-white">Relatórios</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Suporte</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Documentação</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Empresa</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AgroAI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
