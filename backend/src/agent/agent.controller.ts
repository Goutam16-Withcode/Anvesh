import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgentService } from './agent.service';
import { ChatDto } from './dto/chat.dto';

@ApiTags('AI Career Agent')
@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send message to autonomous career agent with tool-orchestration execution' })
  @ApiResponse({ status: 200, description: 'Agent response with executed tool trace and suggestions' })
  async chat(@Body() chatDto: ChatDto) {
    return this.agentService.chat(chatDto);
  }
}
