"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220119131230 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220119131230 extends migrations_1.Migration {
    async up() {
        this.addSql('select 1');
    }
}
exports.Migration20220119131230 = Migration20220119131230;
//# sourceMappingURL=Migration20220119131230.js.map