declare module "comlink-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
    compute(): Promise<number>;
  }
  export = WebpackWorker;
}
