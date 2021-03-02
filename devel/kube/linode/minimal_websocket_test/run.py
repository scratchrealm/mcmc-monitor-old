#!/usr/bin/env python3

import time
import json
import asyncio
import websockets

def main():
    async def incoming_message_handler(websocket):
        async for message in websocket:
            msg = json.loads(message)
            print('incoming message', msg)

    async def outgoing_message_handler(websocket):
        while True:
            print('test', time.time())
            await asyncio.sleep(1)

    async def connection_handler(websocket, path):
        task1 = asyncio.ensure_future(
            incoming_message_handler(websocket))
        task2 = asyncio.ensure_future(
            outgoing_message_handler(websocket))
        done, pending = await asyncio.wait(
            [task1, task2],
            return_when=asyncio.FIRST_COMPLETED,
        )
        print('Connection closed.')
        for task in pending:
            task.cancel()

    listen_port = 10408
    start_server = websockets.serve(connection_handler, '0.0.0.0', listen_port)

    print(f'Starting server')
    asyncio.get_event_loop().run_until_complete(start_server)
    print(f'Listening for websocket connections on port {listen_port}')
    asyncio.get_event_loop().run_forever()

if __name__ == '__main__':
    main()