
import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req, Query, ForbiddenException } from '@nestjs/common';
import { PluginsService, CreatePluginDto } from './plugins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PluginStatus } from '../generated/client/client';

@Controller('plugins')
export class PluginsController {
  constructor(private readonly pluginsService: PluginsService) {}

  @Get()
  findAll(@Query('status') status?: PluginStatus) {
    return this.pluginsService.findAll(status);
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard)
  findPending(@Req() req: any) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can view pending plugins');
    }
    return this.pluginsService.findAllPending();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMyPlugins(@Req() req: any) {
    return this.pluginsService.findByAuthor(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('allStatus') allStatus?: string) {
    if (allStatus === 'true') {
      return this.pluginsService.findOneAnyStatus(id);
    }
    return this.pluginsService.findOne(id);
  }

  @Post(':id/download')
  async recordDownload(@Req() req: any, @Param('id') id: string) {
    // Basic IP extraction
    const ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;
    // Handle array of IPs in x-forwarded-for
    const finalIp = Array.isArray(ip) ? ip[0] : (ip?.split(',')[0] || 'unknown');
    return this.pluginsService.recordDownload(id, finalIp);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() createPluginDto: CreatePluginDto) {
    return this.pluginsService.create(req.user.userId, createPluginDto);
  }

  @Patch(':id/versions/:version/audit')
  @UseGuards(JwtAuthGuard)
  audit(
    @Req() req: any,
    @Param('id') id: string,
    @Param('version') version: string,
    @Body('status') status: PluginStatus,
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can audit plugins');
    }
    return this.pluginsService.audit(id, version, status, req.user.userId);
  }

  @Patch(':id/visibility')
  @UseGuards(JwtAuthGuard)
  async toggleVisibility(
    @Req() req: any,
    @Param('id') id: string,
    @Body('isPublic') isPublic: boolean,
  ) {
    // Check permission
    const plugin = await this.pluginsService.findOne(id);
    if (!plugin) throw new ForbiddenException('Plugin not found');

    if (req.user.role !== 'ADMIN' && plugin.authorId !== req.user.userId) {
      throw new ForbiddenException('You do not have permission');
    }

    const isAdmin = req.user.role === 'ADMIN';
    return this.pluginsService.toggleVisibility(id, isPublic, isAdmin);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req: any, @Param('id') id: string) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete plugins');
    }
    return this.pluginsService.delete(id);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard)
  findAllForAdmin(@Req() req: any) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can view all plugins');
    }
    return this.pluginsService.findAllForAdmin();
  }
}
