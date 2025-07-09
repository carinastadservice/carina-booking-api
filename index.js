import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint pentru primirea rezervărilor
app.post('/api/bookings', (req, res) => {
  const newBooking = req.body;

  // Citește fișierul existent
  fs.readFile('bookings.json', 'utf8', (err, data) => {
    let bookings = [];

    if (!err && data) {
      try {
        bookings = JSON.parse(data);
      } catch (parseError) {
        console.error('Eroare la parsarea bookings.json:', parseError);
        return res.status(500).json({ message: 'Eroare internă la parsare.' });
      }
    }

    // Adaugă noua rezervare
    bookings.push(newBooking);

    // Salvează înapoi în fișier
    fs.writeFile('bookings.json', JSON.stringify(bookings, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Eroare la salvarea rezervării:', writeErr);
        return res.status(500).json({ message: 'Eroare la salvare.' });
      }

      console.log('Rezervare salvată:', newBooking);
      res.status(200).json({ message: 'Rezervare primită.' });
    });
  });
});

// Pornire server
app.listen(PORT, () => {
  console.log(`✅ Serverul rulează pe portul ${PORT}`);
});


