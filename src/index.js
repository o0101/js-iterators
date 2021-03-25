{
  // constantos
    const OPEN = '_';
    const CLOSED = '$';

  // this is hack (prototype splicing) plus Proxies

  const oldHead = Number.prototype.__proto__;

  const restOfChain = Object.create(oldHead);

  const rubyIterators = {
    get(target, prop, receiver) {
      if ( typeof prop === "string" ) {
        const propHead = prop[0];
        const propTail = prop.slice(1);
        const asNumber = new Number(propTail);
        if ( propHead === OPEN && Number.isNaN(asNumber) ) {
          return makeIterator(receiver.valueOf(), asNumber, 
        } else if ( propHead === CLOSED && Number.isNaN(asNumber) ) {

        }
      }
    }
  }

  Number.prototype.__proto__ = new Proxy(restOfChain, rubyIterators);

}
