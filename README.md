# js-iterators (zero dependencies)

Ruby style iterators in JS

```js

[...1.._10];              // [1, 2, 3, 4, 5, 6, 7, 8, 9]
[...1.._-10];             // [1, 0, -1, -2, ..., -9]
[...Math.PI..9];          // [3.141592653589793, 4.141592653589793, 5.141592653589793, 6.141592653589793, 7.141592653589793, 8.141592653589793]
[...(-1e3)._1e3];         // [-1000, -999, ..., 998, 999]
[...1e3._2e3];            // [1000, 1001, ..., 1999]
[...1..$10];              // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[...1..__1_213e3];        // [1, 0, -1, ..., -1213]
[...1..__1_213e_3];       // [1, 0]

for( let i of 1.._10 ) {
  console.log(i+1);       // 2, 3, 4, ..., 10
}

Array.from(1..$10);       // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

[...(-10)._$10];          // [-10, -9, ..., 9, 10]
[...4..times];            // [0, 1, 2, 3]
[...5.upto(10)];          // [5, 6, 7, 8, 9, 10]
[...10.downto(5)];        // [10, 9, 8, 7, 6, 5]
[...4.step(10,2)];        // [4, 6, 8, 10]

```

# get

```console
$ npm i --save js-iterators@latest
```

# contribute

PRs only thanks! :)

# why not just use Ruby?

I'm on web

# why not use this other library?

Syntax

# why this?

Cool

# Guide

- `<left_part><1 or 2 dots><right_part>`
- Left part must be a Number
- Right part must start with _ or $ then be followed by a number
- Negative numbers on left wrap in ()
- Negative numbers on right prefix with extra _
- Right-closed (inclusive end, e.g., [1,3] === 1, 2, 3) intervals use $
- Right-open (non-inclusive end, e.g., [1,3) === 1, 2) intervals use _
- Only 1 dot separating left and right parts when left part is:
  - a negative number (which must be wrapped in `(` and `)`), e.g. Array.from((-10)._20)
  - a floating point number with decimal places, e.g. [...3.1415._10]
  - a variable, e.g. [...Math.PI._10]
  - an octal, e.g. [...0701._500]
  - a binary, e.g. [...0b101011._500]
  - a hexadecimal, e.g. [...0xfa._500]
  - a scientific-notation, e.g. [...1e3._1010]
- Otherwise, two dots separating left and right parts


- Ruby API
  - `<range>.to_a` send range to an array, e.g. 1.._10.to_a
  - `<number>.upto(high)` count up from number to high inclusive by 1s (or -1s)
  - `<number>.downto(low)` count down from number to low inclusive by 1s (or -1s)
  - `<number>.step(to, by)` count from number to `to` inclusive by `by`s (or -`by`s)
  - `<number>.times` iterate number times (and return integers 0..number-1)
  - Ruby API is based on [Ruby range](https://ruby-doc.org/core-2.5.1/Range.html) and [Ruby number iterators](https://www.dotnetperls.com/iterator-ruby)



