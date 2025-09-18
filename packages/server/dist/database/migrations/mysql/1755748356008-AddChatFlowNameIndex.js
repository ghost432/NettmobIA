"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddChatFlowNameIndex1755748356008 = void 0;
class AddChatFlowNameIndex1755748356008 {
    constructor() {
        this.name = 'AddChatFlowNameIndex1755748356008';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX \`IDX_chatflow_name\` ON \`chat_flow\` (\`name\`)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_chatflow_name\` ON \`chat_flow\``);
    }
}
exports.AddChatFlowNameIndex1755748356008 = AddChatFlowNameIndex1755748356008;
