import { Test, TestingModule } from '@nestjs/testing';
import { UsersearchService } from './usersearch.service';

describe('UsersearchService', () => {
  let service: UsersearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersearchService],
    }).compile();

    service = module.get<UsersearchService>(UsersearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
