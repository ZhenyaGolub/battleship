export const isJsonString = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const stringifyJSON = (value: object) =>
    JSON.stringify(value, (key, value) =>
        key === 'data' ? JSON.stringify(value) : value
    );

export const parseJSON = (value: string) =>
    JSON.parse(value, (key, value) =>
        isJsonString(value) ? JSON.parse(value) : value
    );
