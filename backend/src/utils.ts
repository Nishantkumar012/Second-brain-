 

 export function random(num: number){
          let options = "qwertyuiasdfghjkzxcvbnmgg";
          let length = options.length;

          let ans = "";

          for(let i=0;i<num;i++){
                ans += options[Math.floor((Math.random() * length))]
          }
               console.log(ans);
           return ans;
 }