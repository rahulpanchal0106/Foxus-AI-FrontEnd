import FeedBack from "../Feedback/feedback"

const FeedbackCard=()=>{
    return (
        <div className="layer0-card review-card">
        <div className="notiglow"></div>
        <div className="notiborderglow"></div>
        <p
          className="level-name"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* {levelName} {data ? <CheckCircle /> : ""} */}
          Was this helpful?
          <small className="text-xs text-gray-600" >Please Write us a Feedback to improve your Experience</small>
        </p>
        <p className="level-content pb-2">
          <FeedBack/>
        </p>
      </div>
    )
}
export default FeedbackCard