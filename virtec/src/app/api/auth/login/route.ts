import { prisma } from '@/lib/db/db'
import { lucia } from '@/lib/db/lucia'
import { compare } from 'bcryptjs'
import { error } from 'console'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST (req: Request, res: Response) {
  const { emailOrDni, password } = await req.json()
  const schema = z.object({
    emailOrDni: z.string().nonempty(),
    password: z.string().nonempty().min(8)
  })
  const result = schema.safeParse({
    emailOrDni,
    password
  })
  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Credenciales invalidas'
      },
      {
        status: 500
      }
    )
  }
  const userExist = await prisma.alumno.findFirst({
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
  if (!userExist) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Usuario no encontrado'
      },
      {
        status: 404
      }
    )
  }
  const match = await compare(result.data.password, userExist.password)
  if(!match){
    return NextResponse.json({
        ok: false,
        message: 'Contraseña incorrecta'
    },{
        status: 404
    })
  }
  const session = await lucia.createSession(userExist.id, {})
  const cookiesSession = lucia.createSessionCookie(session.id)
  cookies().set(
    cookiesSession.name,
    cookiesSession.value,
    cookiesSession.attributes
  )
}
