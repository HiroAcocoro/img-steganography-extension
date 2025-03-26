const textToBinary = (text: string): string => {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

export default textToBinary