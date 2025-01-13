import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SiswaModule } from './siswa/siswa.module';
import { CommonModule } from "./common/common.module";
import { UserModule } from './user/user.module';
import { AuthMiddleware } from "./common/auth.middleware";


@Module({
    imports : [CommonModule, SiswaModule, UserModule],
    controllers : [],
    providers : [],
    
})


export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(AuthMiddleware)
        .forRoutes('/api/user/', '/api/siswa/');
    
    }
}