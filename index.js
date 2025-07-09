
import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/api/bookings", (req, res) => {
  const booking = req.body;

  // Încarcă datele existente
  let bookings = [];
  if (fs.existsSync("bookings.json")) {
    const data = fs.readFileSync("bookings.json");
    bookings = JSON.parse(data);
  }

  // Adaugă noua rezervare
  bookings.push(booking);

  // Salvează totul din nou
  fs.writeFileSync("bookings.json", JSON.stringify(bookings, null, 2));

  res.status(200).json({ message: "Bokning mottagen." });
});

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
