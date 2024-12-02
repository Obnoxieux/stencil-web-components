import { Component, Prop, State, h } from '@stencil/core';
import { getRelativeTimeString } from '../../utils/TimeUtility';

@Component({
  tag: 'relative-time',
  styleUrl: 'relative-time.css',
  shadow: true,
})
export class RelativeTime {
  @Prop() date: Date = new Date();
  @Prop() reloadInterval = 1000;

  private timer: number;

  @State() displayedTime: number = Date.now();

  connectedCallback() {
    this.timer = window.setInterval(() => {
      // just set it to something new to trigger re-render
      this.displayedTime = Date.now();
    }, this.reloadInterval);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    // always read the passed prop, not the state value, so reference doesn't change
    const output = getRelativeTimeString(this.date.getTime());

    return <span>{output}</span>;
  }
}
