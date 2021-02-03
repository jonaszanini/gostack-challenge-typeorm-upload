import fs from 'fs';
import csvParse from 'csv-parse';

import Transaction from '../models/Transaction';

interface MyTrans{
  title: string;
  type: string;
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parses = csvParse({ from_line: 2 });

    const parseCSV = contactsReadStream.pipe(parses);

    const transactions = [];
    const categories = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    })

    await new Promise(resolve => parseCSV.on('end', resolve));

    return {categories, transactions}
  }
}

export default ImportTransactionsService;
