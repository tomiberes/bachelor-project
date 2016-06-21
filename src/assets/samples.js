export function compose(...fns) {
  if (fns.length === 0) {
    return arg => arg;
  }
  if (fns.length === 1) {
    return fns[0];
  }

  let last = fns[fns.length - 1];
  let rest = fns.slice(0, -1);

  return (...args) => rest.reduceRight((composed, fn) => fn(composed), last(...args));
}

export function curry(fx) {
  // The function length property specifies the number of arguments
  // expected by the function.
  let arity = fx.length;

  return function f1() {
    let args = Array.prototype.slice.call(arguments, 0);

    if (args.length >= arity) {
      return fx.apply(null, args);
    } else {
      return function f2() {
        let args2 = Array.prototype.slice.call(arguments, 0);

        return f1.apply(null, args.concat(args2));
      };
    }
  };
}

export function memoize(fn) {
  let cache = {};

  return function(...args) {
    let argsStr = JSON.stringify(...args);
    cache[argsStr] = cache[argsStr] || fn.apply(fn, ...args);
    return cache[argsStr];
  };
}
