import React, { useState, useEffect } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import { getAllDiaries, createDiary } from "./services/diaries";

const App: React.FC = () => {
  const [newDiary, setNewDiary] = useState('');
  const [diaries, setDiaries ] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState(Weather.Sunny);
  const [visibility, setVisibility] = useState(Visibility.Good);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => { 
      setDiaries(data);
    });
  }, []);

  const weatherOptions = Object.values(Weather).map(v => ({
    value: v,
    label: v.toString()
  }));

  const onWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    const weatherValue = Object.values(Weather).find(w => w.toString() === value);
    if (weatherValue) {
      setWeather(weatherValue);
    }
  };

  const visibilityOptions = Object.values(Visibility).map(v => ({
    value: v,
    label: v.toString()
  }));

  const onVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    const visibilityValue = Object.values(Visibility).find(v => v.toString() === value);
    if (visibilityValue) {
      setVisibility(visibilityValue);
    }
  };

  const diaryCreation = (event: React.FormEvent) => {
    event.preventDefault();
    createDiary({ date, weather, visibility, comment })
      .then(data => {
        setDiaries([...diaries, data]);
        setDate('');
        setComment('');
        setError('');
      })
      .catch(err => {
        setError(err.response.data.message);
      });

    setNewDiary('');
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <h1>Add an Entry</h1>
      <form onSubmit={diaryCreation}>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={event => setDate(event.target.value)}
        />

        <div>
          <label>Weather</label>
          <div>
            {weatherOptions.map(option => (
              <label key={option.label}>
                <input
                  type="radio"
                  name="weather"
                  value={option.value}
                  checked={weather === option.value}
                  onChange={onWeatherChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label>Visibility</label>
          <div>
            {visibilityOptions.map(option => (
              <label key={option.label}>
                <input
                  type="radio"
                  name="visibility"
                  value={option.value}
                  checked={visibility === option.value}
                  onChange={onVisibilityChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <label>Comment</label>
        <textarea
          value={comment}
          onChange={event => setComment(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <h1>Diary Entries</h1>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
