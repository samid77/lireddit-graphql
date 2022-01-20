"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220119131210 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220119131210 extends migrations_1.Migration {
    async up() {
        this.addSql('select 1');
    }
}
exports.Migration20220119131210 = Migration20220119131210;
//# sourceMappingURL=Migration20220119131210.js.map