
export class OneBot {
  method: 'http' | 'ws' | 'ws-reverse';
  constructor(method: 'http' | 'ws' | 'ws-reverse') {
    this.method = method;
  }
}
