import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

interface CandidateExcelData {
  seniority: string;
  years: number;
  availability: boolean;
}

@Injectable()
export class AppService {
  processCandidate(name: string, surname: string, fileBuffer: Buffer) {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json<CandidateExcelData>(sheet, {
      header: ['seniority', 'years', 'availability'],
      range: 0, // start at first row,
    })[0];

    return {
      name,
      surname,
      seniority: data.seniority,
      years: data.years,
      availability: data.availability,
    };
  }
}
