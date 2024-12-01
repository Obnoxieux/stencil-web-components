import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'current-time',
  shadow: true,
})
export class CurrentTime {
  @Prop() reloadInterval = 1000;
  @Prop() includeDate = false;
  private timer: number;

  @State() currentTime: number = Date.now();

  connectedCallback() {
    this.timer = window.setInterval(() => {
      this.currentTime = Date.now();
    }, this.reloadInterval);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    let output = '';
    const time = new Date(this.currentTime).toLocaleTimeString();

    if (this.includeDate) {
      const date = new Date(this.currentTime).toLocaleDateString();
      output = `${date}, ${time}`;
    } else {
      output = time;
    }

    return <span>{output}</span>;
  }
}
