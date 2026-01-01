import './style.scss'

interface Sound {
    id: string;
    name: string;
    source: string;
    img?: string;
    emoji?: string;
    tags?: 'note' | 'percussion'[];
}
const jsonTextArea = document.getElementById('json') as HTMLTextAreaElement;
const filePlayer = document.getElementById('file-player') as HTMLIFrameElement;
const soundsList = document.getElementById('sounds-list') as HTMLUListElement;

const websiteBase = 'https://thirtydollar.website';

jsonTextArea.addEventListener('change', () => {
    if (!jsonTextArea.value) {
        soundsList.textContent = '';
        return;
    }
    try {
        const json = JSON.parse(jsonTextArea.value) as Sound[];
        soundsList.innerHTML = json.map(sound => `<li>
    <span>${sound.name}</span><br>
    <button value="${sound.id}">${sound.emoji || `<img src="${websiteBase}/icons/${sound.img || sound.id}.png" alt="${sound.name}" width="48" height="48">`}</button>
</li>`).join('\n');
    } catch (error) {
        soundsList.textContent = 'Invalid JSON';
    }
});

soundsList.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    const button = target.closest('button');
    if (button) {
        filePlayer.src = `${websiteBase}/sounds/${button.value}.wav`;
    }
});