import { Client } from 'pg';

interface ConnectionOptions {
  postgresUrl: string;
}

export class PostgresDatabase {
  private static client: Client | null = null;

  static async connect(options: ConnectionOptions) {
    const { postgresUrl } = options;

    try {
      this.client = new Client(postgresUrl);
      await this.client.connect();
      console.log('Postgres connected successfully!');
    } catch (error) {
      console.log('Postgres connection error');
      throw error;
    }
  }
}
