import React, {useEffect, useState} from "react";
import "react-multi-carousel/lib/styles.css";
import Fade from 'react-reveal/Fade';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Avatar from "../Home/picture/avatar1.png"

function Home() {

    const [InputData,SetInput] = useState({name:"" ,description:""})
    const [TodoList,SetTodoList] = useState([])
    const [NumberArray,SetNumberArray] = useState(0)

    useEffect(()=>{
        console.log("TodoList")
        console.log(TodoList)
        console.log("TodoList")
    },[TodoList])

    function handlerSubmit(data,index) {

        if (InputData.name !== "" && InputData.description !== ""){
            let DataNew = {
                description: `${InputData.description}`,
                name:`${InputData.name}`,
                id:TodoList.length===0 ? NumberArray : NumberArray+1
            }

            SetTodoList([...TodoList,DataNew])
            SetNumberArray(TodoList.length===0 ? NumberArray : NumberArray+1)
            SetInput({name:"" ,description:""})
        }
        console.log(index)
    }
    function handlerDelete(Index) {
        let DataRemove = TodoList[Index]
        SetTodoList(TodoList.filter(item => item.id != DataRemove.id))
    }

    return (

        <div className="container rounded bg-white mt-5" style={{direction:"ltr"}} id="home">
            <div className="row">
                <div className="col-md-5">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <h6 className="text-right">Add Todo</h6>
                        </div>
                        <div className="row ">
                            <div className="col-md-12">
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="name"
                                    type="text"
                                    className="mt-2"
                                    value={InputData.name}
                                    onChange={(e)=>SetInput({...InputData , name : e.target.value})}
                                />
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="description"
                                    type="text"
                                    className="mt-2"
                                    value={InputData.description}
                                    onChange={(e)=>SetInput({...InputData , description : e.target.value})}
                                />

                                <div className="mt-4 text-right">
                                    <Button variant="outlined" onClick={()=>handlerSubmit()}>Add</Button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                <div className="col-md-7 border-right">
                    <div className="p-3">
                        {
                            TodoList.map((item, index) =>
                                <Fade>
                                    <div className="ItemTodo d-flex  p-3  mt-2 mb-2">
                                        <div className="w-100 d-flex justify-content-between align-items-center">
                                            <div style={{width:"45px" , height:"45px" , borderRadius:"50%" , overflow:"hidden"}}>
                                                <img src={Avatar} width="100%" height="100%" alt=""/></div>
                                            <span>{item.name}</span>
                                            <span>{item.description}</span>
                                            <Button variant="contained" color="error" onClick={() => handlerDelete(index)}>D</Button>
                                        </div>
                                    </div>
                                </Fade>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
