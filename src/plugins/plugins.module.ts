import { Module } from '@nestjs/common';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { PluginsController } from './plugins.controller';
import { PluginsService } from './plugins.service';
import { PluginsQueryService } from './services/plugins-query.service';
import { PluginsReviewService } from './services/plugins-review.service';
import { PluginsVersionService } from './services/plugins-version.service';
import { PluginsWriteService } from './services/plugins-write.service';

@Module({
  controllers: [PluginsController],
  providers: [
    PluginsService,
    PluginsQueryService,
    PluginsWriteService,
    PluginsVersionService,
    PluginsReviewService,
    OptionalJwtAuthGuard,
  ],
})
export class PluginsModule {}
