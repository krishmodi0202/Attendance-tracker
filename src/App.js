import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [credits, setCredits] = useState('');
  const [daySelections, setDaySelections] = useState([]);
  const [result, setResult] = useState(null);
  const [currentHeader, setCurrentHeader] = useState(0);

  const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const dayValues = {
    Monday: 13,
    Tuesday: 14,
    Wednesday: 14,
    Thursday: 15,
    Friday: 13,
  };

  const headers = [
    ""
  ];

  useEffect(() => {
    const headerInterval = setInterval(() => {
      setCurrentHeader((prev) => (prev + 1) % headers.length);
    }, 5000);

    return () => clearInterval(headerInterval);
  }, []);

  const handleGenerateDays = () => {
    if (parseInt(credits) <= 0) {
      alert('Credits must be a positive integer.');
      return;
    }
    const selections = Array.from({ length: parseInt(credits) }, () => '');
    setDaySelections(selections);
    setResult(null);
  };

  const handleDayChange = (index, value) => {
    const updatedSelections = [...daySelections];
    updatedSelections[index] = value;
    setDaySelections(updatedSelections);
  };

  const handleCalculate = () => {
    if (daySelections.includes('')) {
      alert('Please select all required days.');
      return;
    }

    const totalClasses = daySelections.reduce(
      (sum, day) => sum + dayValues[day],
      0
    );

    const thresholds = {
      totalClasses,
      '90%': Math.ceil((totalClasses * 90) / 100),
      '85%': Math.ceil((totalClasses * 85) / 100),
      '80%': Math.ceil((totalClasses * 80) / 100),
    };

    setResult(thresholds);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          {headers.map((header, index) => (
            <h1 
              key={index} 
              id={`head${index + 1}`} 
              style={{ opacity: currentHeader === index ? 1 : 0 }}
            >
              {header}
            </h1>
          ))}
        </div>

        <div className="card">
          <h2>Enter Credits</h2>
          <div className="input-group">
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="Enter credits"
            />
            <button onClick={handleGenerateDays}>Generate Day Selection</button>
          </div>
        </div>

        {daySelections.length > 0 && (
          <div className="card">
            <h2>Select Days</h2>
            <div className="day-selections">
              {daySelections.map((_, index) => (
                <div key={index} className="day-selection">
                  <label>Day {index + 1}:</label>
                  <select
                    value={daySelections[index]}
                    onChange={(e) => handleDayChange(index, e.target.value)}
                  >
                    <option value="">--Select a day--</option>
                    {dayOptions.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <button onClick={handleCalculate}>Calculate Attendance</button>
          </div>
        )}

        {result && (
          <div className="card result">
            <h2>Results</h2>
            <div className="result-grid">
              <div className="result-item">
                <span>Total Classes:</span>
                <span className="result-value">{result.totalClasses}</span>
              </div>
              <div className="result-item">
                <span>For 90% Attendance:</span>
                <span className="result-value">{result['90%']}</span>
              </div>
              <div className="result-item">
                <span>For 85% Attendance:</span>
                <span className="result-value">{result['85%']}</span>
              </div>
              <div className="result-item">
                <span>For 80% Attendance:</span>
                <span className="result-value">{result['80%']}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {[...Array(9)].map((_, i) => (
        <div key={i} className={`light x${i+1}`}></div>
      ))}

<footer className="footer">
        <div className="footer-content">
          <p>Made by Space Hackathon Group</p>
          <p>Copyright @2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
