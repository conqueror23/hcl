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

// var json_notype = del_type(json);
// console.log(Object.values(json_notype));
// var export_json =Object.values(json_notype);



// var obj_1= Object.values(json_notype);
// // console.log(obj_1);
// var obj_f = Object.assign({},obj_1[0],obj_1[1]);
//

//
// // delete type attributes
// function overrides_samples(obj){
//   var overrides_array=[];
//   for(x in obj){
//     if(x =='overrides'){
//       for (x1 in obj[x]){
//           if(x1 ==ENVIRONMENT){
//             // things you need to change happens here
//             // console.log(obj[x][x1]); // array of things is going to change
//             overrides_array =obj[x][x1];
//             return overrides_array;
//             // for(x2 in obj[x][x1]){
//             //   console.log(obj[x][x1][x2]);
//             // }
//             }
//
//       }
//     }
//
//
//   }
// }
// var overrides_array=overrides_samples(json_notype);
// // console.log(overrides_array);
//
// // you have to check every overides names and than change that existing item to fit the overide values
// // all records no
//
// function getKeyByValue(obj,value){
//   for(x in obj){
//     if(obj[x]['name']== value){
//       return x;
//     }
//   }
// }
//
// //big steps here
// var key = getKeyByValue(export_json,'timeout');
//
// //change values
// export_json[key]['value']=100;
//
//
// console.log(export_json);
// // it going to be conflict be cause you have changed the structure to chage names




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

    }else{
      for(x1 in obj[x]){
        if(x1==ENVIRONMENT){
          for(x2 in obj[x][x1]){
            console.log(obj[x][x1][x2]['name']);
            // you should change first before names chaged

          }
        }
      }

    }
  }
  return obj;
}

name_ch(json);
// console.log(json);
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
