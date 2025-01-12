import {z, ZodType } from 'zod';

export class SiswaValidation {
    static readonly CREATE : ZodType = z.object({
        nama : z.string().min(3).max(50),
        nis : z.number().positive(),
        rayon : z.string().min(3).max(50),
        jurusan : z.string().min(3).max(50),
    })


}