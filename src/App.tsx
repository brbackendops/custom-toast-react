'use client';
import './App.css'
import { Bell } from 'lucide-react';
import { useToast } from './components/Toast/useToast';
import Toast from './components/Toast';

function App() {
  const toast = useToast()
  return (
    <>
      <div className='App min-h-screen flex justify-center'>
        <Toast position='top-right'/>

        <div className='content container flex justify-center'>

          <div className='content-1 flex flex-col items-center relative top-[140px]'>

            <div className='bg-blue-700 w-10 h-10 p-2 flex items-center justify-center rounded-full mb-2'>
              <Bell size={18} className='text-white'/>
            </div>

            <div className='text-center mb-4'>
              <h2 className='text-4xl font-bold flex-shrink-0'>Custom Toast Notifications</h2>
              <p className='text-sm text-gray-400'>A beautiful, customizable toast notification system built from scratch</p>
            </div>

            <div className='flex-col space-x-2 items-center space-y-2 md:flex-row md:space-y-0 md:space-x-3'>
              <button 
                onClick={() => toast.success('Operation completed successfully!')}
                className='bg-emerald-500 p-2 w-24 rounded-md text-white font-bold shadow-md transition-all hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 '>
                Success
              </button>

              <button 
                onClick={() => toast.error('Operation completed successfully!')}
                className='
                bg-red-500 p-2 w-24 rounded-md text-white font-bold transition-all hover:bg-red-700 shadow-md hover:shadow-lg focus:outline-none 
                  focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                '
              >
                Error
              </button>

              <button 
                onClick={() => toast.warning('Operation completed successfully!')}
                className='bg-orange-500 p-2 w-24 rounded-md text-white font-bold transition-all hover:bg-c-700 shadow-md hover:shadow-lg focus:outline-none 
                  focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
                Warning
              </button>

              <button 
                onClick={() => toast.info('Operation completed successfully!')}
                className='bg-blue-500 p-2 w-24 rounded-md text-white font-bold transition-all hover:bg-blue-700 shadow-md hover:shadow-lg focus:outline-none 
                  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                Info
              </button>              

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
