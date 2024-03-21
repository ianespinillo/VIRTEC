import { prisma } from '@/lib/db/db'
import { lucia } from '@/lib/db/lucia'
import { hash } from 'bcryptjs'
import { error } from 'console'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST (req: Request, res: Response) {
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
  } = await req.json()
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
    return NextResponse.json(
      {
        error: true,
        message: 'Por favor rellene todos los campos'
      },
      {
        status: 404
      }
    )
  }
  const usedEmail = await prisma.user.findFirst({
    where: { email: success.data.email }
  })
  if (usedEmail) {
    return NextResponse.json(
      {
        error: true,
        message: 'Email utilizado'
      },
      {
        status: 404
      }
    )
  }
  const usedDni = await prisma.user.findFirst({
    where: {
      dni: Number(success.data.dni)
    }
  })
  if (usedDni) {
    return NextResponse.json(
      {
        error: true,
        message: 'Dni utilizado'
      },
      {
        status: 404
      }
    )
  }
  const hashedPassword = await hash(success.data.password, 10)
  const { data } = success
  const user = await prisma.user.create({
    data: {
      email: data.email,
      apellido: data.apellido,
      nombre: data.nombre,
      password: hashedPassword,
      dni: Number(data.dni),
      year: data.year,
      division: data.division,
      comision: data.comision,
      rol: 'Alumno',
      turno: data.turno,
      especialidad: data.especialidad
    }
  })
  const session = await lucia.createSession(user.id, {},)
  const sessionCookies = lucia.createSessionCookie(session.id)
  cookies().set('luciaSession', sessionCookies.value, sessionCookies.attributes)
}
