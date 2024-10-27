import { Operations } from './operations.js';

export type Id = {
    id: number;
};

export type Registration = {
    type: Operations.Reg;
    data: {
        name: string;
        password: string;
    };
} & Id;

export type UpdateWinners = {
    type: Operations.UpdateWinners;
    data: Array<{
        name: string;
        wins: number;
    }>;
} & Id;

export type CreateRoom = {
    type: Operations.CreateRoom;
    data: string;
} & Id;

export type AddUserToRoom = {
    type: Operations.AddUserToRoom;
    data: { indexRoom: number };
} & Id;
