import { Test, TestingModule } from '@nestjs/testing';
import { AdvertController } from './advert.controller';

describe('AdvertController', () => {
  let controller: AdvertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvertController],
    }).compile();

    controller = module.get<AdvertController>(AdvertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
