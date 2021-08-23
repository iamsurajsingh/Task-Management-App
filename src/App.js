import React, { useEffect, useState } from 'react'
import './App.scss';

function App() {

  const getLocalStorage = () => {
    const localData = localStorage.getItem('myTasks');
    if (localData) {
      return JSON.parse(localData);
    }
    else {
      return [];
    }
  }

  function onPageLoad(item) {
    item.map((elem) => {
      console.log(elem);
      const checkBoxElement = document.getElementById(elem.id);
      const checkBoxUnit  = document.getElementsByTagName('label');
      console.log(checkBoxUnit);
      const taskContain = document.getElementById(elem.head);
      // console.log(taskContain);
      const dateContain = document.getElementById(elem.date);
      // console.log(checkBoxElement);

      if (elem.status === "Completed") {
        checkBoxElement.setAttribute("checked", "");
        checkBoxElement.setAttribute("style", "color: aqua");
        taskContain.setAttribute("style", "text-decoration: line-through; color: #9E9E9E;");
        dateContain.setAttribute("style", "text-decoration: line-through; color: #9E9E9E;");
        
      }
      
    })

  }

  const [heading, setHeading] = useState("");
  const [items, setItems] = useState(getLocalStorage());
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editHeading, setEditHeading] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [getfilterData, setFilterData] = useState(items);
  const [getStatusHeading, setStatusHeading] = useState("All Tasks");




  const addNewTask = () => {

    const inputArea = document.getElementById('headingTodo');
    const noteArea = document.getElementById('descriptionTodo');
    inputArea.value = "";
    noteArea.value = "";


    if (!heading) {
      alert("Task Name cannot be empty");
    }

    else if (heading && toggleButton) {
      setItems(items.map((currElem) => {
        if (currElem.id === editHeading) {
          return { ...currElem, head: heading, description: desc };
        }
        return currElem;
      }));
      setStatusHeading("All Tasks");
      setHeading("");
      setDesc("");
      setToggleButton(false);
    }

    else {
      const inputData = {
        id: new Date().getTime().toString(),
        head: heading,
        description: desc,
        date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }),
        status: status,
      }
      setItems([...items, inputData]);
      setFilterData([...getfilterData, inputData]);
      setHeading("");
      setDesc("");
      setToggleButton(false);
      console.log(inputData);

    }
  }

  const deleteTasks = (id) => {
    const updatedTasks = items.filter((elem) => {
      return elem.id !== id;
    });
    setItems(updatedTasks);
    setFilterData(updatedTasks);
    setStatusHeading("All Tasks");

  }


  const filterData = (taskStatus) => {
    // setStatus(taskStatus);
    if(taskStatus === "All Tasks") {
      setFilterData(items);
      setStatusHeading("All Tasks");
    }
    else {
      const showFilteredList = items.filter((elem) => {
        return elem.status === taskStatus;
      });
      console.log(showFilteredList);
      
      setFilterData(showFilteredList);
      setStatusHeading(taskStatus);
    }
  }




  //  putting up data to local storage
  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(items));
    onPageLoad(items);
  }, [items]);


  useEffect(() => {
    onPageLoad(getfilterData);
  }, [getStatusHeading]);


  //edit the tasks

  const editTasks = (id) => {
    // const noteArea = document.getElementById('descriptionTodo');

    const taskToEdit = items.find((elem) => {
      return (elem.id === id);
    });
    setHeading(taskToEdit.head);
    setDesc(taskToEdit.description)
    setEditDesc(id);
    setEditHeading(id);
    setToggleButton(true);

  }

  const checkMouseAction = (event) => {
    var ignoreClickOnMeElement = document.getElementById('saveChanges');
    var isClickInsideElement = ignoreClickOnMeElement.contains(event.target); 
    if(!isClickInsideElement) {
      alert('Please save changes first');
    }
  }



  function handleValidation(currElem) {

    const checkBoxElement = document.getElementById(currElem.id);
    const taskContain = document.getElementById(currElem.head);
    const dateContain = document.getElementById(currElem.date);
    console.log(checkBoxElement);
    
    if (currElem.status === "Completed") {
      checkBoxElement.removeAttribute("checked");
      setStatus(currElem.status);
      taskContain.removeAttribute("style", "text-decoration: line-through; color: #9E9E9E; ");
      dateContain.removeAttribute("style", "text-decoration: line-through; color: #9E9E9E;");
      setItems(items.map((elem) => {
        if (elem.id === currElem.id) {
          return { ...elem, status: "Pending" };
        }
        return elem;
      }));

    }
    else {
      
      checkBoxElement.setAttribute("checked", "");
      setStatus(currElem.status);
      taskContain.setAttribute("style", "text-decoration: line-through; color: #9E9E9E;");
      dateContain.setAttribute("style", "text-decoration: line-through; color: #9E9E9E;");
      setItems(items.map((elem) => {
        if (elem.id === currElem.id) {
          return { ...elem, status: "Completed" };
        }
        return elem;
      }));
      console.log(items);
    }
  }


  return (
    <div className="App">
      <div className="navBar">
        <div className="leftMenu">
          <p className="logo">TASK MANAGEMENT APP</p>
        </div>
        <div className="rightMenu"></div>
      </div>

      <div className="container">
        <div className="leftContainer">
          <ul id="status">
            <span className="list1" onClick={() => filterData("All Tasks")}>
              <i className="fa fa-caret-right" aria-hidden="true"></i><li className="status_name" value="All Tasks">ALL TASKS</li>
            </span>
            <span className="list2" onClick={() => filterData("Completed")}>
              <i className="fa fa-caret-right" aria-hidden="true"></i><li className="status_name" value="Completed" >COMPLETED</li>
            </span>
            <span className="list3" onClick={() => filterData("Pending")}>
              <i className="fa fa-caret-right" aria-hidden="true"></i><li className="status_name" value="Pending" >PENDING</li>
            </span>
          </ul>
        </div>
        <div className="middleContainer">
          <div className="status-name">
            <p className="middleStatus">{getStatusHeading}</p>
          </div>

          <div className="tasks">
          {console.log(getfilterData)}
            {getfilterData.map((currElem) => {
              return (
                  
                <>
                {console.log(currElem)}
                  <div className="task-list" key={currElem.id}>
                    <div className="checkBoxDiv">
                      <div className="group">
                        <input type="checkbox" id={currElem.id} onClick={() => handleValidation(currElem)} />
                        <label for={currElem.id}></label>
                      </div>
                    </div>
                    <div className="taskDetailsDiv">
                      <p id={currElem.head} className="statusHeading" onClick={() => editTasks(currElem.id)}> {currElem.head}</p>
                      <p id={currElem.date} className="taskDate" >{currElem.date}</p>
                    </div>
                    <div className="deleteDiv">
                      <i className="fas fa-trash-alt" onClick={() => deleteTasks(currElem.id)}></i>
                    </div>
                  </div>

                </>
              );
            })}
          </div>
        </div>
        <div className="rightContainer">
          <div className="todoHeading">
            {toggleButton ?
              <input type="text" id="headingTodo" value={heading} onChange={(event) => {
                setHeading(event.target.value);
              }} /> :
              <input type="text" id="headingTodo" placeholder="Create New Task" onChange={(event) => {
                setHeading(event.target.value);
              }} />}

          </div>

          <div className="todoDescription">
            {toggleButton ? <input type="text" id="descriptionTodo" value={desc} onChange={(event) => {
              setDesc(event.target.value);
            }} /> :
              <input type="text" id="descriptionTodo" placeholder="Enter note here..." onChange={(event) => {
                setDesc(event.target.value);
              }} />}

          </div>

          {toggleButton ?
            <button className="addTask" onClick={addNewTask}> Save Changes</button> :
            <button className="addTask" onClick={addNewTask}> Add New Task</button>
          }


        </div>
      </div>
    </div>
  );
}

export default App;
