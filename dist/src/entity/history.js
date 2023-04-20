"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
const mongoose_1 = require("mongoose");
const HistorySchema = new mongoose_1.Schema({
    cart_id: {
        type: String,
        ref: 'Cart'
    }
});
const History = (0, mongoose_1.model)('History', HistorySchema);
exports.History = History;
//# sourceMappingURL=history.js.map