import { z } from 'zod'

export const firebaseEnvSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1, 'API Key é obrigatória'),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1, 'Auth Domain é obrigatório'),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, 'Project ID é obrigatório'),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1, 'Storage Bucket é obrigatório'),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, 'Messaging Sender ID é obrigatório'),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, 'App ID é obrigatório'),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
})

export type FirebaseEnv = z.infer<typeof firebaseEnvSchema>

export function validateEnv() {
  const result = firebaseEnvSchema.safeParse(process.env)
  if (!result.success) {
    console.error('Variáveis de ambiente inválidas:', result.error.format())
    throw new Error('Erro nas variáveis de ambiente do Firebase')
  }
  return result.data
}