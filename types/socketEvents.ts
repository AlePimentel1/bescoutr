export interface ServerToClientEvents {
    connect: () => void;
    disconnect: () => void;
}

export interface ClientToServerEvents {
    message: (msg: string) => void;
}
