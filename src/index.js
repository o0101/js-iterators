{
  // constantos
    const OPEN = '_';
    const CLOSED = '$';
    const SYNTAX = new Set([OPEN,CLOSED]);

  // this is hack (prototype splicing) plus Proxies

  const oldHead = Number.prototype.__proto__;

  const restOfChain = Object.assign(Object.create(oldHead), rubyIterators());

  const rubyIteratorSyntaxHackTrap = {
    get(...args) {
      const [target, prop, receiver] = args;

      if ( typeof prop === "string" ) {
        const propHead = prop[0];

        if ( SYNTAX.has(propHead) ) {
          let propTail = prop[1] === '_' ? 
          // if there's a leading _ then it means '-' minus 
            prop.slice(1).replace('_','-') : 
            prop.slice(1);

          // or minus exponent depending on where they are
          const hasExponent = propTail.indexOf('e');
          if ( hasExponent && hasExponent > 0 ) {
            const lastScore = propTail.lastIndexOf('_');
            if ( lastScore === hasExponent + 1 ) {
              propTail = propTail.split('');
              propTail[lastScore] = '-';
              propTail = propTail.join('');
            }
          }


          // if there is another _ then it means '.' decimal point
          propTail = propTail.replace('_','.');

          const highNumber = new Number.prototype.constructor(propTail);

          if ( !Number.isNaN(highNumber) ) {
            return interval(receiver.valueOf(), highNumber, propHead);
          }
        } else if ( prop === 'times' ) {
          return interval(0, receiver.valueOf(), OPEN);
        }
      }

      return Reflect.get(...args);
    }
  }

  Number.prototype.__proto__ = new Proxy(restOfChain, rubyIteratorSyntaxHackTrap);

  function *interval(lowNumber, highNumber, type, by = 1) {
    let unfinishedAt = v => v < highNumber;
    if ( type === CLOSED ) {
      unfinishedAt = v => v <= highNumber;
    }
    let next = v => v + by;
    if ( highNumber < lowNumber ) {
      unfinishedAt = v => v > highNumber;
      if ( type === CLOSED ) {
        unfinishedAt = v => v >= highNumber;
      }
      next = v => v - by;
    }

    let i = lowNumber;

    while(unfinishedAt(i)) {
      yield i;
      i = next(i);
    }
  }

  function rubyIterators() {
    return {
      step(to, by) {
        return interval(this.valueOf(), to, CLOSED, by);
      },

      upto(high) {
        return interval(this.valueOf(), high, CLOSED);
      },

      downto(low) {
        return interval(this.valueOf(), low, CLOSED);
      },
    };
  }
}
