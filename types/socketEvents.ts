declare global {
    interface ServerToClientEvents {
        connect: () => void;
        disconnect: () => void;
    }
    interface ClientToServerEvents {
        message: (msg: string) => void;
    }
}
