import { RawData, WebSocket } from 'ws';

import { Operations } from '../types/operations.js';
import { Registration, UpdateWinners } from '../types/models.js';
import { parseJSON, stringifyJSON } from '../utils/helpers.js';

export const reducer = (ws: WebSocket, data: RawData, isBinary: boolean) => {
    const payload: Registration | UpdateWinners = parseJSON(data.toString());

    switch (payload.type) {
        case Operations.Reg:
            const {
                data: { name }
            } = payload;

            ws.send(
                stringifyJSON({
                    type: 'reg',
                    data: {
                        name,
                        index: 0,
                        error: false,
                        errorText: ''
                    },
                    id: 0
                })
            );
            break;
        case Operations.UpdateWinners:
            break;
        default:
            break;
    }
};
