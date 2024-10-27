import { RawData, WebSocket, WebSocketServer } from 'ws';

import { Operations } from '../types/operations.js';
import {
    AddUserToRoom,
    CreateRoom,
    Registration,
    UpdateWinners
} from '../types/models.js';
import { parseJSON, stringifyJSON } from '../utils/helpers.js';
import { User } from '../types/user.js';

const createReducer = () => {
    let db: User[] = [];
    return (ws: WebSocket, clients: Set<WebSocket>, data: RawData) => {
        const payload:
            | Registration
            | UpdateWinners
            | CreateRoom
            | AddUserToRoom = parseJSON(data.toString());

        switch (payload.type) {
            case Operations.Reg:
                const {
                    data: { name }
                } = payload;
                db = [...db, { id: 0, name }];
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
                ws.send(
                    stringifyJSON({
                        type: Operations.UpdateWinners,
                        data: [],
                        id: 0
                    })
                );
                // ws.send(
                //     stringifyJSON({
                //         type: Operations.UpdateRoom,
                //         data: [
                //             {
                //                 roomId: 0,
                //                 roomUsers: [{ id: 0, name }]
                //             }
                //         ],
                //         id: 0
                //     })
                // );
                break;
            case Operations.CreateRoom:
                const { id } = payload;
                ws.send(
                    stringifyJSON({
                        type: Operations.UpdateRoom,
                        data: [
                            {
                                roomId: id,
                                roomUsers: []
                            }
                        ],
                        id: 0
                    })
                );
                break;
            case Operations.AddUserToRoom:
                const {
                    data: { indexRoom }
                } = payload;
                ws.send(
                    stringifyJSON({
                        type: Operations.UpdateRoom,
                        data: [
                            {
                                roomId: indexRoom,
                                roomUsers: [{ ...db[0] }]
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
};

export const reducer = createReducer();
