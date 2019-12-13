import { read } from "fs";

//
// This is only a SKELETON file for the 'Change' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
export class Change {
  constructor() {
    this.getLargestCoin = this.getLargestCoin.bind(this);
    this.exactMatch = this.exactMatch.bind(this);
    this.calculate = this.calculate.bind(this);
    this.originalTarget = null;
  }

  getLargestCoin(coins, target) {
    let last = coins.length - 1;
    while (last >= 0) {
      if (coins[last] < target) {
        return coins[last]
      }
      last = last - 1;
    }

    throw new Error(`The total ${this.originalTarget} cannot be represented in the given currency.`)

  }

  exactMatch(coins, target) {
    return coins.filter((coin) => {
      return (coin === target);
    })
  }

  calculate(coinArray, target) {
    let answer = [];
    let remaining = target;
    if (this.originalTarget === null) {
      this.originalTarget = target;
    }

    // short circuit for negatives
    if (target < 0) {
      throw new Error('Negative totals are not allowed.');
    }

    // short circuit for 0
    if (target === 0) {
      return answer;
    }

    // short circuit if a coin matches the target exactly
    let eMatch = this.exactMatch(coinArray, target);
    if (eMatch.length) {
      return eMatch;
    }

    // get largest coin that is less than our target
    let largest = this.getLargestCoin(coinArray, remaining);
    // subtract largest coin from out target....that value is the new target (we could call it "remaining")
    answer.push(largest);
    remaining -= largest;

    if (remaining === 0) {
      console.log('final answer: ', answer.sort());
      return answer.sort();
    }

    return this.calculate(coinArray, remaining).concat(answer);
  }
}