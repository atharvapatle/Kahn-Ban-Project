'use client'
import React, {useState} from 'react';
import Card from './Card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../../components/ui/button';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function Pane(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')

  const handleSave = () => {
    axios.post('/api/task',{
      title,
      description,
      priority,
      'status': 'To Do'
    })
    props.fetchTasks();
  }

  return (
    <div style={{minHeight: '70vh'}} className='rounded-2xl p-3'>
      <Dialog>
        <div className='flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
            <div style={{width: '10px', height: '10px', borderRadius: '50%', backgroundColor: props.color}}></div>
            {props.title}
            </div>
            {props.title==='To Do' && <DialogTrigger style={{backgroundColor: '#D4CEF2',color: '#5030E5', fontSize: '1.5rem'}}>+</DialogTrigger>}
        </div>
        <div style={{
            height: '3.5px',
            backgroundColor: props.color,
            marginTop: '10px'
        }} ></div>
        <div >
          {props.tasks.map((task, index) => {
            return <Card key={index} completed={task.status === 'Completed'} id={task._id} title={task.title} description={task.description} priority={task.priority} />
          })}
        
        </div>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>
            Enter the details and hit save to create a new task
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Input placeholder="description" id="desc" value={description} onChange={(e)=>setDescription(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="prio" className="text-right">
            Priority
            </Label>
            <Select onValueChange={(props)=>setPriority(props)} value={priority}>
            <SelectTrigger className="w-[275px]">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleSave} type="submit">Save changes</Button>
        </DialogClose>
        </DialogFooter>
      </DialogContent>
        </Dialog>
    </div>
  )
}

export default Pane