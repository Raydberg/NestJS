import { Injectable, OnModuleInit } from '@nestjs/common';
import PdfPrinter from 'pdfmake'
import { PrismaClient } from '@prisma/client'


const  font = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};


@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }
  async hello() {
    
  }
}
