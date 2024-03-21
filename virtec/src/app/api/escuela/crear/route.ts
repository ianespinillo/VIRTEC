import { prisma } from "@/lib/db/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST (req: Request, res: Response){
    const body = await req.json();
    const schema= z.object({
        nombre: z.string().min(1),
        ubicacion: z.string().min(1),
        tipo: z.string().min(1)
    })
    const result= schema.safeParse(body)
    if(!result.success){
        return NextResponse.json({
            error: true,
            message: 'Error, verifique los campos'
        },{
            status: 404,
        })
    }

    try {
        await prisma.escuela.create({
            data: result.data
        })
        return NextResponse.json({
            ok: true,
            message: 'Escuela creada correctamente'
        },{
            status: 200
        })
    } catch (error:any) {
        NextResponse.json({
            error: true,
            message: 'Error: ' + error.message
        })
    }
    
}