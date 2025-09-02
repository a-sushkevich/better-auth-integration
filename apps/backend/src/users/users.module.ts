import { Module } from '@nestjs/common';
import { UsersController } from './users.constroller';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
