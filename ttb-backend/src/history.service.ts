import { Injectable } from '@nestjs/common';

interface HistoryDto {
  method: string;
  url: string;
  ip: string;
}

@Injectable()
export class HistoryService {
  // constructor(
  //   @InjectRepository(History)
  //   private historyRepository: Repository<History>,
  // ) {}

  writeHistory(historyDto: HistoryDto) {
    console.log(historyDto);
  }
}
