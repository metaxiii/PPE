import { ILogger } from 'm2l-core';

import { RoomAdapter } from '../room';
import { BookingAdapter } from '../booking';
import { AdminAdapter } from '../admin';

import { Database } from '../common';

import { ExpressApi } from './express.api';

import * as express from 'express';
import * as path from 'path';

export class ExpressServer {
  private _router: ExpressApi;

  private _logger: ILogger;

  private _server: express.Application;
  private _config: {
    port: string,
    roomImageRoot: string,
    frontEndDirectory: string
  };

  constructor(config: {
    logger: ILogger, serverConfig: { port: string, roomImageRoot: string, frontEndDirectory: string }, database: Database
  }) {
    const booking = new BookingAdapter({ logger: config.logger, database: config.database });
    const room = new RoomAdapter({ logger: config.logger, database: config.database });
    const admin = new AdminAdapter({ logger: config.logger, database: config.database });

    this._router = new ExpressApi({
      booking,
      room,
      admin,
      config: config.serverConfig,
      logger: config.logger
    });

    this._logger = config.logger;

    this._server = express();
    this._config = config.serverConfig;

    this._setApi();
  }

  public start() {
    this._server.listen(this._config.port, () => {
      this._logger.log(`ExpressServer server started on ${this._config.port}...`);
    })
  }

  private _setApi() {
    this._server.use(express.static(this._config.frontEndDirectory))
    this._server.use('/api/v1.1.0', this._router.expressRouter);
    this._server.get('*', (req, res) => {
      res.sendFile(path.resolve(this._config.frontEndDirectory, 'index.html'));
    });
  }
}