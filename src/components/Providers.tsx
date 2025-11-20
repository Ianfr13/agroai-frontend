'use client'

import { AuthProvider } from '@/hooks/useAuth'
import { ThemeProvider } from '@/hooks/useTheme'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
        <Toaster 
          position="top-right"
          expand={false}
          richColors
          closeButton
          duration={4000}
        />
      </ThemeProvider>
    </AuthProvider>
  )
}