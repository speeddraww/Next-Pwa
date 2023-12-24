'use client'
import NewChat from "./NewChat"
import { useSession,signOut } from "next-auth/react"
import {useCollection} from "react-firebase-hooks/firestore"
import { db } from "@/firebase"
import ChatRow from "./ChatRow"
import { collection, query, orderBy } from "firebase/firestore";
import ModelSelection from "./ModelSelection"

function SideBar() {
  const { data: session } = useSession()
  const q = query(
    collection(db, 'users', session?.user?.email!, 'chats'),
    orderBy('createdAt', 'desc')
  );
  const [chat, loading , error] = useCollection(q);
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          
           <NewChat/>

           <div className="hidden sm:inline">
            <ModelSelection/>

           </div>

           <div>
            {/* Chats */}
            {chat?.docs.map((chatDoc) => (
            <ChatRow key={chatDoc.id} id={chatDoc.id}/>
          ))}

           </div>
           

        </div>
       

      </div>
      {session && (
        <img
        onClick={() =>signOut()}  src={session.user?.image!} alt=" profile picture"
        className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2
        hover:opacity-50" />

      )}
  
    </div>
    
  )
}

export default SideBar
