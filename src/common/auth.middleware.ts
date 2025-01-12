import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization']; // Ambil nilai Authorization header
    const token = authHeader && authHeader.split(' ')[1]; // Ambil token setelah "Bearer" (jika ada)

    if (token) {
      const user = await this.prismaService.user.findFirst({
        where: {
          token: token, // Cari user berdasarkan token
        },
      });

      if (user) {
        req.user = user; // Jika token valid, simpan user di request
      }
    }
    next();
  }
}
