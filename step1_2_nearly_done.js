var swig = require('swig-templates');
// use eval $(cat .env) command to load environment variables
//.env files stores environment variables needed
const {
  SERVICE_NAME,ENVIRONMENT
} =process.env;


// this way is good for render a file and you need to select specific columns
swig.renderFile('./a.json.template',{ENVIRONMENT,SERVICE_NAME},function(err,output){
  if(err){
    throw err;
  }
  // change the output for you to show the final output
  // json=output;
  // console.log(typeof(output));
  json =JSON.parse(output);
  // in shard name = /common/+ENVIRONMENT/+name
  // in specific name = /SERVICE_NAME+/ENVIRONMENT+/name;
// get rid of type
function del_type(obj){
  for(x in obj){
      for(x1 in obj[x]){
        delete obj[x][x1]['type'];
        // console.log(obj[x][x1]);
      }
}
return obj;
}


var json_notype = del_type(json);
//overrides
function overrides_samples(obj){
  for(x in obj){
    if(x =='overrides'){
      for (x1 in obj[x]){
          if(x1 ==ENVIRONMENT){
            // things you need to change happens here
            // console.log(obj[x][x1]); // array of things is going to change
            var overrides_array =obj[x][x1];
            return overrides_array;

          }

      }
    }
    //change things in this level


  }
}
var overrides_array=overrides_samples(json_notype);

function overrides_conduct(obj,overrides_array){
  for(x in obj){
    if(x != 'overrides'){
      for(x1 in obj[x]){
        console.log(obj[x][x1]);
        //overrides happens in this level
        for(o in overrides_array){
          // console.log(o);
        }

      }
    }

  }


}
overrides_conduct(json_notype,overrides_array);

// console.log(json_notype);

// change name
function name_ch(obj){
  for(x in obj){

    //change names
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
//
// name_ch(json_notype);
// var final_obj = name_ch(json_notype);
//
// console.log(final_obj['shared']);
// console.log(final_obj['specific']);
// concatate final_obj_1 and final_obj_2


// be notice that in dev mode timeout has been changed to 100


//
// var final_obj_1 =final_obj['shared'],
// final_obj_2 =final_obj['specific'];
//
// console.log(final_obj_1);
//
//
//


// console.log(json['shared'],json['specific']);
  //the format is correct and now choose the content
  // var out = json['shard'].push(json['specific']);


})
