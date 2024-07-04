function filtrarPares(arr){
    nova_arr = []
    for(let i = 0; i < arr.length; i++){
        if (arr[i] % 2 === 0){
            nova_arr.push(arr[i])
        }
    }
   return nova_arr
}