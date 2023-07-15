const socket = io.connect("http://localhost:4000")

socket.on('check',(data)=>{
    console.log("this is the data ", data);
    alert("New Order")
})