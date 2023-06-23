"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3030");

const CreateRoom = () => {
	const [username, setUsername] = useState("");
	const [roomID, setRoomID] = useState("");
	const router = useRouter();
	const handleCreateRoom = () => {
		const payload = {
			username,
		};
		socket.emit("create new room", payload);

		socket.on("new room", (data) => {
			router.push(`/room/${data.roomID}`);
		});
	};

	const handleJoinRoom = () => {
		const payload = {
			username,
			roomID,
		};
		socket.emit("join room", payload);
		router.push(`/room/${payload.roomID}`)
	}


	return (
		<div className="flex flex-col items-center justify-center h-[100vh]">
			<h1 className="text-7xl mb-5">Termo Multiplayer</h1>
			<div className="mb-5 flex flex-col">
				<label htmlFor="">Username</label>
				<input className="text-black" type="text" onChange={(e) => setUsername(e.target.value)} />
				<label htmlFor="">Código da sala</label>
				<input className="text-black" type="text" onChange={(e) => setRoomID(e.target.value)} />
			</div>
			<div className="flex gap-3">
				<button className="px-3 bg-blue-600" onClick={() => handleJoinRoom()}>Jogar</button>
				<button
					className="px-3 bg-blue-600"
					onClick={() => handleCreateRoom()}
				>
					Criar Sala
				</button>
			</div>
		</div>
	);
};

export default CreateRoom;
