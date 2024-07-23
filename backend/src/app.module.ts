import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/todlist'), // Assurez-vous que l'URI correspond à votre base de données MongoDB
    AuthModule,
    UsersModule,
    TodoModule,
  ],
})
export class AppModule {}

