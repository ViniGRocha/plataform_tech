import express from "express";
import { chatBot } from "./controller/chatBotController";

export const routerChatBot = express.Router();

routerChatBot.post("/result", chatBot);
