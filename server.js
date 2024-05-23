const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'step1.html'));
});

app.post('/save-uid', (req, res) => {
    const uid = req.body.uid;
    console.log(`UID: ${uid} 已保存`);
    res.json({ success: true });
});

app.post('/send-telegram', (req, res) => {
    const { message } = req.body;
    const command = `python send_telegram.py "${message}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.json({ success: false, error: error.message });
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.json({ success: false, error: stderr });
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
