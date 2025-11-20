export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          farm_name: string
          farm_size: number
          farm_location: string
          phone: string
          role: 'admin' | 'farmer' | 'technician'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          farm_name: string
          farm_size: number
          farm_location: string
          phone: string
          role?: 'admin' | 'farmer' | 'technician'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          farm_name?: string
          farm_size?: number
          farm_location?: string
          phone?: string
          role?: 'admin' | 'farmer' | 'technician'
          created_at?: string
          updated_at?: string
        }
      }
      crops: {
        Row: {
          id: string
          user_id: string
          name: string
          variety: string
          planting_date: string
          harvest_date: string
          area: number
          expected_yield: number
          status: 'planted' | 'growing' | 'harvested' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          variety: string
          planting_date: string
          harvest_date: string
          area: number
          expected_yield: number
          status?: 'planted' | 'growing' | 'harvested' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          variety?: string
          planting_date?: string
          harvest_date?: string
          area?: number
          expected_yield?: number
          status?: 'planted' | 'growing' | 'harvested' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      analyses: {
        Row: {
          id: string
          user_id: string
          crop_id: string
          type: 'soil' | 'plant' | 'disease' | 'pest'
          image_url: string
          analysis_result: {
            classification: string
            severity?: string
            recommendations: string[]
          } | null
          recommendations: string[]
          confidence: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          crop_id: string
          type: 'soil' | 'plant' | 'disease' | 'pest'
          image_url: string
          analysis_result: {
            classification: string
            severity?: string
            recommendations: string[]
          }
          recommendations: string[]
          confidence: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          crop_id?: string
          type?: 'soil' | 'plant' | 'disease' | 'pest'
          image_url?: string
          analysis_result?: {
            classification: string
            severity?: string
            recommendations: string[]
          } | null
          recommendations?: string[]
          confidence?: number
          created_at?: string
          updated_at?: string
        }
      }
      weather_data: {
        Row: {
          id: string
          user_id: string
          location: string
          temperature: number
          humidity: number
          precipitation: number
          wind_speed: number
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          location: string
          temperature: number
          humidity: number
          precipitation: number
          wind_speed: number
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          location?: string
          temperature?: number
          humidity?: number
          precipitation?: number
          wind_speed?: number
          date?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}