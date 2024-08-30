'use client';
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import Pane from "@/app/Components/Pane"
import { set } from "mongoose";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [toDo, setToDo] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [completed, setCompleted] = useState([])
  
  const taskFilter = (status) =>{
    return tasks.filter(task => task.status === status)
  }
  const seperateTasks = () =>{
    console.log('seperateTasks');
    setToDo(taskFilter('To Do'))
    setInProgress(taskFilter('In Progress'))
    setCompleted(taskFilter('Completed'))
  }
  const fetchTasks = () => {
    axios.get("/api/task").then((response) => {
      console.log(response.data);
      setTasks(response.data);
    });
  }
  useEffect(() => {
    fetchTasks();
  }, []);


  useEffect(() => {
    seperateTasks()
  }, [tasks]);


  return (
    <div className="w-full flex justify-center items-center bg-black" style={{height: '100vh'}}>
      <div style={{width: '80%'}} className="rounded-2xl p-8 gap-5 grid grid-cols-3 bg-white">
        <div style={{backgroundColor:'#f5f5f5'}} className="rounded-2xl"><Pane fetchTasks={fetchTasks} tasks={toDo} color="#5030E5" title="To Do" /></div>
        <div style={{backgroundColor:'#f5f5f5'}} className="rounded-2xl"><Pane fetchTasks={fetchTasks} tasks={inProgress} color="#FFA500" title="In Progress" /></div>
        <div style={{}} className="rounded-2xl"><Pane fetchTasks={fetchTasks} color="#8BC48A" tasks={completed} title="Completed" /></div>
      </div>
    </div>
  );
}
