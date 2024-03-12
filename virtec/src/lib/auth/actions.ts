'use server'
import z from 'zod'

import { prisma } from '../db/db'
import { lucia } from '../db/lucia'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { generateId } from 'lucia'
import { compare, hash } from 'bcryptjs'

interface ActionResult {
  error: string
}

export const login = async (formData: FormData): Promise<ActionResult> => {
  const schema = z.object({
    emailOrDni: z.string() || z.number(),
    password: z.string().min(8)
  })
  const success = schema.safeParse({
    emailOrDni: formData.get('emailOrDni'),
    password: formData.get('password')
  })
  
  if (!success.success) {
    return {
      error: 'Credenciales invalidas'
    }
  }
  const { emailOrDni, password } = success.data
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: emailOrDni
        },
        {
          dni: Number(emailOrDni)
        }
      ]
    }
  })
  if (!user) {
    return {
      error: `No existe el usuario con el DNI o email: ${emailOrDni}`
    }
  }
  const match = await compare(password, user.password)
  if (!match) {
    return {
      error: 'Contraseña incorrecta'
    }
  }
  const session = await lucia.createSession(user.id, {})
  const cookiesSession = lucia.createSessionCookie(session.id)
  cookies().set(
    cookiesSession.name,
    cookiesSession.value,
    cookiesSession.attributes
  )
  console.log(session)
  return redirect('/')
}
export const register= async (formValues: any): Promise<ActionResult> =>{
  const {
    nombre,
    apellido,
    email,
    password,
    confirmPassword,
    dni,
    year,
    division,
    comision,
    rol,
    especialidad,
    escuela,
    turno
  } =formValues;
  if (
    !nombre ||
    !apellido ||
    !email ||
    !password ||
    !confirmPassword ||
    !dni ||
    !year ||
    !division ||
    !comision ||
    !especialidad
  ) {
    return { error: 'Por favor rellene todos los campos' }
  }

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    dni: z.string().min(1),
    year: z.number(),
    division: z.number(),
    comision: z.number(),
    rol: z.string().optional(),
    escuela: z.string().optional(),
    especialidad: z.string(),
    nombre: z.string(),
    apellido: z.string(),
    turno: z.string()
  })
  const success = schema.safeParse({
    nombre,
    apellido,
    email,
    password,
    confirmPassword,
    dni,
    year,
    division,
    comision,
    rol,
    especialidad,
    escuela,
    turno
  })
  if (!success.success) {
    return {
      error: 'Por favor verifique todos los campos'
    }
  }
  const dniUsado = await prisma.user.findUnique({
    where: {
      dni: Number(dni)
    }
  })
  if (dniUsado) {
    return { error: 'El DNI ya se encuentra registrado' }
  }
  const emailUsado = await prisma.user.findFirst({
    where: {
      email: email
    }
  })
  if (emailUsado) {
    return { error: 'El email ya se encuentra registrado' }
  }
  const hashedPassword =await hash(password, 10)
  
  const userId= generateId(15) 
  const user = await prisma.user.create({
    data: {
      id: userId,
      email: success.data.email ,
      apellido: success.data.apellido ,
      nombre: success.data.nombre ,
      password: hashedPassword ,
      dni: Number(success.data.dni),
      year: success.data.year,
      division: success.data.division,
      comision: success.data.comision,
      rol: 'Alumno' ,
      turno: success.data.turno ,
      especialidad: success.data.especialidad 
    }
  })
  //console.log(user)
  const session = await lucia.createSession(userId, {},)
  const sessionCookies = lucia.createSessionCookie(session.id)
  cookies().set('luciaSession', sessionCookies.value, sessionCookies.attributes)
  return redirect('/')
}