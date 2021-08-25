var obj = {
  bar: function() {
    var x = (() => this);
    return x;
  }
};

var fn = obj.bar();
var fn2 = obj.bar;
console.log(fn() === obj); 
console.log(fn2()() === obj);