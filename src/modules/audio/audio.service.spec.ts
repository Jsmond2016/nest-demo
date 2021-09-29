import { Test, TestingModule } from '@nestjs/testing';
import { AudioProcessor } from './audio.processor';

describe('AudioService', () => {
  let service: AudioProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudioProcessor],
    }).compile();

    service = module.get<AudioProcessor>(AudioProcessor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
