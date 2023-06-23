"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3030");

interface ParamsProps {
	params: {
		roomID: string;
	};
}

interface PlayerProps {
	username: string;
	roomID: string;
	socket_id: string;
}

const room = ({ params }: ParamsProps) => {
	const [players, setPlayers] = useState<PlayerProps[]>([]);

	useEffect(() => {
		socket.emit("join first room", params.roomID);
		socket.on("users update", (users) => {
			setPlayers(users)
		});
	}, [params.roomID]);

	return (
		<div className="container mx-auto flex justify-center items-center h-[100vh]">
			<div className="flex justify-center flex-col">
				<div className="flex justify-center">
					<h1 className="text-7xl text-center mb-3">
						Termo <br /> Multiplayer
					</h1>
				</div>
				<div className="flex items-center gap-x-6">
					<div className="text-center">
						<p>Jogador 1</p>
						<span>{players[0]?.username}</span>
					</div>
					<div className="w-[449px] h-[479px] bg-blue-700"></div>
					<div className="text-center">
						<p>Jogador 2</p>
						<span>{players[1]?.username}</span>
					</div>
				</div>
				<div className="flex justify-center items-center flex-col mt-4">
					<p>Código da sala</p>
					<h1>#{params.roomID.toUpperCase()}</h1>
				</div>
			</div>
		</div>
	);
};

export default room;
