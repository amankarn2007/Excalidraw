import axios from "axios"
import { BACKEND_URL } from "../../config"



async function getRoom() {
    await axios.get(`${BACKEND_URL}/room/:id`)
}

export default function ChatRoom() {
    return (
        <div>

        </div>
    )
}