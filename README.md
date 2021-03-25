# js-iterators

Ruby style iterators in JS

```js

[...1.._10]; // [1, 2, 3, 4, 5, 6, 7, 8, 9]
[...1..$10]; // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for( const i of 1.._10 ) {
  console.log(i+1); 
}

// 2, 3, ... 10
```


