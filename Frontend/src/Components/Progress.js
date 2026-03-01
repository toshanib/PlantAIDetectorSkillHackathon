import './Progress.css'

const Progress = () => {
  return (
    <div className="scanContainer">
      <div className="scanCard">
        <h2 className="scanTitle">🧠 Predicting please wait! </h2>

        <div className="scannerBox">
          <div className="scanLine"></div>
          <div className="scanGrid"></div>
        </div>

        <p className="scanText">
          Scanning leaf patterns, detecting pathogens, and analyzing disease signatures...
        </p>
      </div>
    </div>
  )
}

export default Progress;