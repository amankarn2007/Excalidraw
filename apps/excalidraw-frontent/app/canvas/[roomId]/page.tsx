import RoomCanvas from "@/app/components/RoomCanvas";

//extract the roomId from url and render RoomCanvas component
export default async function CanvasPage({params}: {
    params: {
        roomId: string
    }
}) {
    const roomId = (await params).roomId;
    //console.log(roomId);
    
    return <RoomCanvas roomId={roomId} />
}