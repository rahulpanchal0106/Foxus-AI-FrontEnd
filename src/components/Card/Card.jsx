import './Card.css'

const Card = ({index, levelName, levelContent, subject, key})=>{
    console.log("DDDDDDDDDDD ",levelContent)
    return (
        <>
            <div className="notification">
                <div className="notiglow"></div>
                <div className="notiborderglow"></div>
                <div className="notititle">{levelName}</div>
                <div className="notibody">{levelContent}</div>
            </div>
        </>
    )
}

export default Card;