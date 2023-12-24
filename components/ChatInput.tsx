'use client'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { FormEvent } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import toast from 'react-hot-toast'
type Props = {
    chatId: string;
}

function ChatInput({chatId}:Props) {
    const [promt, setPromt] = useState('');
    const {data: session} = useSession();

    const model = 'text-davinci-003';

    const sendMessage =async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!promt) return;
        const input = promt.trim();
        setPromt('');
        const message: Message = {
            text: input,
            createdAt:serverTimestamp(),
            user:{
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}&background=random`
            }
            
            
        }
        await addDoc(collection(db, 'users', session?.user?.email!,'chats', chatId , 'messages'), 
        message
        );
        const notification = toast.loading('Im thinking...');

        await fetch("/api/askQuestion", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promt: input, chatId, model, session,
            }),
        }).then(() =>{
            toast.success('Done!', {id: notification});
        });
    };
    
  return (

    <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm' >
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
            <input className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed
            disabled:text-gray-300' disabled={!session}
            value={promt}
            onChange={(e) => setPromt(e.target.value)}
            type="text" placeholder="Type your message here..." />
            <button type='submit'
            disabled={!promt || !session}
            className='bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed'
            >
                
                <PaperAirplaneIcon className='h-4 w-4 -rotate-45'/>
            </button>

        </form>
        <div>

        </div>
    </div>
  )
}

export default ChatInput