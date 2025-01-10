import { Module } from '@nestjs/common';
import { UserController } from './siswa.controller';
import { UserService } from './siswa.service';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
