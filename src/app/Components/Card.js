'use client'
import React from 'react';
import dots from '@/Images/dots.png'
import Image from 'next/image';
import axios from 'axios'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Card(props) {
  const handleSetProgress = () => {
    axios.put('/api/task', {
      id: props.id,
      status: 'In Progress'
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  }
  const handleSetCompleted = () => {
    console.log('handleSetCompleted')
    axios.put('/api/task', {
      id: props.id,
      status: 'Completed'
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  }
  return (
    <div style={{margin: '15px 0 15px 0'}} className='bg-white rounded-2xl p-3' >
      <div className='justify-between flex' >
        <div>
        {!props.completed && props.priority==='Low' && <div className='p-1 rounded-sm' style={{fontSize: '0.7rem', fontWeight: '600', color: '#D58D49', backgroundColor: '#F9EEE3', width: 'max-content'}}>Low</div>}
        {!props.completed && props.priority==='High' && <div className='p-1 rounded-sm' style={{fontSize: '0.7rem', fontWeight: '600', color: '#DA7A84', backgroundColor: '#FBF1F2', width: 'max-content'}}>High</div>}
        {props.completed && <div className='p-1 rounded-sm' style={{fontSize: '0.7rem', fontWeight: '600', color: '#68B266', backgroundColor: '#E6F3FB', width: 'max-content'}}>Completed</div>}
        </div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image className='cursor-pointer' alt='dots' style={{width: '20px'}} src={dots}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSetProgress}>
          <div onClick={handleSetProgress}>
            Mark In Progress
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div onClick={handleSetCompleted}>
            Mark Completed
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
        <div style={{fontWeight: '600', fontSize: '1.2rem'}}>{props.title}</div>
        <p style={{fontSize: '0.8rem', color: 'gray'}}>{props.description}</p>
    </div>
  )
}

export default Card