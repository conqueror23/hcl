var fs = require('fs');

var swig = require('swig-templates');
// use eval $(cat .env) command to load environment variables
//.env files stores environment variables needed
const {
  SERVICE_NAME,ENVIRONMENT
} =process.env;


//read input directory and output directory

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



//take input from command lines
// this way is good for render a file and you need to select specific columns
swig.renderFile(input_path,{ENVIRONMENT,SERVICE_NAME},function(err,output){
  if(err){
    throw err;
  }
  // change the output for you to show the final output
  json =JSON.parse(output);


// get rid of type
function del_type(obj){
  var obj_f={};
  var n= 0;
  for(x in obj){
      for(x1 in obj[x]){
        delete obj[x][x1]['type'];
         // console.log(obj[x][x1]);
         obj_f[n]= obj[x][x1];
          n++;
      }
      delete obj['overrides']
    }
    return obj_f;
}

function getKeyByValue(obj,value){
  for(x in obj){
    if(obj[x]['name']== value){
      return x;
    }
  }
}

//overrides accoridng to ENVIRONMENT
function override(obj){
  for(x1 in obj['overrides']){
    // console.log(x1);
    if(x1==ENVIRONMENT){
      // console.log(obj['overrides'][x1]);
      for(x2 in obj['overrides'][x1]){

        var num =getKeyByValue(obj['shared'],obj['overrides'][x1][x2]['name']);
        // console.log(num);
        var num1 =getKeyByValue(obj['specific'],obj['overrides'][x1][x2]['name']);
        // console.log(num1);
        if(num != undefined){
          obj['shared'][num]['value']=obj['overrides'][x1][x2]['value'];
        }
        if(num1 != undefined){
          obj['specific'][num1]['value']=obj['overrides'][x1][x2]['value'];
        }
        //should change first before names chaged
      }
    }

  }
  return obj;
}

var obj_overrided = override(json);
// console.log(obj_overrided);

// change name
function name_ch(obj){
// overides first than change names
for( x in obj){
  if(x =='shared'){
    for(x1 in obj[x]){
      obj[x][x1]['name']= '/common/'+ENVIRONMENT+'/'+obj[x][x1]['name'];
      // console.log(obj[x][x1]['name']);
    }
  }else if (x=='specific') {
    for(x1 in obj[x]){
      obj[x][x1]['name']= '/'+SERVICE_NAME+'/'+ENVIRONMENT+'/'+obj[x][x1]['name'];
      // console.log(obj[x][x1]['name']);
    }
  }
}
  return obj;
}

var output_obj =name_ch(obj_overrided);
// console.log(output_obj);

// except the value of password should be masked

// write the output
var output_type_obj =del_type(output_obj);
// console.log(Object.values(output_type_obj));
var output_final = Object.values(output_type_obj);

output_final = JSON.stringify(output_final);
//output is should be content
fs.writeFile(output_path,output_final,function(err){
  if(err){
    throw err;
  }
})

})
