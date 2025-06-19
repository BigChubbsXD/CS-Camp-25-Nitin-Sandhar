/*
$( document ).ready(function() {
    $('#btn').click(function() {
        window.alert("DID YOU JUST CLICK ME?!");
    });
});
*/
function buttonResult() {
  const input = document.getElementById("devmode").value;
   if (input.trim() === "") {
    alert("Please enter a command.");
    return;
  }
  try {
    const result = eval(input); // Evaluate the JS code
    if (result !== undefined) {
      console.log(result); // Log results like 2 + 2
      alert("Result: " + result);
    } else {
      alert("Executed: " + input);
    }
  } catch (e) {
    alert("Error: " + e.message);
  }
}





