import { INestApplication, Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
class TestAppModule {}

describe('App bootstrap (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should bootstrap and respond for unknown route', async () => {
    await request(app.getHttpServer()).get('/').expect(404);
  });
});
