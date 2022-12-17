import React, {useEffect, useState} from "react";
import "react-multi-carousel/lib/styles.css";
import Fade from 'react-reveal/Fade';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Avatar from "../Home/picture/avatar1.png"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

function Home() {

    let DataTodoListLocal = localStorage.getItem('DataTodoListLocal');
    const restoredSession = JSON.parse(DataTodoListLocal);
    const [InputData,SetInput] = useState({name:"" ,description:""})
    const [InputEditData,SetInputEditData] = useState({name:"" ,description:""})
    const [EditRow,SetEditRow] = useState({EditMode : false , indexEdit : null})
    const [TodoList,SetTodoList] = useState(restoredSession? restoredSession : [])
    const [NumberArray,SetNumberArray] = useState(0)


    function handlerSubmit() {
        if (InputData.name !== "" && InputData.description !== ""){
            let DataNew = {
                description: `${InputData.description}`,
                name:`${InputData.name}`,
                id:TodoList.length===0 ? NumberArray : NumberArray+1
            }
            SetTodoList([...TodoList,DataNew])
            localStorage.setItem('DataTodoListLocal', JSON.stringify([...TodoList,DataNew]) )
            SetNumberArray(TodoList.length===0 ? NumberArray : NumberArray+1)
            SetInput({name:"" ,description:""  })
        }
    }
    function handlerDelete(Index) {
        let DataRemove = TodoList[Index]
        let NewTodo= TodoList.filter(item => item.id !== DataRemove.id)
        SetTodoList(NewTodo)
        localStorage.setItem('DataTodoListLocal', JSON.stringify(NewTodo) )
    }



    function handlerEdit(data) {
         let {Index ,position , Row } = data
        SetInputEditData(Row)
        SetEditRow({EditMode : position , indexEdit : position === false ? null : Index})
    }

    function Edit(index) {
        let NewDataEdit = TodoList.map(obj => {
                if (obj.id === index) {
                    SetEditRow({EditMode : false , indexEdit : null})
                    SetInputEditData({name:"" ,description:""})
                    return {...obj, name: InputEditData.name, description: InputEditData.description , id:InputEditData.id};
                }
                return obj;
            })
        SetTodoList(NewDataEdit)
        localStorage.setItem('DataTodoListLocal', JSON.stringify(NewDataEdit) )
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
                                <form >
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
                                </form>

                            </div>

                        </div>

                    </div>
                </div>
                <div className="col-md-7 border-right">
                    <div className="p-3">
                        {
                            TodoList.map((item, index) =>
                                    <div className="ItemTodo d-flex  p-3  mt-2 mb-2" key={index}>
                                        <Fade>
                                        <div className="w-100 d-flex justify-content-between align-items-center">
                                            <div style={{width:"45px" , height:"45px" , borderRadius:"50%" , overflow:"hidden"}}>
                                                <img src={Avatar} width="100%" height="100%" alt={Avatar}/>
                                            </div>
                                            {EditRow.indexEdit ===  index ? <>
                                                    <TextField
                                                        id="name"
                                                        label="Name"
                                                        variant="standard"
                                                        name="name"
                                                        type="text"
                                                        className="mt-2"
                                                        value={InputEditData.name}
                                                        onChange={(e)=>SetInputEditData({...InputEditData , name : e.target.value})}
                                                    />
                                                    <TextField
                                                        id="description"
                                                        name="description"
                                                        variant="standard"
                                                        label="Description"
                                                        type="text"
                                                        className="mt-2"
                                                        value={InputEditData.description}
                                                        onChange={(e)=>SetInputEditData({...InputEditData , description : e.target.value})}
                                                    />
                                                </>
                                                : <>
                                                    <span className=" overflowText" >{item.name}</span>
                                                    <span className=" overflowText">{item.description}</span>
                                                </>
                                            }

                                            <div className="d-flex flex-row">
                                                    {EditRow.indexEdit ===  index &&
                                                        <Fade>
                                                            <Button variant="contained" color="success" onClick={() => Edit(index)}><DoneIcon fontSize="small" /></Button>
                                                        </Fade>
                                                    }
                                                    <Button variant="contained" color={EditRow.indexEdit ===  index ? "error" : "primary"}  style={{margin:"0 20px 0 20px"}} onClick={() => handlerEdit(EditRow.indexEdit ===  index ? {Index: index ,position: false} :  {Index: index ,position: true  , Row:item})}>
                                                        {EditRow.indexEdit ===  index ? <CancelIcon fontSize="small" /> : <EditIcon fontSize="small" />}
                                                    </Button>
                                                </div>
                                                <Button variant="contained" color="secondary" onClick={() => handlerDelete(index)}><DeleteOutlineIcon fontSize="small" /></Button>
                                            </div>
                                        </Fade>
                                    </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
