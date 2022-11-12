import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw console.log('Cannot access NATS client before connecting');
    }
    return this._client;
  }

  connect(clusterID: string, clientID: string, url: string): Promise<void> {
    this._client = nats.connect(clusterID, clientID, { url });

    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Nats connected!');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
