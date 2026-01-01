import './style.scss'

interface Sound {
    id: string;
    name: string;
    source: string;
    img?: string;
    emoji?: string;
    tags?: ('note' | 'percussion')[];
}

const jsonTextArea = document.getElementById('json') as HTMLTextAreaElement;
const soundsList = document.getElementById('sounds-list') as HTMLUListElement;
const player = document.getElementById('player') as HTMLAudioElement;

const websiteBase = 'https://thirtydollar.website';

jsonTextArea.addEventListener('change', () => {
    if (!jsonTextArea.value) {
        soundsList.textContent = '';
        player.controls = false;
        return;
    }
    try {
        const json = JSON.parse(jsonTextArea.value) as Sound[];
        soundsList.innerHTML = json.map(sound => `<li>
    <button value="${sound.id}" title="${sound.name}">
        <span class="name">${sound.name}</span><br>
        ${sound.emoji ? `<span class="emoji">${sound.emoji}</span>` : `<img src="${websiteBase}/icons/${sound.img || sound.id}.png" alt="${sound.name}" width="48" height="48">`}
    </button>
</li>`).join('\n');
    } catch (error) {
        soundsList.innerHTML = '<li>Invalid JSON</li>';
        player.controls = false;
    }
});

soundsList.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    const button = target.closest('button');
    if (button) {
        player.src = `${websiteBase}/sounds/${button.value}.wav`;
        if (!player.controls) {
            player.controls = true;
        }
    }
});