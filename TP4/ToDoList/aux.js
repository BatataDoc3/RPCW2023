exports.taskForm = function(pending_tasks, done_tasks){
    console.dir(pending_tasks)
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <title>ToDo List</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h2>Add Task</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Task</legend>
                        <div class="w3-row-padding">
                            <div class="w3-third">
                                <label><b>Task</b></label>
                                <input class="w3-input w3-border" type="text" name="task">
                            </div>
                            <div class="w3-third">
                                <label><b>Due Date</b></label>
                                <input class="w3-input w3-border" type="date" name="date">
                            </div>
                            <div class="w3-third">
                                <label><b>Who's doing it</b></label>
                                <input class="w3-input w3-border" type="text" name="person">
                            </div>
                        </div>
                        <label><b>Description</b></label>
                        <input class="w3-input w3-round" type="text" name="description">
                    </fieldset>
                    <button class="w3-btn w3-teal w3-circle w3-mb-2" type="submit">+</button>
                </form>
            </div>
            <div class="w3-row-padding">
            <div class="w3-half">
            <div class="w3-class w3-green">
            <header class="w3-container w3-lime">
                <h1>Pending Tasks</h1>
            </header>
                
`
    for(let i= 0; i < pending_tasks.length; i++){
        pagHTML+= `
                    <div class="w3-bar">
                        <button onclick="myFunction('Pending${i}')" class="w3-bar-item w3-button w3-block w3-left-align w3-light-green w3-xlarge" style="width:77.5%">${pending_tasks[i].task} 
                        <form action="/delete_pending" method="POST">
                            <input type="hidden" name="task_id" value="${pending_tasks[i].id}">
                            <button class="w3-bar-item w3-button  w3-light-green w3-xlarge" style="width:7.5%" type="submit" onClick="history.go(0)"><i class="fa fa-trash"> </i></button>
                        </form>
                        <form method="PUT">
                            <button class="w3-bar-item w3-button  w3-light-green w3-xlarge" style="width:7.5%" type="submit" onClick="history.go(0)"><i class="fa fa-refresh"></i></button>
                        </form>
                        <form action="/change_list" method="POST">
                            <input type="hidden" name="task_id" value="${pending_tasks[i].id}">
                            <button class="w3-bar-item w3-button  w3-light-green w3-xlarge" style="width:7.5%" type="submit" onClick="history.go(0)"><i class="fa fa-arrow-right"></i></button>
                        </form>
                        <div id="Pending${i}" class="w3-container w3-hide">
                            <p><b>Due Date:</b> ${pending_tasks[i].date}</p>
                            <p><b>To be done by:</b> ${pending_tasks[i].person}</p>
                            <p><b>Description:</b> ${pending_tasks[i].description}</p> 
                        </div>
                    </div>
            
                    `
    }
    pagHTML+= `
                </div>
                </div>
            <div class="w3-half">
            <div class="w3-class w3-indigo">
            <header class="w3-container w3-aqua">
                <h1>Done Tasks</h1>
            </header>
            `

    for(let i= 0; i < done_tasks.length; i++){
        pagHTML+= `
                    <div class="w3-bar">
                        <button onclick="myFunction('Done${i}')" class="w3-bar-item w3-button w3-block w3-left-align w3-light-blue w3-xlarge" style="width:92.5%">${done_tasks[i].task}</button>
                        <form action="/delete_done" method="POST">
                            <input type="hidden" name="task_id" value="${done_tasks[i].id}">
                            <button class="w3-bar-item w3-button  w3-light-blue w3-xlarge"  type="submit" style="width:7.5%"><i class="fa fa-trash"> </i></button>
                        </form>
                    </div>
                        <div id="Done${i}" class="w3-container w3-hide">
                            <p><b>Due Date:</b> ${done_tasks[i].date}</p>
                            <p><b>Done by:</b> ${done_tasks[i].person}</p>
                            <p><b>Description:</b> ${done_tasks[i].description}</p> 
                        </div>
            
                    `
    }



    pagHTML += `</div>
            <script>
            function myFunction(id) {
              var x = document.getElementById(id);
              if (x.className.indexOf("w3-show") == -1) {
                x.className += " w3-show";
              } else {
                x.className = x.className.replace(" w3-show", "");
              }
            }
            </script>
        </body>
    </html>
            `
    return pagHTML
}


