import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryApi'
import admin from "firebase-admin";
import { adminDb } from '../../firebaseAdmin';

type Data = {
  
    answer : string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {promt, chatId, model, session} = req.body
    if (!promt){
        res.status(400).json({ answer: 'promt is required' } )
        return;
    }
    if (!chatId){
        res.status(400).json({ answer: 'chatId is required' } )
        return;
    }
    const response = await query(promt, chatId, model);
    const message: Message = {
        text: response || 'ChatGpt was unable to answer your question!',
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar: 'https://static.vecteezy.com/system/resources/previews/021/059/825/original/chatgpt-logo-chat-gpt-icon-on-green-background-free-vector.jpg',
        },
    };
    await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message);
    
    res.status(200).json({ answer:message.text})
}
