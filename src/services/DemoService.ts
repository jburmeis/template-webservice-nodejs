import { IDemoService } from "./ApplicationServices";

export default class DemoService implements IDemoService {
  private readonly messages: string[];

  constructor(messages: string[] = ["Hello World!"]) {
    this.messages = messages;
  }

  public getRandomMessages(length: number): string[] {
    return Array(length).fill(this.getRandomMessage());
  }

  private getRandomMessage(): string {
    const messageIdx = Math.floor(Math.random() * this.messages.length);
    return this.messages[messageIdx];
  }
}
