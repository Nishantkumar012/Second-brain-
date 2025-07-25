// import { useState } from 'react';
import '../App.css';
import { Button } from '../Components/ui/Button';
import {ShareIcon} from '../icons/ShareIcon';
import {Card} from '../Components/ui/Card'
import { CreateContentModel } from '../Components/ui/CreateContentModel';
import { useState } from 'react';
import { Sidebar } from '../Components/ui/Sidebar';

function DashBoard() {
  
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div >
      <Sidebar/>      
      <div className='p-4 ml-72 bg-gray-200  min-h-screen border-2 border-gray-300'>

      <CreateContentModel open={modalOpen} onClose={()=>{
         setModalOpen(false)
      }}/>
     <div className='flex justify-end gap-4'>
      <Button onClick={()=> {
        setModalOpen(true)
      }} size="md" variant="secondary" text="Add Content" />
      <Button startIcon={<ShareIcon size={'md'} />} size="sm" variant="primary" text="Share" />
      </div>  

      <div className='flex gap-4'>
      <Card type='twitter' link="https://x.com/Siingh999/status/1921480079277789403" 
        title='First tweet'/>

      <Card type='youtube' link='https://youtu.be/sptw9uw1Ve8?si=2rbKN2jFNeHdKHdj'
       title='first youtube'/>
       </div> 
      </div>

    </div>
  );
}

export default DashBoard;