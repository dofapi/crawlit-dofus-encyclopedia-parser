module.exports = {
  getId: (url) => {
    const match = /\D+\/(\d+)-.+$/.exec(url);
    return match[1] ? parseInt(match[1], 10) : 0;
  },

  getElement: (stat) => {
    const regex = /(-?\d+) ((de|à|to|and)? (-?\d+))?/gi;
    return stat.replace(regex, '').trim();
  },
};
