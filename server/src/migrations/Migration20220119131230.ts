import { Migration } from '@mikro-orm/migrations';

export class Migration20220119131230 extends Migration {

  async up(): Promise<void> {
    this.addSql('select 1');
  }

}
