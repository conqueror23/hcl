// console.log(process.argv);
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });
// console.log(process.argv[3]);
//
// console.log(process.argv[5]);

var cmd = process.argv;
  for (x in cmd){
    // console.log(x+' : '+cmd[x]);
    if(cmd[x].toUpperCase() =='-I'){
      x++;
      // console.log(cmd[x]);
      var input_path = cmd[x];
    }
    if(cmd[x].toUpperCase()=='-O'){
      x++;
      // console.log(cmd[x]);
      var output_path =cmd[x];
    }
  }
  // console.log(input_path);


console.log(input_path);
console.log(output_path);


// console.log(typeof(input_path));
// console.log(output_path);
