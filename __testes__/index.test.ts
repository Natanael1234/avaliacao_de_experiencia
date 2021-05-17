
import { Server } from "http";
import request from "supertest";
import { getServer, closeServer } from '../src/app';
import { Database } from "../src/database";

describe('Test PingController', () => {

    let server: Server;

    beforeAll(async () => {
        jest.useFakeTimers();
        server = await getServer();
        await Database.recreateDatabase();
    });
 
    it('Post /cliente', async () => {

    });

    afterAll(async () => {
        await closeServer(server);
    })
});