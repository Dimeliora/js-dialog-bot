import { appState } from './app-state';
import { avatarElms } from './dom-elements';

const PROPER_AVATAR_FILE_TYPES = {
    'image/jpeg': true,
    'image/webp': true,
    'image/png': true,
};

avatarElms.userAvatarBtnElm.addEventListener('click', () => {
    avatarElms.userAvatarFileElm.click();
});

avatarElms.userAvatarFileElm.addEventListener('change', (e) => {
    const [file] = e.target.files;

    if (!file) {
        return;
    }

    if (!PROPER_AVATAR_FILE_TYPES[file.type]) {
        alert(
            'Пожалуйста, выберите файл изображения в формате JPG, PNG или WEBP.'
        );
        return;
    }

    appState.userAvatarImageUrl = URL.createObjectURL(file);

    avatarElms.userAvatarImageElm.src = appState.userAvatarImageUrl;
});
