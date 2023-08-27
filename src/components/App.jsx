import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [zarobki, setZarobki] = useState(0);
  const [wprowadzoneDane, setWprowadzoneDane] = useState([]);

  useEffect(() => {
    // Po załadowaniu komponentu, pobierz dane z Local Storage (jeśli są dostępne)
    const savedData = localStorage.getItem('wprowadzoneDane');
    if (savedData) {
      setWprowadzoneDane(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Po zmianie wprowadzonych danych, zapisz je w Local Storage
    localStorage.setItem('wprowadzoneDane', JSON.stringify(wprowadzoneDane));
  }, [wprowadzoneDane]);

  const dodajDane = () => {
    const noweDane = {
      miesiac: new Date().toLocaleString('pl-PL', { month: 'long' }),
      zarobki,
      potrzeby: (zarobki * 60) / 100,
      oszczednosci: (zarobki * 20) / 100,
      zachcianki: (zarobki * 20) / 100,
    };

    setWprowadzoneDane([...wprowadzoneDane, noweDane]);
    setZarobki(0); // Wyczyść pole zarobków po dodaniu danych

    // Zapisz dane do Local Storage po dodaniu
    localStorage.setItem('wprowadzoneDane', JSON.stringify([...wprowadzoneDane, noweDane]));
  };

  const usunMiesiac = (index) => {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten miesiąc?");
    if (confirmDelete) {
      const nowaLista = [...wprowadzoneDane];
      nowaLista.splice(index, 1);
      setWprowadzoneDane(nowaLista);
      localStorage.setItem('wprowadzoneDane', JSON.stringify(nowaLista));
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      dodajDane();
    }
  };

  return (
    <div className="container">
      <h1>Rozdzielanie Zarobków</h1>
      <label>Wpisz swoje zarobki miesięczne:</label>
      <input
        type="number"
        value={zarobki}
        onChange={(e) => setZarobki(parseFloat(e.target.value))}
        onKeyPress={handleEnterKeyPress} // Obsługa naciśnięcia klawisza Enter
      />
      <button onClick={dodajDane}>Dodaj</button>

      <table>
        <thead>
          <tr>
            <th>Miesiąc</th>
            <th>Zarobki</th>
            <th>Potrzeby</th>
            <th>Oszczędności</th>
            <th>Zachcianki</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {wprowadzoneDane.map((dane, index) => (
            <tr key={index}>
              <td>{dane.miesiac}</td>
              <td>{dane.zarobki} zł</td>
              <td>{dane.potrzeby} zł</td>
              <td>{dane.oszczednosci} zł</td>
              <td>{dane.zachcianki} zł</td>
              <td>
                <button onClick={() => usunMiesiac(index)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
