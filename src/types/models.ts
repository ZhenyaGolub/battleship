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
    type: 'update_winners';
    data: Array<{
        name: string;
        wins: number;
    }>;
} & Id;
