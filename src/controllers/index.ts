import { RawData, WebSocket } from 'ws';

import { Operations } from '../types/operations.js';
import {
    AddUserToRoom,
    CreateRoom,
    Registration,
    UpdateWinners
} from '../types/models.js';
import { parseJSON, stringifyJSON } from '../utils/helpers.js';

export const reducer = (ws: WebSocket, data: RawData, isBinary: boolean) => {
    const payload: Registration | UpdateWinners | CreateRoom | AddUserToRoom =
        parseJSON(data.toString());

    switch (payload.type) {
        case Operations.Reg:
            const {
                data: { name }
            } = payload;

            ws.send(
                stringifyJSON({
                    type: Operations.Reg,
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
        case Operations.CreateRoom:
            const { id } = payload;
            ws.send(
                stringifyJSON({
                    type: Operations.UpdateRoom,
                    data: [
                        {
                            roomId: id,
                            roomUsers: [
                                {
                                    name: 'user1',
                                    index: 0
                                }
                            ]
                        }
                    ],
                    id: 0
                })
            );
            break;
        default:
            break;
    }
};
