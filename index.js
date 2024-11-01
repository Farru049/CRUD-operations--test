import express from 'express';

const app = express();
const port = process.env.PORT || 3000; // Port configuration

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());

let teaData = [];
let nextId = 1;

// POST route to add a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).send(newTea);
});

// GET all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
});

// GET tea by ID
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Tea not found');
    }
    res.status(200).send(tea);
});

// PUT (update) tea by ID
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Tea not found');
    }
    const { name, price } = req.body;
    tea.name = name || tea.name;
    tea.price = price || tea.price;
    res.status(200).send(tea);
});

// DELETE tea by ID
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send('Tea not found');
    }
    teaData.splice(index, 1);
    res.status(204).send(); // 204 means "No Content"
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
