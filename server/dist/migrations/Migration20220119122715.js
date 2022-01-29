"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220119122715 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220119122715 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');
    }
}
exports.Migration20220119122715 = Migration20220119122715;
//# sourceMappingURL=Migration20220119122715.js.map