import { Module } from '@nestjs/common';
import { FetchAdapter } from './adapters/FetchAdapter';

@Module({
    providers: [FetchAdapter],
    exports: [FetchAdapter]
})
export class CommonModule { }
