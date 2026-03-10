import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { PluginsService } from './plugins.service';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PluginStatus } from '../prisma/prisma-client';
import { Request } from 'express';
import { AuthUser } from '../common/types/auth-user.type';

@Controller('plugins')
export class PluginsController {
  constructor(private readonly pluginsService: PluginsService) {}

  @Get()
  findAll(@Query('status') status?: PluginStatus) {
    return this.pluginsService.findAll(status);
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard)
  findPending(@Req() req: Request) {
    const user = req.user as AuthUser;
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can view pending plugins');
    }
    return this.pluginsService.findAllPending();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMyPlugins(@Req() req: Request) {
    const user = req.user as AuthUser;
    return this.pluginsService.findByAuthor(user.userId);
  }

  @Get(':id/reviews')
  findReviews(@Param('id') id: string): Promise<any> {
    return this.pluginsService.findReviews(id);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  upsertReview(
    @Req() req: Request,
    @Param('id') id: string,
    @Body('rating') rating: number,
    @Body('content') content: string,
  ) {
    const user = req.user as AuthUser;
    return this.pluginsService.upsertReview(id, user.userId, {
      rating: Number(rating),
      content: typeof content === 'string' ? content : '',
    });
  }

  @Patch(':id/reviews/:reviewId/reply')
  @UseGuards(JwtAuthGuard)
  replyReview(
    @Req() req: Request,
    @Param('id') id: string,
    @Param('reviewId') reviewId: string,
    @Body('content') content: string,
  ) {
    const user = req.user as AuthUser;
    return this.pluginsService.replyReview(
      id,
      reviewId,
      user.userId,
      user.role,
      typeof content === 'string' ? content : '',
    );
  }

  @Delete(':id/reviews/:reviewId')
  @UseGuards(JwtAuthGuard)
  deleteReview(
    @Req() req: Request,
    @Param('id') id: string,
    @Param('reviewId') reviewId: string,
  ) {
    const user = req.user as AuthUser;
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete reviews');
    }
    return this.pluginsService.deleteReview(id, reviewId);
  }

  @Get(':id/versions/actions')
  @UseGuards(JwtAuthGuard)
  findVersionActions(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as AuthUser;
    return this.pluginsService.findVersionActions(id, user.userId, user.role);
  }

  @Get(':id/versions')
  @UseGuards(JwtAuthGuard)
  findVersions(
    @Req() req: Request,
    @Param('id') id: string,
    @Query('includeDeleted') includeDeleted?: string,
  ) {
    const user = req.user as AuthUser;
    return this.pluginsService.findVersions(
      id,
      user.userId,
      user.role,
      includeDeleted === 'true',
    );
  }

  @Patch(':id/versions/:version/rollback')
  @UseGuards(JwtAuthGuard)
  rollbackVersion(
    @Req() req: Request,
    @Param('id') id: string,
    @Param('version') version: string,
    @Body('reason') reason?: string,
  ) {
    const user = req.user as AuthUser;
    return this.pluginsService.rollbackVersion(
      id,
      version,
      user.userId,
      user.role,
      reason,
    );
  }

  @Delete(':id/versions/:version')
  @UseGuards(JwtAuthGuard)
  deleteVersion(
    @Req() req: Request,
    @Param('id') id: string,
    @Param('version') version: string,
    @Query('reason') reason?: string,
  ) {
    const user = req.user as AuthUser;
    return this.pluginsService.deleteVersion(
      id,
      version,
      user.userId,
      user.role,
      reason,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('allStatus') allStatus?: string) {
    if (allStatus === 'true') {
      return this.pluginsService.findOneAnyStatus(id);
    }
    return this.pluginsService.findOne(id);
  }

  @Post(':id/download')
  async recordDownload(@Req() req: Request, @Param('id') id: string) {
    const forwardedFor = req.headers['x-forwarded-for'];
    const rawIp =
      (typeof forwardedFor === 'string'
        ? forwardedFor
        : Array.isArray(forwardedFor)
          ? forwardedFor[0]
          : undefined) ||
      req.ip ||
      req.socket.remoteAddress;
    const finalIp = rawIp?.split(',')[0] || 'unknown';
    return this.pluginsService.recordDownload(id, finalIp);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: Request, @Body() createPluginDto: CreatePluginDto) {
    const user = req.user as AuthUser;
    return this.pluginsService.create(user.userId, createPluginDto);
  }

  @Patch(':id/versions/:version/audit')
  @UseGuards(JwtAuthGuard)
  audit(
    @Req() req: Request,
    @Param('id') id: string,
    @Param('version') version: string,
    @Body('status') status: PluginStatus,
  ) {
    const user = req.user as AuthUser;
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can audit plugins');
    }
    return this.pluginsService.audit(id, version, status, user.userId);
  }

  @Patch(':id/visibility')
  @UseGuards(JwtAuthGuard)
  async toggleVisibility(
    @Req() req: Request,
    @Param('id') id: string,
    @Body('isPublic') isPublic: boolean,
    @Body('mode') mode?: 'FORCE' | 'NORMAL',
  ) {
    const user = req.user as AuthUser;
    const plugin = await this.pluginsService.findOne(id);
    if (!plugin) throw new ForbiddenException('Plugin not found');

    if (user.role !== 'ADMIN' && plugin.authorId !== user.userId) {
      throw new ForbiddenException('You do not have permission');
    }

    const isAdmin = user.role === 'ADMIN';
    return this.pluginsService.toggleVisibility(id, isPublic, isAdmin, mode);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as AuthUser;
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete plugins');
    }
    return this.pluginsService.delete(id);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard)
  findAllForAdmin(@Req() req: Request) {
    const user = req.user as AuthUser;
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can view all plugins');
    }
    return this.pluginsService.findAllForAdmin();
  }
}
