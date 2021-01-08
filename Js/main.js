function valForm(){
            var name = document.getElementById("iname").value; /*It define the variable name */
             var email= document.getElementById("iemail").value;/*It define the variable email */
             var phone=document.getElementById("iphone").value;/*It define the integer phone */
             var message=document.getElementById("imessage").value;/*It define the variable message */
            
            if(name.trim() == "" || email.trim() =="" || phone.trim() =="" || message.trim()==""){
                alert("Empty form cannot be submitted.Fill it."); /*if conditon is being used which send alert message when empty field occur otherwise else condition will be used*/
                
            }else{/*Else condition*/
                alert("Thanks for messaging");
                
            }
}