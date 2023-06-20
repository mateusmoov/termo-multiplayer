"use client";

import React from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3030");

const CreateRoom = () => {
	const handleCreateRoom = () => {
		const payload = {
			username: "Moov",
		};
		socket.emit("create new room", payload);
	};

	socket.on("new room", (data) => {
		console.log(data);
	});

	return (
		<div className="flex flex-col items-center justify-center h-[100vh]">
			<h1 className="text-7xl mb-5">Termo Multiplayer</h1>
			<div className="mb-5">
				<input type="text" />
			</div>
			<div className="flex gap-3">
				<button className="px-3 bg-blue-600">Jogar</button>
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
