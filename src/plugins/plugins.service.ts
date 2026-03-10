import { Injectable } from '@nestjs/common';
import { PluginStatus } from '../prisma/prisma-client';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { PluginsQueryService } from './services/plugins-query.service';
import { PluginsReviewService } from './services/plugins-review.service';
import { PluginsVersionService } from './services/plugins-version.service';
import { PluginsWriteService } from './services/plugins-write.service';

@Injectable()
export class PluginsService {
  constructor(
    private readonly queryService: PluginsQueryService,
    private readonly writeService: PluginsWriteService,
    private readonly versionService: PluginsVersionService,
    private readonly reviewService: PluginsReviewService,
  ) {}

  async findAll(status: PluginStatus = 'APPROVED') {
    return this.queryService.findAll(status);
  }

  async findAllPending() {
    return this.queryService.findAllPending();
  }

  async findByAuthor(authorId: string) {
    return this.queryService.findByAuthor(authorId);
  }

  async findOne(id: string) {
    return this.queryService.findOne(id);
  }

  async findOneAnyStatus(id: string) {
    return this.queryService.findOneAnyStatus(id);
  }

  async findVersions(
    pluginId: string,
    userId: string,
    userRole: string,
    includeDeleted: boolean,
  ) {
    return this.versionService.findVersions(
      pluginId,
      userId,
      userRole,
      includeDeleted,
    );
  }

  async rollbackVersion(
    pluginId: string,
    version: string,
    userId: string,
    userRole: string,
    reason?: string,
  ) {
    return this.versionService.rollbackVersion(
      pluginId,
      version,
      userId,
      userRole,
      reason,
    );
  }

  async deleteVersion(
    pluginId: string,
    version: string,
    userId: string,
    userRole: string,
    reason?: string,
  ) {
    return this.versionService.deleteVersion(
      pluginId,
      version,
      userId,
      userRole,
      reason,
    );
  }

  async findVersionActions(pluginId: string, userId: string, userRole: string) {
    return this.versionService.findVersionActions(pluginId, userId, userRole);
  }

  async create(userId: string, data: CreatePluginDto) {
    return this.writeService.create(userId, data);
  }

  async audit(
    pluginId: string,
    version: string,
    status: PluginStatus,
    adminId: string,
  ) {
    return this.writeService.audit(pluginId, version, status, adminId);
  }

  async findAllForAdmin() {
    return this.queryService.findAllForAdmin();
  }

  async delete(id: string) {
    return this.writeService.delete(id);
  }

  async toggleVisibility(
    id: string,
    isPublic: boolean,
    isAdmin: boolean,
    mode: 'FORCE' | 'NORMAL' = 'NORMAL',
  ) {
    return this.writeService.toggleVisibility(id, isPublic, isAdmin, mode);
  }

  async recordDownload(pluginId: string, ip: string) {
    return this.writeService.recordDownload(pluginId, ip);
  }

  async findReviews(pluginId: string): Promise<any> {
    return this.reviewService.findReviews(pluginId);
  }

  async upsertReview(
    pluginId: string,
    userId: string,
    payload: {
      rating: number;
      content: string;
    },
  ) {
    return this.reviewService.upsertReview(pluginId, userId, payload);
  }

  async replyReview(
    pluginId: string,
    reviewId: string,
    userId: string,
    userRole: string,
    reply: string,
  ) {
    return this.reviewService.replyReview(
      pluginId,
      reviewId,
      userId,
      userRole,
      reply,
    );
  }

  async deleteReview(pluginId: string, reviewId: string) {
    return this.reviewService.deleteReview(pluginId, reviewId);
  }
}
