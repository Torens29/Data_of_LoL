export const getDuration = (time: number) => {
    const [min, sec] = (time / 60).toString().split('.');

    let secIn60;
    if (sec === undefined) secIn60 = '0';
    else secIn60 = (+sec * 0.6).toString();

    if (secIn60.includes('.')) {
        secIn60 = secIn60.replace('.', '');
    }
    if (secIn60.length === 1) secIn60 = `0${secIn60}`;

    return `${min}:${secIn60.slice(0, 2)}`;
};