// hooks/useSocket.ts
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from 'types/socketEvents';

const useSocket = () => {
    const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

    const url = process.env.NODE_ENV === 'production' ? process.env.SERVER_URL : 'http://localhost:8080';

    const userId = useSession()
    console.log(userId)

    useEffect(() => {
        socketRef.current = io(url, {
            transports: ['websocket'], // Fuerza el uso de WebSockets
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [url]);

    const sendMessage = (event: keyof ClientToServerEvents, data: string) => {
        if (socketRef.current) {
            socketRef.current.emit(event, data);
        }
    };

    return { sendMessage };
};

export default useSocket;
