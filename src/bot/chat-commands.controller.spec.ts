import { Test, TestingModule } from '@nestjs/testing';
import { ChatCommandsController } from './chat-commands.controller';

describe('ChatCommandsController', () => {
  let controller: ChatCommandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatCommandsController],
    }).compile();

    controller = module.get<ChatCommandsController>(ChatCommandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
